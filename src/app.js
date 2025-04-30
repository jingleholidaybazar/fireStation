import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

const app = express();

// const allowedOrigins = ["http://localhost:8080"];

// app.use(
//   cors({
//     origin: allowedOrigins,
//     credentials: true,
//     // allowedHeaders: ["Content-Type", "Authorization"],
//     // methods: ["GET", "POST", "PATCH", "DELETE"],
//   })
// );

const allowedOrigins = [
  "http://localhost:8080",
  "https://your-frontend-domain.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "Patch", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("Public"));
app.use(cookieParser());

// Routers
import userRouter from "./routes/user.route.js";
app.use("/api/v1/users", userRouter);

app.get("/", (req, res) => {
  res.send("Server started via GET request");
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ success: false, message: err.message });
});

export default app;
