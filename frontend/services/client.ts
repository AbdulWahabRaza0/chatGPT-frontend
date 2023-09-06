import axios from "axios";
const client = axios.create({
  // baseURL: "http://localhost:5000/api/",
  baseURL: "https://gpt-backend-abdulwahabraza0.vercel.app/api/",
});

export { client };
