/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** The `AWSDateTime` scalar type provided by AWS AppSync, represents a valid ***extended*** [ISO 8601 DateTime](https://en.wikipedia.org/wiki/ISO_8601#Combined_date_and_time_representations) string. In other words, this scalar type accepts datetime strings of the form `YYYY-MM-DDThh:mm:ss.SSSZ`.  The scalar can also accept "negative years" of the form `-YYYY` which correspond to years before `0000`. For example, "**-2017-01-01T00:00Z**" and "**-9999-01-01T00:00Z**" are both valid datetime strings.  The field after the two digit seconds field is a nanoseconds field. It can accept between 1 and 9 digits. So, for example, "**1970-01-01T12:00:00.2Z**", "**1970-01-01T12:00:00.277Z**" and "**1970-01-01T12:00:00.123456789Z**" are all valid datetime strings.  The seconds and nanoseconds fields are optional (the seconds field must be specified if the nanoseconds field is to be used).  The [time zone offset](https://en.wikipedia.org/wiki/ISO_8601#Time_zone_designators) is compulsory for this scalar. The time zone offset must either be `Z` (representing the UTC time zone) or be in the format `±hh:mm:ss`. The seconds field in the timezone offset will be considered valid even though it is not part of the ISO 8601 standard. */
  AWSDateTime: { input: any; output: any; }
};

export type Book = {
  __typename?: 'Book';
  authors?: Maybe<Array<Scalars['String']['output']>>;
  createdAt?: Maybe<Scalars['AWSDateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  favourite?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  imageLinks?: Maybe<ImageLinks>;
  infoLink?: Maybe<Scalars['String']['output']>;
  previewLink?: Maybe<Scalars['String']['output']>;
  publishedDate: Scalars['String']['output'];
  publisher: Scalars['String']['output'];
  status?: Maybe<BookStatus>;
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['AWSDateTime']['output']>;
};

export type BookConnection = {
  __typename?: 'BookConnection';
  items?: Maybe<Array<Maybe<Book>>>;
  nextToken?: Maybe<Scalars['String']['output']>;
};

export enum BookStatus {
  Read = 'READ',
  Reading = 'READING',
  Unread = 'UNREAD'
}

export type CreateBookInput = {
  authors?: InputMaybe<Array<Scalars['String']['input']>>;
  description?: InputMaybe<Scalars['String']['input']>;
  favourite?: InputMaybe<Scalars['Boolean']['input']>;
  imageLinks?: InputMaybe<ImageLinksInput>;
  infoLink?: InputMaybe<Scalars['String']['input']>;
  previewLink?: InputMaybe<Scalars['String']['input']>;
  publishedDate: Scalars['String']['input'];
  publisher: Scalars['String']['input'];
  status?: InputMaybe<BookStatus>;
  title: Scalars['String']['input'];
};

export type DeleteBookInput = {
  id: Scalars['ID']['input'];
};

export type ImageLinks = {
  __typename?: 'ImageLinks';
  smallThumbnail?: Maybe<Scalars['String']['output']>;
  thumbnail?: Maybe<Scalars['String']['output']>;
};

export type ImageLinksInput = {
  smallThumbnail?: InputMaybe<Scalars['String']['input']>;
  thumbnail?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createBook?: Maybe<Book>;
  deleteBook?: Maybe<Book>;
  updateBook?: Maybe<Book>;
};


export type MutationCreateBookArgs = {
  input: CreateBookInput;
};


export type MutationDeleteBookArgs = {
  input: DeleteBookInput;
};


export type MutationUpdateBookArgs = {
  input: UpdateBookInput;
};

export type Query = {
  __typename?: 'Query';
  getBook?: Maybe<Book>;
  listBooks?: Maybe<BookConnection>;
};


export type QueryGetBookArgs = {
  id: Scalars['ID']['input'];
};


export type QueryListBooksArgs = {
  filter?: InputMaybe<TableBookFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
};

export type TableBookFilterInput = {
  authors?: InputMaybe<TableStringFilterInput>;
  favourite?: InputMaybe<TableBooleanFilterInput>;
  id?: InputMaybe<TableIdFilterInput>;
  publishedDate?: InputMaybe<TableStringFilterInput>;
  publisher?: InputMaybe<TableStringFilterInput>;
  title?: InputMaybe<TableStringFilterInput>;
};

export type TableBooleanFilterInput = {
  eq?: InputMaybe<Scalars['Boolean']['input']>;
  ne?: InputMaybe<Scalars['Boolean']['input']>;
};

export type TableIdFilterInput = {
  beginsWith?: InputMaybe<Scalars['ID']['input']>;
  between?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  contains?: InputMaybe<Scalars['ID']['input']>;
  eq?: InputMaybe<Scalars['ID']['input']>;
  ge?: InputMaybe<Scalars['ID']['input']>;
  gt?: InputMaybe<Scalars['ID']['input']>;
  le?: InputMaybe<Scalars['ID']['input']>;
  lt?: InputMaybe<Scalars['ID']['input']>;
  ne?: InputMaybe<Scalars['ID']['input']>;
  notContains?: InputMaybe<Scalars['ID']['input']>;
};

export type TableStringFilterInput = {
  beginsWith?: InputMaybe<Scalars['String']['input']>;
  between?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  eq?: InputMaybe<Scalars['String']['input']>;
  ge?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  le?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notContains?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateBookInput = {
  authors?: InputMaybe<Array<Scalars['String']['input']>>;
  description?: InputMaybe<Scalars['String']['input']>;
  favourite?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['ID']['input'];
  infoLink?: InputMaybe<Scalars['String']['input']>;
  previewLink?: InputMaybe<Scalars['String']['input']>;
  publishedDate?: InputMaybe<Scalars['String']['input']>;
  publisher?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<BookStatus>;
  title?: InputMaybe<Scalars['String']['input']>;
};
