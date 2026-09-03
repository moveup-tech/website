import axios from "axios";

export const strapi = axios.create({
  baseURL: import.meta.env.STRAPI_API_URL!,
  timeout: 10_000,
});
