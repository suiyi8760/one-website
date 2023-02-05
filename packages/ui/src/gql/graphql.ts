/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  __typename?: 'Mutation';
  createDraft?: Maybe<Post>;
  publish?: Maybe<Post>;
};


export type MutationCreateDraftArgs = {
  content: Scalars['String'];
  title: Scalars['String'];
};


export type MutationPublishArgs = {
  draftId: Scalars['Int'];
};

export type Post = {
  __typename?: 'Post';
  content?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  published?: Maybe<Scalars['Boolean']>;
  title?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  drafts?: Maybe<Array<Maybe<Post>>>;
  posts?: Maybe<Array<Maybe<Post>>>;
};

export type GetDraftsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDraftsQuery = { __typename?: 'Query', drafts?: Array<{ __typename?: 'Post', content?: string | null, id?: number | null, published?: boolean | null, title?: string | null } | null> | null };


export const GetDraftsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetDrafts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"drafts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"published"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<GetDraftsQuery, GetDraftsQueryVariables>;