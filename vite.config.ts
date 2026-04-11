import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/", // ✅ correct for Amplify
  server: {
    port: 3000,
  },
  optimizeDeps: {
    include: ["@mui/icons-material"],
  },
});
// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import dotenv from "dotenv";

// dotenv.config();

// export default defineConfig({
//   plugins: [react()],
//   base: "/",   // ✅ FIXED
//   server: {
//     port: 3000,
//   },
//   optimizeDeps: {
//     include: ["@mui/icons-material"],
//   },
// });
