import axios from "axios";

const GOOGLE_BOOKS_API = "https://www.googleapis.com/books/v1/volumes";

export const searchGoogleBooks = async (
  query: string,
  apiKey: string,
  startIndex = 0
) => {
  const response = await axios.get(GOOGLE_BOOKS_API, {
    params: {
      q: query,
      key: apiKey,
      startIndex,
    },
  });

  return response.data;
};
// import { gql } from "@apollo/client";

// export const SEARCH_GOOGLE_BOOKS_QUERY = gql`
//   query SearchGoogleBooks($query: String!, $apiKey: String!, $startIndex: Int) {
//     searchGoogleBooks(query: $query, apiKey: $apiKey, startIndex: $startIndex)
//       @rest(
//         type: "SearchBooks"
//         path: "?q={args.query}&key={args.apiKey}&startIndex={args.startIndex}"
//       ) {
//       totalItems
//       items @type(name: "GoogleBook") {
//         id
//         volumeInfo @type(name: "GoogleBookVolumeInfo") {
//           title
//           authors
//           description
//           publisher
//           publishedDate
//           imageLinks @type(name: "GoogleBookImageLinks") {
//             smallThumbnail
//             thumbnail
//           }
//           infoLink
//           previewLink
//         }
//       }
//     }
//   }
// `;
