import { AppDataSource } from "../AppDataSource";
import { Teacher } from "../entities/Teacher";

export const TeacherRepository = AppDataSource.getRepository(Teacher).extend({
  findBySlug(slug: string) {
    return this.createQueryBuilder("teacher")
      .leftJoinAndSelect("teacher.slugs", "slug")
      .where("slug.slug = :slug", { slug })
      .getOne();
  },
});
