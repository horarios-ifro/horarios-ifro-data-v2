import "reflect-metadata";
import { DataSource } from "typeorm";
import { DB_PATH } from "../../utils/DB_PATH";
import { Klass } from "./entities/Klass";
import { KlassSlug } from "./entities/KlassSlug";
import { Subject } from "./entities/Subject";
import { SubjectSlug } from "./entities/SubjectSlug";
import { Teacher } from "./entities/Teacher";
import { TeacherSlug } from "./entities/TeacherSlug";
import { Week } from "./entities/Week";
import { WeekDay } from "./entities/WeekDay";
import { WeekDayItem } from "./entities/WeekDayItem";

export const AppDataSource = new DataSource({
  type: "better-sqlite3",
  database: DB_PATH,
  entities: [
    Klass,
    KlassSlug,
    Subject,
    SubjectSlug,
    Teacher,
    TeacherSlug,
    Week,
    WeekDay,
    WeekDayItem,
  ],
  synchronize: true,
});

export const startDatabase = async () => {
  await AppDataSource.initialize();
};
