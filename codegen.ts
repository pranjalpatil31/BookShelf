import dotenv from "dotenv";
dotenv.config();

export default {
  schema: [
    {
      [process.env.VITE_GRAPHQL_ENDPOINT as string]: {
        headers: {
          "x-api-key": process.env.VITE_GRAPHQL_API_KEY as string,
        },
      },
    },
    "src/api/graphql/*.graphql",
  ],

  documents: [
    "src/api/graphql/**/*.ts",
    "!src/api/graphql/generated.ts",
  ],

  generates: {
    "./src/api/graphql/generated.ts": {
      config: {
        withHooks: true,

        // 🔥 THIS IS THE FIX
        reactApolloVersion: 3,

        useTypeImports: true,
        dedupeOperationSuffix: true,

        importOperationTypesFrom: "Types",

        scalars: {
          AWSDateTime: "Date",
        },
      },

      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
    },
  },

  hooks: {
    afterOneFileWrite: ["prettier --write"],
  },

  ignoreNoDocuments: true,
};