import type { Group, User } from "../types";

export const me: User = {
  id: "user-1",
  name: "John Doe",
};

const group1: Group = {
  id: "group-1",
  name: "Weekend Trip",
  description: "Expenses for our weekend trip to the mountains",
  defaultCurrency: "USD",
  debitMode: "default",
  members: [
    {
      user: {
        id: "user-1",
        name: "John Doe",
      },
      role: "ADMIN",
      joinedAt: new Date("2025-01-01"),
    },
    {
      user: {
        id: "user-2",
        name: "Jane Smith",
      },
      role: "MEMBER",
      joinedAt: new Date("2025-01-02"),
    },
    {
      user: {
        id: "user-3",
        name: "Bob Wilson",
      },
      role: "MEMBER",
      joinedAt: new Date("2025-01-02"),
    },
    {
      user: {
        id: "user-4",
        name: "Alice Brown",
      },
      role: "MEMBER",
      joinedAt: new Date("2025-01-02"),
    },
  ],
  expenses: [
    {
      id: "expense-1",
      type: "standard",
      description: "Hotel Booking",
      amount: 400,
      currency: "USD",
      paidBy: {
        id: "user-1",
        name: "John Doe",
      },
      splitType: "EQUAL",
      splits: [
        {
          user: {
            id: "user-1",
            name: "John Doe",
          },
          amount: 100,
        },
        {
          user: {
            id: "user-2",
            name: "Jane Smith",
          },
          amount: 100,
        },
        {
          user: {
            id: "user-3",
            name: "Bob Wilson",
          },
          amount: 100,
        },
        {
          user: {
            id: "user-4",
            name: "Alice Brown",
          },
          amount: 100,
        },
      ],
      paidAt: new Date("2025-01-03"),
      createdAt: new Date("2025-01-03"),
      createdBy: {
        id: "user-1",
        name: "John Doe",
      },
      updatedAt: new Date("2025-01-03"),
    },
    {
      id: "expense-2",
      type: "standard",
      description: "Restaurant Dinner",
      amount: 200,
      currency: "USD",
      paidBy: {
        id: "user-3",
        name: "Bob Wilson",
      },
      splitType: "EQUAL",
      splits: [
        {
          user: {
            id: "user-1",
            name: "John Doe",
          },
          amount: 50,
        },
        {
          user: {
            id: "user-2",
            name: "Jane Smith",
          },
          amount: 50,
        },
        {
          user: {
            id: "user-3",
            name: "Bob Wilson",
          },
          amount: 50,
        },
        {
          user: {
            id: "user-4",
            name: "Alice Brown",
          },
          amount: 50,
        },
      ],
      paidAt: new Date("2025-01-03"),
      createdAt: new Date("2025-01-03"),
      createdBy: {
        id: "user-3",
        name: "Bob Wilson",
      },
      updatedAt: new Date("2025-01-03"),
    },
    {
      id: "expense-3",
      type: "standard",
      description: "Ski Equipment Rental",
      amount: 320,
      currency: "USD",
      paidBy: {
        id: "user-2",
        name: "Jane Smith",
      },
      splitType: "EQUAL",
      splits: [
        {
          user: {
            id: "user-1",
            name: "John Doe",
          },
          amount: 80,
        },
        {
          user: {
            id: "user-2",
            name: "Jane Smith",
          },
          amount: 80,
        },
        {
          user: {
            id: "user-3",
            name: "Bob Wilson",
          },
          amount: 80,
        },
        {
          user: {
            id: "user-4",
            name: "Alice Brown",
          },
          amount: 80,
        },
      ],
      paidAt: new Date("2025-01-03"),
      createdAt: new Date("2025-01-03"),
      createdBy: {
        id: "user-2",
        name: "Jane Smith",
      },
      updatedAt: new Date("2025-01-03"),
    },
    {
      id: "expense-4",
      type: "standard",
      description: "Groceries",
      amount: 160,
      currency: "USD",
      paidBy: {
        id: "user-4",
        name: "Alice Brown",
      },
      splitType: "EQUAL",
      splits: [
        {
          user: {
            id: "user-1",
            name: "John Doe",
          },
          amount: 40,
        },
        {
          user: {
            id: "user-2",
            name: "Jane Smith",
          },
          amount: 40,
        },
        {
          user: {
            id: "user-3",
            name: "Bob Wilson",
          },
          amount: 40,
        },
        {
          user: {
            id: "user-4",
            name: "Alice Brown",
          },
          amount: 40,
        },
      ],
      paidAt: new Date("2025-01-03"),
      createdAt: new Date("2025-01-03"),
      createdBy: {
        id: "user-4",
        name: "Alice Brown",
      },
      updatedAt: new Date("2025-01-03"),
    },
    {
      id: "expense-5",
      type: "standard",
      description: "Taxi Rides",
      amount: 120,
      currency: "USD",
      paidBy: {
        id: "user-1",
        name: "John Doe",
      },
      splitType: "EQUAL",
      splits: [
        {
          user: {
            id: "user-1",
            name: "John Doe",
          },
          amount: 30,
        },
        {
          user: {
            id: "user-2",
            name: "Jane Smith",
          },
          amount: 30,
        },
        {
          user: {
            id: "user-3",
            name: "Bob Wilson",
          },
          amount: 30,
        },
        {
          user: {
            id: "user-4",
            name: "Alice Brown",
          },
          amount: 30,
        },
      ],
      paidAt: new Date("2025-01-04"),
      createdAt: new Date("2025-01-04"),
      createdBy: {
        id: "user-1",
        name: "John Doe",
      },
      updatedAt: new Date("2025-01-04"),
    },
    {
      id: "expense-6",
      type: "standard",
      description: "Mountain Guide",
      amount: 280,
      currency: "USD",
      paidBy: {
        id: "user-3",
        name: "Bob Wilson",
      },
      splitType: "EQUAL",
      splits: [
        {
          user: {
            id: "user-1",
            name: "John Doe",
          },
          amount: 70,
        },
        {
          user: {
            id: "user-2",
            name: "Jane Smith",
          },
          amount: 70,
        },
        {
          user: {
            id: "user-3",
            name: "Bob Wilson",
          },
          amount: 70,
        },
        {
          user: {
            id: "user-4",
            name: "Alice Brown",
          },
          amount: 70,
        },
      ],
      paidAt: new Date("2025-01-04"),
      createdAt: new Date("2025-01-04"),
      createdBy: {
        id: "user-3",
        name: "Bob Wilson",
      },
      updatedAt: new Date("2025-01-04"),
    },
    {
      id: "expense-7",
      type: "standard",
      description: "Evening Entertainment",
      amount: 240,
      currency: "USD",
      paidBy: {
        id: "user-2",
        name: "Jane Smith",
      },
      splitType: "EQUAL",
      splits: [
        {
          user: {
            id: "user-1",
            name: "John Doe",
          },
          amount: 60,
        },
        {
          user: {
            id: "user-2",
            name: "Jane Smith",
          },
          amount: 60,
        },
        {
          user: {
            id: "user-3",
            name: "Bob Wilson",
          },
          amount: 60,
        },
        {
          user: {
            id: "user-4",
            name: "Alice Brown",
          },
          amount: 60,
        },
      ],
      paidAt: new Date("2025-01-04"),
      createdAt: new Date("2025-01-04"),
      createdBy: {
        id: "user-2",
        name: "Jane Smith",
      },
      updatedAt: new Date("2025-01-04"),
    },
    {
      id: "payment-1",
      type: "payment",
      description: "Hotel payment settlement",
      amount: 200,
      currency: "USD",
      paidBy: {
        id: "user-2",
        name: "Jane Smith",
      },
      toUser: {
        id: "user-1",
        name: "John Doe",
      },
      paidAt: new Date("2025-01-04"),
      createdAt: new Date("2025-01-04"),
      createdBy: {
        id: "user-2",
        name: "Jane Smith",
      },
      updatedAt: new Date("2025-01-04"),
    },
    {
      id: "payment-2",
      type: "payment",
      // No description to demonstrate optional description
      amount: 150,
      currency: "USD",
      paidBy: {
        id: "user-3",
        name: "Bob Wilson",
      },
      toUser: {
        id: "user-4",
        name: "Alice Brown",
      },
      paidAt: new Date("2025-01-05"),
      createdAt: new Date("2025-01-05"),
      createdBy: {
        id: "user-3",
        name: "Bob Wilson",
      },
      updatedAt: new Date("2025-01-05"),
    },
  ],
  balances: [
    {
      balances: [
        {
          user: {
            id: "user-1",
            name: "John Doe",
          },
          amount: 0,
          currency: "USD",
        },
        {
          user: {
            id: "user-2",
            name: "Jane Smith",
          },
          amount: 0,
          currency: "USD",
        },
        {
          user: {
            id: "user-3",
            name: "Bob Wilson",
          },
          amount: 0,
          currency: "USD",
        },
        {
          user: {
            id: "user-4",
            name: "Alice Brown",
          },
          amount: 0,
          currency: "USD",
        },
      ],
    },
  ],
  createdAt: new Date("2025-01-01"),
  createdBy: {
    id: "user-1",
    name: "John Doe",
  },
  updatedAt: new Date("2025-01-04"),
};

export const groups = [group1];
