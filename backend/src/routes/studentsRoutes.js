import express from "express";

import {
  createStudent,
  getStudents,
  getStudent,
  updateStudent,
  deleteStudent,
} from "../controllers/studentController.js";

const router = express.Router();

router.post("", createStudent);
router.get("", getStudents);
router.get("/:ra", getStudent);
router.put("/:ra", updateStudent);
router.delete("/:ra", deleteStudent);

export default router;
