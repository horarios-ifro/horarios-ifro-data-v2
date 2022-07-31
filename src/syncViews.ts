import { WeekRepository } from "./services/database/repositories/week.repository";
import * as jetpack from "fs-jetpack";
import { join } from "path";
import { VIEWS_PATH } from "./utils/VIEWS_PATH";
import { jsonStringify } from "./utils/jsonStringify";
import { VIEWS_WEEKS_PATH } from "./utils/VIEWS_WEEKS_PATH";
import { ClassRepository } from "./services/database/repositories/class.repository";
import { WeekDayItemRepository } from "./services/database/repositories/week-day-item.repository";
import { TeacherRepository } from "./services/database/repositories/teacher.repository";
import { sortTeachers } from "./utils/sortTeachers";

export const syncViews = async () => {
  await jetpack.removeAsync(VIEWS_PATH);

  const weeks = await WeekRepository.find();

  await jetpack.writeAsync(
    join(VIEWS_PATH, "weeks.json"),
    jsonStringify(weeks)
  );

  for (let week of weeks) {
    const WEEK_PATH = join(VIEWS_WEEKS_PATH, week.id);

    await jetpack.removeAsync(WEEK_PATH);

    const WEEK_CLASSES_PATH = join(WEEK_PATH, "classes");
    const WEEK_TEACHERS_PATH = join(WEEK_PATH, "teachers");

    const classes = await ClassRepository.find({ relations: ["slugs"] });

    for (const klass of classes) {
      const WEEK_CLASS_PATH = join(WEEK_CLASSES_PATH, klass.id);

      const classWeekItems = await WeekDayItemRepository.findByClassAndWeek(
        klass.id,
        week.id
      );

      const classWeekItemsView = classWeekItems.map(
        ({
          id,
          order,
          weekDay: { weekDayOrder, absoluteDay },
          subject,
          teacher,
        }) => ({
          id,
          order,
          subject,
          teacher,
          weekDayOrder,
          absoluteDay: absoluteDay.getTime(),
        })
      );

      await jetpack.writeAsync(
        join(WEEK_CLASS_PATH, "data.json"),
        jsonStringify({
          week,
          klass,
          items: classWeekItemsView,
        })
      );
    }

    jetpack.write(join(WEEK_CLASSES_PATH, "data.json"), jsonStringify(classes));

    const teachers = sortTeachers(
      await TeacherRepository.find({
        relations: ["slugs"],
      })
    );

    for (const teacher of teachers) {
      const WEEK_TEACHER_PATH = join(WEEK_TEACHERS_PATH, teacher.id);

      const teacherWeekItems = await WeekDayItemRepository.findByTeacherAndWeek(
        teacher.id,
        week.id
      );

      const teacherWeekItemsView = teacherWeekItems.map(
        ({
          id,
          order,
          weekDay: { weekDayOrder, absoluteDay },
          subject,
          klass,
        }) => ({
          id,
          order,
          klass,
          subject,
          weekDayOrder,
          absoluteDay: absoluteDay.getTime(),
        })
      );

      await jetpack.writeAsync(
        join(WEEK_TEACHER_PATH, "data.json"),
        jsonStringify({
          week,
          teacher,
          items: teacherWeekItemsView,
        })
      );
    }

    jetpack.write(
      join(WEEK_TEACHERS_PATH, "data.json"),
      jsonStringify(teachers)
    );
  }
};
