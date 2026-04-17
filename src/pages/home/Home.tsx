import { useState, useMemo, useEffect } from "react";
import type { GoogleBook } from "../../api/graphql/generated";
import PageTitle from "../../components/common/PageTitle";
import { SearchBar } from "./Home.style";
import { Search as SearchIcon } from "@mui/icons-material";
import { useDebounce } from "use-debounce";
import { Divider } from "@mui/material";
import Box from "@mui/material/Box";
import { GoogleBookCard } from "./GoogleBookCard";
import GoogleBookListSkeleton from "./GoogleBookListSkeleton";
import { LoadingButton } from "@mui/lab";
import { searchGoogleBooks } from "../../api/graphql/queries/search-books"; // ✅ NEW

const Home = () => {
  const [search, setSearch] = useState("javascript");
  const [debouncedValue] = useDebounce(search, 1000);

  const [books, setBooks] = useState<GoogleBook[]>([]);
  const [totalItems, setTotalItems] = useState(0);

  const [loading, setLoading] = useState(false);
  const [fetchingMore, setFetchingMore] = useState(false);
  const [error, setError] = useState("");


  const fetchBooks = async (startIndex = 0, append = false) => {
    try {
      if (startIndex === 0) setLoading(true);
      else setFetchingMore(true);
  
      setError(""); // clear previous error
  
      const data = await searchGoogleBooks(
        debouncedValue,
        import.meta.env.VITE_GOOGLE_API_KEY,
        startIndex
      );
  
      const newBooks = data.items || [];
  
      setBooks((prev) => (append ? [...prev, ...newBooks] : newBooks));
      setTotalItems(data.totalItems || 0);
    } catch (err: any) {
      console.error("Search failed:", err);
  
      if (err.response?.status === 503) {
        setError("Server is busy. Retrying...");
  
        // retry after 2 seconds
        setTimeout(() => {
          fetchBooks(startIndex, append);
        }, 2000);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
      setFetchingMore(false);
    }
  };

  // 🔁 search trigger
  useEffect(() => {
  if (debouncedValue.trim()) {
    fetchBooks(0, false);
  }
}, [debouncedValue]);


  const handleSearch = (e: any) => {
    setSearch(e.target.value);
  };

  const handleFetchMore = async () => {
    await fetchBooks(books.length, true);
  };

  return (
    <>
      <PageTitle title="Explore" />

      <SearchBar
        id="search-bar"
        placeholder="Search..."
        value={search}
        onChange={handleSearch}
        startAdornment={<SearchIcon sx={{ mr: 1 }} />}
        fullWidth
      />

      <Divider sx={{ my: 2 }} />

      {loading ? (
        <GoogleBookListSkeleton />
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: 2,
          }}
        >
          {books.map((book: GoogleBook) => (
            <GoogleBookCard googleBook={book} key={book.id} />
          ))}
        </Box>
      )}

      <Box
        sx={{
          p: 3,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <LoadingButton
          variant="contained"
          color="primary"
          loading={fetchingMore}
          loadingIndicator="loading..."
          disabled={books.length >= totalItems}
          onClick={handleFetchMore}
        >
          Load more
        </LoadingButton>
      </Box>
    </>
  );
};

export default Home;
// import { useQuery } from "@apollo/client/react";
// import { SearchGoogleBooksDocument } from "../../api/graphql/generated";
// import { useState } from "react";
// import { useMemo } from "react";
// import type {
//   GoogleBook,
//   SearchGoogleBooksQuery,
//   SearchGoogleBooksQueryVariables,
// } from "../../api/graphql/generated";
// import PageTitle from "../../components/common/PageTitle";
// import { SearchBar } from "./Home.style";
// import { Search as SearchIcon } from "@mui/icons-material";
// import { useDebounce } from "use-debounce";
// import {
//   // Box, 
//   Divider
// } from "@mui/material";
// import Box from "@mui/material/Box";
// import { GoogleBookCard } from "./GoogleBookCard";
// import GoogleBookListSkeleton from "./GoogleBookListSkeleton";
// import { LoadingButton } from "@mui/lab";

// const Home = () => {
//   const [search, setSearch] = useState("javascript");
//   const [debouncedValue] = useDebounce(search, 500);
//   const [fetchingMore, setFetchingMore] = useState(false);



//   const { data, loading, fetchMore } = useQuery<
//     SearchGoogleBooksQuery,
//     SearchGoogleBooksQueryVariables
//   >(SearchGoogleBooksDocument, {
//     variables: {
//       query: debouncedValue,
//       apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
//       startIndex: 0,
//     },
//   });


//   console.log(data, loading);

//   const handleSearch = (e: any) => {
//     setSearch(e.target.value);
//   };

//   const books = useMemo(
//     () => (data?.searchGoogleBooks.items as GoogleBook[]) || [],
//     [data]
//   );

//   const handleFetchMore = async () => {
//     setFetchingMore(true);
//     await fetchMore({
//       variables: {
//         query: debouncedValue,
//         apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
//         startIndex: books.length,
//       },
//       updateQuery(previousResult, { fetchMoreResult }) {
//         if (!fetchMoreResult) {
//           return previousResult;
//         }

//         const previousBooks = previousResult?.searchGoogleBooks?.items || [];
//         const moreBooks = fetchMoreResult?.searchGoogleBooks?.items || [];

//         if (fetchMoreResult.searchGoogleBooks) {
//           fetchMoreResult.searchGoogleBooks.items = [
//             ...previousBooks,
//             ...moreBooks,
//           ];
//         }

//         setFetchingMore(false);
//         return { ...fetchMoreResult };
//       },
//     });
//   };

//   return (
//     <>
//       <PageTitle title="Explore" />

//       <SearchBar
//         id="search-bar"
//         placeholder="Search..."
//         value={search}
//         onChange={handleSearch}
//         startAdornment={<SearchIcon sx={{ mr: 1 }} />}
//         fullWidth
//       />

//       <Divider sx={{ my: 2 }} />

//       {loading ? (
//         <GoogleBookListSkeleton />
//       ) : (
//         <Box
//           sx={{
//             display: "grid",
//             gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
//             gap: 2,
//           }}
//         >
//           {books.map((book: GoogleBook) => (
//             <GoogleBookCard googleBook={book} key={book.id} />
//           ))}
//         </Box>
//       )}
//       <Box
//         sx={{
//           p: 3,
//           display: "flex",
//           justifyContent: "center",
//         }}
//       >
//         <LoadingButton
//           variant="contained"
//           color="primary"
//           loading={fetchingMore}
//           loadingIndicator="loading..."
//           disabled={books.length === data?.searchGoogleBooks?.totalItems}
//           onClick={handleFetchMore}
//         >
//           Load more
//         </LoadingButton>
//       </Box>
//     </>
//   );
// };

// export default Home;



