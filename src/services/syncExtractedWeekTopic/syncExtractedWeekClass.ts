import { IClass } from "@horarios-ifro/extractors/dist/campi/jiparana/v1/PDFGrade";
import { ClassSlugRepository } from "../database/repositories/class-slug.repository";
import { ClassRepository } from "../database/repositories/class.repository";

export async function syncExtractedWeekClass(extractedWeekClass: IClass) {
  const [mainSlug] = extractedWeekClass.slugs;

  const dbClass = await ClassRepository.findBySlug(mainSlug);

  if (!dbClass) {
    console.log(`[info]                 -> new class found "${mainSlug}".`);

    const klass = ClassRepository.create();

    const { id, course, label, year } = extractedWeekClass;

    klass.id = id;
    klass.year = year;
    klass.label = label;
    klass.course = course;
    klass.slugs ||= [];

    await ClassRepository.save(klass);

    for (const extractedSlug of extractedWeekClass.slugs) {
      const classSlug = ClassSlugRepository.create();

      classSlug.slug = extractedSlug;
      classSlug.klass = klass;

      await ClassSlugRepository.save(classSlug);
    }
  }
}
