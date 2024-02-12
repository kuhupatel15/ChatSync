import axios from "axios";
import { backendUri } from "./BackendUri";

const baseUrl = axios.create({
  baseURL: backendUri,
});

export default baseUrl;
