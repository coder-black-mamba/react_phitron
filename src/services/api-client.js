import axios from "axios";

export default axios.create({
  baseURL: "https://phimart-backend.onrender.com/api/v1",
});