import { AppDataSource } from "../AppDataSource";
import { Week } from "../entities/Week";

export const WeekRepository = AppDataSource.getRepository(Week);
