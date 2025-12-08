/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n    query GroupPage($id: UUID!) {\n        group(gid: $id) {\n            id\n            ...GroupHeaderFragment\n            ...GroupFragment\n        }\n    }\n": typeof types.GroupPageDocument,
    "\n    query HomePage {\n        ...GroupListFragment\n    }\n": typeof types.HomePageDocument,
    "\n    fragment ExpenseItemFragment on Expense {\n        id\n        type\n        splitType\n        description\n        amount\n        currency\n        group {\n            id\n        }\n        toUser {\n            id\n            name\n        }\n        paidBy {\n            id\n            name\n        }\n        createdBy {\n            id\n            name\n        }\n        paidAt\n        createdAt,\n        updatedAt,\n        splits {\n            edges {\n                node {\n                    user {\n                        id\n                        name\n                    }\n                    amount\n                    percentage\n                }\n            }\n        }\n    }\n": typeof types.ExpenseItemFragmentFragmentDoc,
    "\n    fragment GroupFragment on Group {\n        id\n        name\n        description\n        defaultCurrency\n        debitMode\n        debits {\n            edges {\n                node {\n                    nodeId\n                    amount\n                    currency\n                    fromUser {\n                        id\n                        name\n                    }\n                    toUser {\n                        id\n                        name\n                    }\n                }\n            }\n        }\n        expenses(orderBy: [{\n            paidAt: DescNullsFirst\n        }]) {\n            edges {\n                node {\n                    id\n                    paidAt\n                    ...ExpenseItemFragment\n                }\n            }\n        }\n        ...GroupMembersFragment\n    }\n": typeof types.GroupFragmentFragmentDoc,
    "\n    fragment GroupHeaderFragment on Group {\n        id\n        name\n        description\n        defaultCurrency\n        debitMode\n    }\n": typeof types.GroupHeaderFragmentFragmentDoc,
    "\n    fragment GroupListFragment on Query {\n        groups: groupCollection {\n            edges {\n                node {\n                    id\n                    name\n                    description\n                }\n            }\n        }\n    }\n": typeof types.GroupListFragmentFragmentDoc,
    "\n    fragment GroupMembersFragment on Group {\n        id\n        members {\n            edges {\n                node {\n                    user {\n                        id\n                        name\n                    }\n                }\n            }\n        }\n    }\n": typeof types.GroupMembersFragmentFragmentDoc,
};
const documents: Documents = {
    "\n    query GroupPage($id: UUID!) {\n        group(gid: $id) {\n            id\n            ...GroupHeaderFragment\n            ...GroupFragment\n        }\n    }\n": types.GroupPageDocument,
    "\n    query HomePage {\n        ...GroupListFragment\n    }\n": types.HomePageDocument,
    "\n    fragment ExpenseItemFragment on Expense {\n        id\n        type\n        splitType\n        description\n        amount\n        currency\n        group {\n            id\n        }\n        toUser {\n            id\n            name\n        }\n        paidBy {\n            id\n            name\n        }\n        createdBy {\n            id\n            name\n        }\n        paidAt\n        createdAt,\n        updatedAt,\n        splits {\n            edges {\n                node {\n                    user {\n                        id\n                        name\n                    }\n                    amount\n                    percentage\n                }\n            }\n        }\n    }\n": types.ExpenseItemFragmentFragmentDoc,
    "\n    fragment GroupFragment on Group {\n        id\n        name\n        description\n        defaultCurrency\n        debitMode\n        debits {\n            edges {\n                node {\n                    nodeId\n                    amount\n                    currency\n                    fromUser {\n                        id\n                        name\n                    }\n                    toUser {\n                        id\n                        name\n                    }\n                }\n            }\n        }\n        expenses(orderBy: [{\n            paidAt: DescNullsFirst\n        }]) {\n            edges {\n                node {\n                    id\n                    paidAt\n                    ...ExpenseItemFragment\n                }\n            }\n        }\n        ...GroupMembersFragment\n    }\n": types.GroupFragmentFragmentDoc,
    "\n    fragment GroupHeaderFragment on Group {\n        id\n        name\n        description\n        defaultCurrency\n        debitMode\n    }\n": types.GroupHeaderFragmentFragmentDoc,
    "\n    fragment GroupListFragment on Query {\n        groups: groupCollection {\n            edges {\n                node {\n                    id\n                    name\n                    description\n                }\n            }\n        }\n    }\n": types.GroupListFragmentFragmentDoc,
    "\n    fragment GroupMembersFragment on Group {\n        id\n        members {\n            edges {\n                node {\n                    user {\n                        id\n                        name\n                    }\n                }\n            }\n        }\n    }\n": types.GroupMembersFragmentFragmentDoc,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GroupPage($id: UUID!) {\n        group(gid: $id) {\n            id\n            ...GroupHeaderFragment\n            ...GroupFragment\n        }\n    }\n"): (typeof documents)["\n    query GroupPage($id: UUID!) {\n        group(gid: $id) {\n            id\n            ...GroupHeaderFragment\n            ...GroupFragment\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query HomePage {\n        ...GroupListFragment\n    }\n"): (typeof documents)["\n    query HomePage {\n        ...GroupListFragment\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    fragment ExpenseItemFragment on Expense {\n        id\n        type\n        splitType\n        description\n        amount\n        currency\n        group {\n            id\n        }\n        toUser {\n            id\n            name\n        }\n        paidBy {\n            id\n            name\n        }\n        createdBy {\n            id\n            name\n        }\n        paidAt\n        createdAt,\n        updatedAt,\n        splits {\n            edges {\n                node {\n                    user {\n                        id\n                        name\n                    }\n                    amount\n                    percentage\n                }\n            }\n        }\n    }\n"): (typeof documents)["\n    fragment ExpenseItemFragment on Expense {\n        id\n        type\n        splitType\n        description\n        amount\n        currency\n        group {\n            id\n        }\n        toUser {\n            id\n            name\n        }\n        paidBy {\n            id\n            name\n        }\n        createdBy {\n            id\n            name\n        }\n        paidAt\n        createdAt,\n        updatedAt,\n        splits {\n            edges {\n                node {\n                    user {\n                        id\n                        name\n                    }\n                    amount\n                    percentage\n                }\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    fragment GroupFragment on Group {\n        id\n        name\n        description\n        defaultCurrency\n        debitMode\n        debits {\n            edges {\n                node {\n                    nodeId\n                    amount\n                    currency\n                    fromUser {\n                        id\n                        name\n                    }\n                    toUser {\n                        id\n                        name\n                    }\n                }\n            }\n        }\n        expenses(orderBy: [{\n            paidAt: DescNullsFirst\n        }]) {\n            edges {\n                node {\n                    id\n                    paidAt\n                    ...ExpenseItemFragment\n                }\n            }\n        }\n        ...GroupMembersFragment\n    }\n"): (typeof documents)["\n    fragment GroupFragment on Group {\n        id\n        name\n        description\n        defaultCurrency\n        debitMode\n        debits {\n            edges {\n                node {\n                    nodeId\n                    amount\n                    currency\n                    fromUser {\n                        id\n                        name\n                    }\n                    toUser {\n                        id\n                        name\n                    }\n                }\n            }\n        }\n        expenses(orderBy: [{\n            paidAt: DescNullsFirst\n        }]) {\n            edges {\n                node {\n                    id\n                    paidAt\n                    ...ExpenseItemFragment\n                }\n            }\n        }\n        ...GroupMembersFragment\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    fragment GroupHeaderFragment on Group {\n        id\n        name\n        description\n        defaultCurrency\n        debitMode\n    }\n"): (typeof documents)["\n    fragment GroupHeaderFragment on Group {\n        id\n        name\n        description\n        defaultCurrency\n        debitMode\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    fragment GroupListFragment on Query {\n        groups: groupCollection {\n            edges {\n                node {\n                    id\n                    name\n                    description\n                }\n            }\n        }\n    }\n"): (typeof documents)["\n    fragment GroupListFragment on Query {\n        groups: groupCollection {\n            edges {\n                node {\n                    id\n                    name\n                    description\n                }\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    fragment GroupMembersFragment on Group {\n        id\n        members {\n            edges {\n                node {\n                    user {\n                        id\n                        name\n                    }\n                }\n            }\n        }\n    }\n"): (typeof documents)["\n    fragment GroupMembersFragment on Group {\n        id\n        members {\n            edges {\n                node {\n                    user {\n                        id\n                        name\n                    }\n                }\n            }\n        }\n    }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;