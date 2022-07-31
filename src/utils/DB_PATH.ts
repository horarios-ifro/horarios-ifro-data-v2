import { join } from "path";
import { DATA_PATH } from "./DATA_PATH";

export const DB_PATH = process.env.DB_PATH ?? join(DATA_PATH, "app.sqlite");
