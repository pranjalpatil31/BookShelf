import {
  Divider,
  ListItemIcon,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import type { Book, UpdateBookInput } from "../../api/graphql/generated";
import { BookStatus } from "../../api/graphql/generated";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, useCallback } from "react";
import { SmallLoadingSpinner } from "./Bookshelf.style";
import BookStatusMenuItem from "./BookStatusMenuItem";

interface BookshelfCardMenuProps {
  book: Book;
  handleClickOpen: (book: Book) => void;
  handleDeleteBook: (id: string) => Promise<void>;
  deleteBookLoading: boolean;
  handleUpdateBook: (input: UpdateBookInput) => Promise<void>;
  updateBookLoading: boolean;
}

const BookshelfCardMenu = ({
  book,
  handleClickOpen,
  handleDeleteBook,
  deleteBookLoading,
  handleUpdateBook,
  updateBookLoading,
}: BookshelfCardMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleViewMoreClick = useCallback(() => {
    handleClickOpen(book);
    handleClose();
  }, [book, handleClickOpen]);

  const handleDeleteBookClick = useCallback(async () => {
  handleClose();

  try {
    await handleDeleteBook(book.id);
  } catch (err) {
    console.error("Failed to delete book:", err);
  }
}, [book.id, handleDeleteBook]);

  const handleUpdateBookStatus = useCallback(
    async (id: string, status: BookStatus) => {
      if (status === book.status) return;

      try {
        handleClose();

        const input: UpdateBookInput = {
          id,
          status,
        };

        await handleUpdateBook(input);
      } catch (err) {
        console.error("Failed to update book status:", err);
      }
    },
    [book.status, handleUpdateBook]
  );

  return (
    <>
      <IconButton aria-label="card-menu" onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem disabled>
          <Typography variant="caption">Status</Typography>
        </MenuItem>

        {[BookStatus.Reading, BookStatus.Unread, BookStatus.Read].map(
          (status) => (
            <BookStatusMenuItem
              key={status}
              bookId={book.id}   // ✅ FIX HERE
              updateBookLoading={updateBookLoading}
              currentStatus={book.status ?? undefined}
              handleUpdateBookStatus={handleUpdateBookStatus}
              status={status}
            />
          )
        )}
        <Divider />

        <MenuItem onClick={handleViewMoreClick}>
          <ListItemIcon>
            <VisibilityIcon fontSize="small" />
          </ListItemIcon>
          View more
        </MenuItem>

        <MenuItem onClick={handleDeleteBookClick} disabled={deleteBookLoading}>
          <ListItemIcon>
            {deleteBookLoading ? (
              <SmallLoadingSpinner />
            ) : (
              <DeleteIcon fontSize="small" />
            )}
          </ListItemIcon>
          Remove
        </MenuItem>
      </Menu>
    </>
  );
};

export default BookshelfCardMenu;