import { resolve } from "path";

export const DATA_PATH =
  process.env.DATA_PATH ?? resolve(__dirname, "../../data");
