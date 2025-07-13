import { fetchGroup } from "@/plugins/api/groups";
import { Expense, Group, GroupDebit, StandardExpense, PaymentExpense, User } from "@/plugins/api/types";

const expenseBorrowed = (user: User, expense: Expense) => {
  // Only StandardExpense has splits
  if (expense.type === 'standard') {
    return expense.splits
      .filter((split) => split.user.id === user.id)
      .map((split) => split.amount)
      .reduce((a, b) => a + b, 0);
  }
  // For PaymentExpense, if the user is the receiver, they borrowed the full amount
  if (expense.type === 'payment' && expense.toUser.id === user.id) {
    return expense.amount;
  }
  return 0;
};

const expensesToGroupDebit = (
  from: User,
  to: User,
  allExpenses: Expense[],
): GroupDebit[] => {
  // Filter expenses that involve these two users
  const expenses = allExpenses.filter(
    (expense) => {
      // For payment expenses, check if one user is the payer and the other is the receiver
      if (expense.type === 'payment') {
        return (expense.paidBy.id === from.id && expense.toUser.id === to.id) ||
               (expense.paidBy.id === to.id && expense.toUser.id === from.id);
      }
      // For standard expenses, check if either user paid
      return expense.paidBy.id === to.id || expense.paidBy.id === from.id;
    }
  );

  const expensesByCurrencies = expenses.reduce(
    (acc, expense) => ({
      ...acc,
      [expense.currency]: [...(acc[expense.currency] || []), expense],
    }),
    {} as Record<string, Expense[]>,
  );

  return Object.entries(expensesByCurrencies)
    .map(([currency, expenses]) => {
      let lent = 0;
      let borrowed = 0;

      // Process standard expenses
      const standardExpenses = expenses.filter(expense => expense.type === 'standard') as StandardExpense[];
      lent += standardExpenses
        .filter((expense) => expense.paidBy.id === from.id)
        .map((expense) => expenseBorrowed(to, expense))
        .reduce((a, b) => a + b, 0);
      borrowed += standardExpenses
        .filter((expense) => expense.paidBy.id !== from.id)
        .map((expense) => expenseBorrowed(from, expense))
        .reduce((a, b) => a + b, 0);

      // Process payment expenses
      const paymentExpenses = expenses.filter(expense => expense.type === 'payment') as PaymentExpense[];
      for (const payment of paymentExpenses) {
        if (payment.paidBy.id === from.id && payment.toUser.id === to.id) {
          // from paid to, so from lent to to
          lent += payment.amount;
        } else if (payment.paidBy.id === to.id && payment.toUser.id === from.id) {
          // to paid to from, so from borrowed from to
          borrowed += payment.amount;
        }
      }

      const net = lent - borrowed;
      if (net > 0) {
        return { from: to, to: from, amount: net, currency };
      } else if (net < 0) {
        return { from: from, to: to, amount: -net, currency };
      }
      return null;
    })
    .filter((debit): debit is GroupDebit => debit !== null);
};

const groupDebits = (group: Group): GroupDebit[] => {
  return group.members
    .map((member) => member.user)
    .flatMap((user, index) =>
      group.members
        .slice(index + 1)
        .map((member) => member.user)
        .flatMap((other) => expensesToGroupDebit(user, other, group.expenses)),
    );
};

const simplifyGroupDebits = (group: Group): GroupDebit[] => {
  const debits = groupDebits(group);
  const debitsByCurrency = debits.reduce(
    (acc, debit) => ({
      ...acc,
      [debit.currency]: [...(acc[debit.currency] || []), debit],
    }),
    {} as Record<string, GroupDebit[]>,
  );

  return Object.entries(debitsByCurrency).flatMap(
    ([currency, currencyDebits]) => {
      const balances = new Map<string, number>();

      for (const debit of currencyDebits) {
        balances.set(
          debit.from.id,
          (balances.get(debit.from.id) || 0) + debit.amount,
        );
        balances.set(
          debit.to.id,
          (balances.get(debit.to.id) || 0) - debit.amount,
        );
      }

      const simplified: GroupDebit[] = [];
      const debtors = Array.from(balances.entries())
        .filter(([, balance]) => balance > 0)
        .sort((a, b) => b[1] - a[1]);
      const creditors = Array.from(balances.entries())
        .filter(([, balance]) => balance < 0)
        .sort((a, b) => a[1] - b[1]);

      while (debtors.length > 0 && creditors.length > 0) {
        const [debtorId, debtorBalance] = debtors[0];
        const [creditorId, creditorBalance] = creditors[0];
        const amount = Math.min(debtorBalance, -creditorBalance);

        const debtor = group.members.find((m) => m.user.id === debtorId)!.user;
        const creditor = group.members.find(
          (m) => m.user.id === creditorId,
        )!.user;

        simplified.push({
          from: debtor,
          to: creditor,
          amount,
          currency,
        });

        if (debtorBalance === amount) {
          debtors.shift();
        } else {
          debtors[0][1] -= amount;
        }

        if (-creditorBalance === amount) {
          creditors.shift();
        } else {
          creditors[0][1] += amount;
        }
      }

      return simplified;
    },
  );
};

export const fetchDebits = async (groupId: string): Promise<GroupDebit[]> => {
  const group = await fetchGroup(groupId);
  if (group.debitMode === "simplified") {
    return simplifyGroupDebits(group);
  }
  return groupDebits(group);
};
