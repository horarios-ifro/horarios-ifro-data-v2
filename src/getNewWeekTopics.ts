import { fetchGrades } from "@horarios-ifro/extractors/dist/campi/jiparana/v1/Moodle/Grades";
import { WeekRepository } from "./services/database/repositories/week.repository";
import { FORUM_GRADES_URL } from "./utils/FORUM_GRADES_URL";

export const getNewWeekTopics = async () => {
  const latestDatabaseWeek = await WeekRepository.findOne({
    where: {},
    order: { publishedAt: "DESC" },
  });

  const allWeeksTopics = await fetchGrades(FORUM_GRADES_URL);

  const newWeeksTopics = allWeeksTopics.filter((week, idx, arr) =>
    latestDatabaseWeek
      ? new Date(week.publishedAt) > latestDatabaseWeek.publishedAt
      : idx + 1 === arr.length
  );

  return newWeeksTopics;
};
