import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./services/database/db.js";
import adminRoutes from "./services/routes/admin.routes.js";
import productRoute from "./services/routes/product.rotes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://book-manager-5z9q.vercel.app"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));


app.use(express.json());

// connect to DB
db();

// routes
app.use("/api/v1/admin", adminRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/v1", productRoute);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
