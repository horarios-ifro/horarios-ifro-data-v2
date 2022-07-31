import { AppDataSource } from "../AppDataSource";
import { SubjectSlug } from "../entities/SubjectSlug";

export const SubjectSlugRepository = AppDataSource.getRepository(
  SubjectSlug
).extend({});
