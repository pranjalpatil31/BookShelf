import { Typography } from "@mui/material";
import type { Book } from "../../api/graphql/generated";
import type { UpdateBookInput } from "../../api/graphql/generated";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { IconButton } from "@mui/material";
import { CardTitle } from "../../components/common/CardTitle";
import BookCard from "../../components/common/BookCard";
import BookshelfCardMenu from "./BookshelfCardMenu";
import { useState } from "react";

interface BookshelfCardProps {
  book: Book;
  handleUpdateBook: (input: UpdateBookInput) => Promise<void>;
  handleClickOpen: (book: Book) => void;
  handleDeleteBook: (id: string) => Promise<void>;
  updateBookLoading: boolean;
  deleteBookLoading: boolean;
}

const BookshelfCard = ({
  book,
  handleUpdateBook,
  handleClickOpen,
  handleDeleteBook,
  updateBookLoading,
  deleteBookLoading,
}: BookshelfCardProps) => {

  const [favourite, setFavourite] = useState(book.favourite);
  const handleUpdateBookFavourite = async () => {
    const newValue = !favourite;

    setFavourite(newValue); // instant UI change

    try {
      await handleUpdateBook({
        id: book.id,
        favourite: newValue,
      });
    } catch (e) {
      setFavourite(!newValue); // rollback if API fails
    }
  };

  return (
    <BookCard
      book={book}
      cardContent={
        <>
          <CardTitle variant="subtitle1">{book.title}</CardTitle>
          <Typography variant="body2" color="text.secondary">
            {book.authors && book.authors[0]}
          </Typography>
        </>
      }
      cardActions={
        <>
          <IconButton
            aria-label="add to favorites"
            onClick={handleUpdateBookFavourite}
            sx={{
              "&:hover": {
                backgroundColor: "rgba(236, 72, 153, 0.08)",
              },
            }}
          >
            {favourite ? (
              <Favorite sx={{ color: "#ec4899" }} />
            ) : (
              <FavoriteBorder sx={{ color: "#9ca3af" }} />
            )}
          </IconButton>
          <BookshelfCardMenu
            book={book}
            handleClickOpen={handleClickOpen}
            updateBookLoading={updateBookLoading}
            deleteBookLoading={deleteBookLoading}
            handleUpdateBook={handleUpdateBook}
            handleDeleteBook={handleDeleteBook}
          />
        </>
      }
    />
  );
};

export default BookshelfCard;