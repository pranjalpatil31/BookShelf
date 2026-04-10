import { Stack, useMediaQuery, useTheme } from "@mui/material";
import BookshelfCard from "./BookshelfCard";
import type { Book, UpdateBookInput } from "../../api/graphql/generated";
import BookshelfCardSkeleton from "./BookshelfCardSkeleton";

interface BookshelfCardListProps {
  loading: boolean;
  books?: Book[]; // ✅ IMPORTANT FIX
  handleClickOpen: (book: Book) => void;
  updateBookLoading: boolean;
  deleteBookLoading: boolean;
  handleUpdateBook: (input: UpdateBookInput) => Promise<void>;
  handleDeleteBook: (id: string) => Promise<void>;
}

const BookshelfCardList = ({
  loading,
  books,
  handleClickOpen,
  updateBookLoading,
  deleteBookLoading,
  handleUpdateBook,
  handleDeleteBook,
}: BookshelfCardListProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // ✅ SAFE DEFAULT (THIS FIXES CRASH)
  const safeBooks = books ?? [];

  return (
    <Stack
      direction={isMobile ? "column" : "row"}
      spacing={1}
      sx={{
        p: 2,
        overflow: "auto",
      }}
    >
      {loading
        ? Array.from({ length: 6 }).map((_, index) => (
            <BookshelfCardSkeleton key={index} />
          ))
        : safeBooks.length === 0
        ? null
        : safeBooks.map((book) => (
            <BookshelfCard
              key={book.id}
              book={book}
              handleClickOpen={handleClickOpen}
              updateBookLoading={updateBookLoading}
              deleteBookLoading={deleteBookLoading}
              handleUpdateBook={handleUpdateBook}
              handleDeleteBook={handleDeleteBook}
            />
          ))}
    </Stack>
  );
};

export default BookshelfCardList;