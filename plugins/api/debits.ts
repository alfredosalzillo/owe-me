import { fetchGroup } from "@/plugins/api/groups";
import { Expense, Group, GroupDebit, User } from "@/plugins/api/types";

const expenseBorrowed = (user: User, expense: Expense) => {
  return expense.splits
    .filter((split) => split.user.id === user.id)
    .map((split) => split.amount)
    .reduce((a, b) => a + b, 0);
};

const expensesToGroupDebit = (
  from: User,
  to: User,
  allExpenses: Expense[],
): GroupDebit[] => {
  const expenses = allExpenses.filter(
    (expense) => expense.paidBy.id === to.id || expense.paidBy.id === from.id,
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
      const lent = expenses
        .filter((expense) => expense.paidBy.id === from.id)
        .map((expense) => expenseBorrowed(to, expense))
        .reduce((a, b) => a + b, 0);
      const borrowed = expenses
        .filter((expense) => expense.paidBy.id !== from.id)
        .map((expense) => expenseBorrowed(from, expense))
        .reduce((a, b) => a + b, 0);
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
