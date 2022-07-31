import { AppDataSource } from "../AppDataSource";
import { KlassSlug } from "../entities/KlassSlug";

export const ClassSlugRepository = AppDataSource.getRepository(
  KlassSlug
).extend({});
