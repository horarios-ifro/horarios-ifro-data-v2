import { AppDataSource } from "../AppDataSource";
import { WeekDay } from "../entities/WeekDay";

export const WeekDayRepository = AppDataSource.getRepository(WeekDay);
