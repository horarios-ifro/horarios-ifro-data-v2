import { ITeacher } from "@horarios-ifro/extractors/dist/campi/jiparana/v1/PDFGrade";
import { TeacherSlugRepository } from "../database/repositories/teacher-slug.repository";
import { TeacherRepository } from "../database/repositories/teacher.repository";

export async function syncExtractedWeekTeacher(extractedTeacher: ITeacher) {
  const [mainSlug] = extractedTeacher.slugs;

  const dbTeacher = await TeacherRepository.findBySlug(mainSlug);

  if (!dbTeacher) {
    console.log(`[info]                 -> new teacher found "${mainSlug}".`);

    const teacher = TeacherRepository.create();

    teacher.id = extractedTeacher.id;

    teacher.fullName = extractedTeacher.fullName;

    teacher.slugs ||= [];

    await TeacherRepository.save(teacher);

    for (const extractedSlug of extractedTeacher.slugs) {
      const teacherSlug = TeacherSlugRepository.create();

      teacherSlug.slug = extractedSlug;
      teacherSlug.teacher = teacher;

      await TeacherSlugRepository.save(teacherSlug);
    }
  }
}
