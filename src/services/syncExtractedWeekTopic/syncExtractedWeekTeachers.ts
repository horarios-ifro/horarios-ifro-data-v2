import { ITeacher } from "@horarios-ifro/extractors/dist/campi/jiparana/v1/PDFGrade";
import { syncExtractedWeekTeacher } from "./syncExtractedWeekTeacher";

export const syncExtractedWeekTeachers = async (teachers: ITeacher[]) => {
  for (let teacher of teachers) {
    await syncExtractedWeekTeacher(teacher);
  }
};
