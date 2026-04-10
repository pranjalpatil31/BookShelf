import { useMemo, useState } from "react";
import type { Book, UpdateBookInput } from "../../../api/graphql/generated";

import {
  useDeleteBookMutation,
  useUpdateBookMutation,
  ListBooksDocument,
  type ListBooksQuery,
  type ListBooksQueryVariables,
} from "../../../api/graphql/generated";

import { useQuery } from "@apollo/client/react";

export const useBookshelf = () => {
  const { data, loading, fetchMore } = useQuery<
    ListBooksQuery,
    ListBooksQueryVariables
  >(ListBooksDocument, {
    fetchPolicy: "cache-and-network",
  });

  const [fetchingMore, setFetchingMore] = useState(false);

let updateBook: any;
let updateBookLoading = false;

let deleteBook: any;
let deleteBookLoading = false;

try {
  const updateResult = useUpdateBookMutation();
  const deleteResult = useDeleteBookMutation();

  updateBook = updateResult?.[0] ?? (() => Promise.resolve());
  updateBookLoading = updateResult?.[1]?.loading ?? false;

  deleteBook = deleteResult?.[0] ?? (() => Promise.resolve());
  deleteBookLoading = deleteResult?.[1]?.loading ?? false;
} catch (e) {
  console.warn("Apollo mutation init failed:", e);

  // fallback so app NEVER crashes
  updateBook = async () => {};
  deleteBook = async () => {};
}

  const books = useMemo(() => {
    const items = data?.listBooks?.items ?? [];

    const safeItems = items.filter(
      (b): b is Book => b !== null && b !== undefined
    );

    return {
      reading: safeItems.filter((book) => book.status === "READING"),
      unread: safeItems.filter((book) => book.status === "UNREAD"),
      read: safeItems.filter((book) => book.status === "READ"),
    };
  }, [data?.listBooks?.items]);

  const handleUpdateBook = async ({
    id,
    status,
    favourite,
  }: UpdateBookInput) => {
    await updateBook({
      variables: {
        input: { id, status, favourite },
      },
    });
  };

  const handleDeleteBook = async (id: string) => {
    await deleteBook({
      variables: {
        input: { id },
      },
    });
  };

  const fetchMoreBooks = async () => {
    setFetchingMore(true);

    await fetchMore({
      variables: {
        nextToken: data?.listBooks?.nextToken,
      },
      updateQuery(prev: any, { fetchMoreResult }: any) {
        setFetchingMore(false);

        if (!fetchMoreResult) return prev;

        return {
          listBooks: {
            ...fetchMoreResult.listBooks,
            items: [
              ...(prev.listBooks?.items ?? []),
              ...(fetchMoreResult.listBooks?.items ?? []),
            ],
          },
        };
      },
    });
  };

  const canFetchMoreBooks = !!data?.listBooks?.nextToken;

  return {
    books,
    loading,
    updateBookLoading,
    deleteBookLoading,
    handleUpdateBook,
    handleDeleteBook,
    fetchMoreBooks,
    fetchingMore,
    canFetchMoreBooks,
  };
};