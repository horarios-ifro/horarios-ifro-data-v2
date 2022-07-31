import {
  extractPDFInfos,
  getClassesFromExtractedPDFInfos,
  getSubjectsFromExtractedPDFInfos,
  getTeachersFromExtractedPDFInfos,
  getWeekFromExtractedPDFInfos,
} from "@horarios-ifro/extractors/dist/campi/jiparana/v1/PDFGrade";
import { IExtractedForumTopic } from "@horarios-ifro/extractors/dist/utils/Moodle/extractForumTopics/interfaces/IExtractedForumTopic";
import { WeekRepository } from "../database/repositories/week.repository";
import { syncExtractedWeekSubjects } from "./syncExtractedWeekSubjects";
import { syncExtractedWeekClasses } from "./syncExtractedWeekClasses";
import { syncExtractedWeekTeachers } from "./syncExtractedWeekTeachers";
import { WeekDayRepository } from "../database/repositories/week-day.repository";
import addDays from "date-fns/addDays";
import { WeekDayItemRepository } from "../database/repositories/week-day-item.repository";
import { TeacherRepository } from "../database/repositories/teacher.repository";
import { SubjectRepository } from "../database/repositories/subject.repository";
import { ClassRepository } from "../database/repositories/class.repository";
import { getNextWeekID } from "./getNextWeekID";
import { getPDFURL } from "./getPDFURL";

export const syncExtractedWeekTopic = async (
  extractedWeekTopic: IExtractedForumTopic
) => {
  const week = WeekRepository.create();

  week.pdfURL = await getPDFURL(extractedWeekTopic.link);
  const pdfInfos = await extractPDFInfos(week.pdfURL);

  week.id = await getNextWeekID();
  week.title = extractedWeekTopic.title;
  week.link = extractedWeekTopic.link;
  week.publishedAt = new Date(extractedWeekTopic.publishedAt);
  week.startsAt = new Date(pdfInfos.startDate);
  week.endsAt = new Date(pdfInfos.endDate);

  await WeekRepository.save(week);

  const extractedTeachers = await getTeachersFromExtractedPDFInfos(pdfInfos);
  const extractedClasses = getClassesFromExtractedPDFInfos(pdfInfos);
  const extractedSubjects = await getSubjectsFromExtractedPDFInfos(pdfInfos);

  await syncExtractedWeekTeachers(extractedTeachers);

  await syncExtractedWeekClasses(extractedClasses);

  await syncExtractedWeekSubjects(extractedSubjects);

  const extractedWeek = getWeekFromExtractedPDFInfos(pdfInfos);

  for (let weekDayOrder = 0; weekDayOrder < 6; weekDayOrder++) {
    const weekDay = WeekDayRepository.create();

    weekDay.week = week;
    weekDay.items ||= [];
    weekDay.weekDayOrder = weekDayOrder;
    weekDay.absoluteDay = addDays(extractedWeek.startDate, weekDayOrder);

    await WeekDayRepository.save(weekDay);

    const extractedWeekDayItems = extractedWeek.items.filter(
      (i) => i.weekDay === weekDayOrder
    );

    for (const extractedWeekDayItem of extractedWeekDayItems) {
      const {
        order,
        teacherSlug,
        subjectSlug,
        klass: klassId,
      } = extractedWeekDayItem;

      const weekDayItem = WeekDayItemRepository.create();

      weekDayItem.order = order;

      weekDayItem.weekDay = weekDay;

      weekDayItem.teacher =
        teacherSlug !== null
          ? await TeacherRepository.findBySlug(teacherSlug)
          : null;

      weekDayItem.subject =
        subjectSlug !== null
          ? await SubjectRepository.findBySlug(subjectSlug)
          : null;

      weekDayItem.klass =
        klassId !== null
          ? await ClassRepository.findOne({ where: { id: klassId } })
          : null;

      await WeekDayItemRepository.save(weekDayItem);
    }
  }
};
