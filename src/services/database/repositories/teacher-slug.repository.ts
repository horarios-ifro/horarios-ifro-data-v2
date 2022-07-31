import { AppDataSource } from "../AppDataSource";
import { TeacherSlug } from "../entities/TeacherSlug";

export const TeacherSlugRepository = AppDataSource.getRepository(
  TeacherSlug
).extend({});
