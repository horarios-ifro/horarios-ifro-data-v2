import { AppDataSource } from "../AppDataSource";
import { WeekDayItem } from "../entities/WeekDayItem";

export const WeekDayItemRepository = AppDataSource.getRepository(
  WeekDayItem
).extend({
  async findByClassAndWeek(classId: string, weekId: string) {
    const weekDays = await this.createQueryBuilder("weekDayItem")

      .leftJoinAndSelect("weekDayItem.subject", "subject")
      .leftJoinAndSelect("subject.slugs", "subjectSlugs")

      .leftJoinAndSelect("weekDayItem.teacher", "teacher")
      .leftJoinAndSelect("teacher.slugs", "teacherSlugs")

      .leftJoinAndSelect("weekDayItem.klass", "klass")

      .leftJoinAndSelect("weekDayItem.weekDay", "weekDay")

      .leftJoinAndSelect("weekDay.week", "week")

      .where("klass.id = :classId", { classId })
      .andWhere("week.id = :weekId", { weekId })

      .orderBy("weekDay.weekDayOrder", "ASC")
      .addOrderBy("weekDayItem.order", "ASC")

      .addSelect("weekDay.absoluteDay")

      .getMany();

    return weekDays;

    // .find({
    //   where: { klass: { id: klass.id }, weekDay: { week: { id: week.id } } },
    // })
  },

  async findByTeacherAndWeek(teacherId: string, weekId: string) {
    const weekDays = await this.createQueryBuilder("weekDayItem")

      .leftJoinAndSelect("weekDayItem.subject", "subject")
      .leftJoinAndSelect("subject.slugs", "subjectSlugs")

      .leftJoinAndSelect("weekDayItem.klass", "klass")
      .leftJoinAndSelect("klass.slugs", "klassSlugs")

      .leftJoinAndSelect("weekDayItem.teacher", "teacher")

      .leftJoinAndSelect("weekDayItem.weekDay", "weekDay")

      .leftJoinAndSelect("weekDay.week", "week")

      .where("teacher.id = :teacherId", { teacherId })
      .andWhere("week.id = :weekId", { weekId })

      .orderBy("weekDay.weekDayOrder", "ASC")
      .addOrderBy("weekDayItem.order", "ASC")

      .getMany();

    return weekDays;

    // .find({
    //   where: { klass: { id: klass.id }, weekDay: { week: { id: week.id } } },
    // })
  },
});
