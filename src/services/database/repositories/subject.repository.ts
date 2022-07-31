import { AppDataSource } from "../AppDataSource";
import { Subject } from "../entities/Subject";

export const SubjectRepository = AppDataSource.getRepository(Subject).extend({
  findBySlug(slug: string) {
    return this.createQueryBuilder("subject")
      .leftJoinAndSelect("subject.slugs", "slug")
      .where("slug.slug = :slug", { slug })
      .getOne();
  },
});
