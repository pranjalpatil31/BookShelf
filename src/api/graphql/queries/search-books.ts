import axios from "axios";

export const searchGoogleBooks = async (
  query: string,
  apiKey: string,
  startIndex: number,
  signal?: AbortSignal // ✅ accept signal
) => {
  const response = await axios.get(
    "https://www.googleapis.com/books/v1/volumes",
    {
      params: {
        q: query,
        key: apiKey,
        startIndex,
      },
      signal: signal, // ✅ explicitly pass it
    }
  );

  return response.data;
};
// import axios from "axios";

// const GOOGLE_BOOKS_API = "https://www.googleapis.com/books/v1/volumes";

// export const searchGoogleBooks = async (
//   query: string,
//   apiKey: string,
//   startIndex = 0
// ) => {
//   const response = await axios.get(GOOGLE_BOOKS_API, {
//     params: {
//       q: query,
//       key: apiKey,
//       startIndex,
//     },
//   });

//   return response.data;
// };


