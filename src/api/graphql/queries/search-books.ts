import axios from "axios";

const GOOGLE_BOOKS_API = "https://www.googleapis.com/books/v1/volumes";

export const searchGoogleBooks = async (
  query: string,
  startIndex = 0,
  retries = 1
) => {
  try {
    const response = await axios.get(GOOGLE_BOOKS_API, {
      timeout: 5000,
      params: {
        q: query,
        startIndex,
        maxResults: 20,
      },
    });

    return {
      totalItems: response.data.totalItems || 0,
      items: response.data.items || [],
    };
  } catch (error: any) {
    if (error.response?.status === 503 && retries > 0) {
      await new Promise((res) => setTimeout(res, 1500));
      return searchGoogleBooks(query, startIndex, retries - 1);
    }

    throw {
      status: error.response?.status,
      message: error.message,
    };
  }
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


