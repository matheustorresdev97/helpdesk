import cors from "cors";
import express from "express";
import { env } from "./configs/env";
import { errorHandling } from "./middlewares/error-handling";
import { routes } from "./routes";
import uploadConfig from "./configs/upload";

const app = express();

const allowedOrigins = ["http://localhost:5173", env.FRONTEND_URL];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.use(express.json());

app.use("/uploads", express.static(uploadConfig.UPLOADS_FOLDER));
app.use(routes);

app.use(errorHandling);

export { app };
