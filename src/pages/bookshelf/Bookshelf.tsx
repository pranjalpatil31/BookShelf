import { Stack } from "@mui/material";
import PageTitle from "../../components/common/PageTitle";
import { useBookshelf } from "./hooks/use-bookshelf";
import { BookshelfTabs } from "./BookshelfTabs";
import type { Book } from "../../api/graphql/generated";
import { useState } from "react";
import BookDetailsDialog from "./BookDetailsDialog";
import BookshelfCardList from "./BookshelfCardList";
import { LoadingButton } from "@mui/lab";

const Bookshelf = () => {
  const [open, setOpen] = useState(false);
  const [detailsBook, setDetailsBook] = useState<Book | undefined>(undefined);

  const handleClickOpen = (book: Book) => {
    setDetailsBook(book);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const cleanBooks = (books: (Book | null | undefined)[] = []): Book[] =>
    books.filter((b): b is Book => Boolean(b));

  const {
    books,
    loading,
    updateBookLoading,
    deleteBookLoading,
    handleUpdateBook,
    handleDeleteBook,
    fetchMoreBooks,
    fetchingMore,
    canFetchMoreBooks,
  } = useBookshelf();

  return (
    <>
      {open && detailsBook && (
        <BookDetailsDialog handleClose={handleClose} book={detailsBook} />
      )}

      {/* Header */}
      <Stack direction="row" justifyContent="space-between">
        <PageTitle title="My Bookshelf" />

        <LoadingButton
          variant="contained"
          size="small"
          color="primary"
          disabled={!canFetchMoreBooks}
          loading={fetchingMore}
          sx={{ my: 1 }}
          onClick={fetchMoreBooks}
        >
          Load more
        </LoadingButton>
      </Stack>

      {/* Tabs Section */}
      <Stack spacing={1}>
        <BookshelfTabs
          booksCount={[books?.reading?.length]}
          tabs={{
            Reading: (
              <BookshelfCardList
                books={cleanBooks(books?.reading)}
                loading={loading}
                handleClickOpen={handleClickOpen}
                updateBookLoading={updateBookLoading}
                deleteBookLoading={deleteBookLoading}
                handleUpdateBook={handleUpdateBook}
                handleDeleteBook={handleDeleteBook}
              />
            ),
          }}
        />

        <BookshelfTabs
          booksCount={[
            books?.unread?.length,
            books?.read?.length,
          ]}
          tabs={{
            "To Read": (
              <BookshelfCardList
                books={cleanBooks(books?.unread)}
                loading={loading}
                handleClickOpen={handleClickOpen}
                updateBookLoading={updateBookLoading}
                deleteBookLoading={deleteBookLoading}
                handleUpdateBook={handleUpdateBook}
                handleDeleteBook={handleDeleteBook}
              />
            ),

            Finished: (
              <BookshelfCardList
                books={cleanBooks(books?.read)}
                loading={loading}
                handleClickOpen={handleClickOpen}
                updateBookLoading={updateBookLoading}
                deleteBookLoading={deleteBookLoading}
                handleUpdateBook={handleUpdateBook}
                handleDeleteBook={handleDeleteBook}
              />
            ),
          }}
        />
      </Stack>
    </>
  );
};

export default Bookshelf;
