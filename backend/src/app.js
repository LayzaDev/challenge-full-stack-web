import express from "express";
import cors from "cors";
import studentsRoutes from "./routes/studentsRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/students/", studentsRoutes);

export default app;
