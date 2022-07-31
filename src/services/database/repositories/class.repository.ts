import { AppDataSource } from "../AppDataSource";
import { Klass } from "../entities/Klass";

export const ClassRepository = AppDataSource.getRepository(Klass).extend({
  findBySlug(slug: string) {
    return this.createQueryBuilder("class")
      .leftJoinAndSelect("class.slugs", "slug")
      .where("slug.slug = :slug", { slug })
      .getOne();
  },
});
