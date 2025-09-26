// HUB for Application
import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/authRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";

const app = express();
const PORT = process.env.PORT || 5003; // If found ENV's PORT then use it

// GET the file path from the URL of the current module
const __filename = fileURLToPath(import.meta.url);
// GET the directory name from the file path
const __dirname = dirname(__filename);

// MIDDLEWARE
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

// ENDPOINT: Serving the HTML file from the /public directory
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ROUTES
app.use("/auth", authRoutes);
app.use("/todos", authMiddleware, todoRoutes); // AuthMiddleware infront of todoRoutes

app.listen(PORT, () => {
  console.log(`Server has started on: ${PORT}`);
});
