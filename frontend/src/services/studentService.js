import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000", // Substitua pela URL da sua API
  headers: {
    "Content-Type": "application/json",
  },
});

export default {
  getStudents() {
    return apiClient.get("/students");
  },
  getStudent(ra) {
    return apiClient.get(`/students/${ra}`);
  },
  createStudent(student) {
    return apiClient.post("/students", student);
  },
  updateStudent(ra, student) {
    console.log(student, ra);
    return apiClient.put(`/students/${ra}`, student);
  },
  deleteStudent(ra) {
    return apiClient.delete(`/students/${ra}`);
  },
};
