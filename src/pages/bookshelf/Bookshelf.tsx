import { Stack } from "@mui/material";
import PageTitle from "../../components/common/PageTitle";
import { useBookshelf } from "./hooks/use-bookshelf";
import { BookshelfTabs } from "./BookshelfTabs";
import type { Book } from "../../api/graphql/generated";
import { useState } from "react";
import BookDetailsDialog from "./BookDetailsDialog";
import BookshelfCardList from "./BookshelfCardList";

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
      <Stack direction="row" sx={{ justifyContent: "space-between" }}>
        <PageTitle title="My Bookshelf" />
      </Stack>
      <Stack spacing={1}>
   <BookshelfTabs
        booksCount={[books?.unread?.length]}
        tabs={{
          "To Read": (
            <BookshelfCardList
              books={cleanBooks(books.unread)}
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





