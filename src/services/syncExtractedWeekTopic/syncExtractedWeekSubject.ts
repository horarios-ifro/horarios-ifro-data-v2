import { ISubject } from "@horarios-ifro/extractors/dist/campi/jiparana/v1/PDFGrade";
import { SubjectSlugRepository } from "../database/repositories/subject-slug.repository";
import { SubjectRepository } from "../database/repositories/subject.repository";

export async function syncExtractedWeekSubject(extractedWeekSubject: ISubject) {
  const [mainSlug] = extractedWeekSubject.slugs;

  const dbSubject = await SubjectRepository.findBySlug(mainSlug);

  if (!dbSubject) {
    console.log(`[info]                 -> new subject found "${mainSlug}".`);

    const subject = SubjectRepository.create();

    const { id, name } = extractedWeekSubject;

    subject.id = id;
    subject.name = name;
    subject.slugs ||= [];

    await SubjectRepository.save(subject);

    for (const extractedSlug of extractedWeekSubject.slugs) {
      const subjectSlug = SubjectSlugRepository.create();

      subjectSlug.slug = extractedSlug;
      subjectSlug.subject = subject;

      await SubjectSlugRepository.save(subjectSlug);
    }
  }
}
