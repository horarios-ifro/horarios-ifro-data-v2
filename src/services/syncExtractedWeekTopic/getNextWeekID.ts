import { WeekRepository } from "../database/repositories/week.repository";

export const getNextWeekID = async () => {
  const weeksCount = await WeekRepository.count();
  const id = (weeksCount + 1).toString(16).padStart(4, "0");
  return id;
};
