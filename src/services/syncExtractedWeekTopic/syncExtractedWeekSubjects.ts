import { ISubject } from "@horarios-ifro/extractors/dist/campi/jiparana/v1/PDFGrade";
import { syncExtractedWeekSubject } from "./syncExtractedWeekSubject";

export const syncExtractedWeekSubjects = async (subjects: ISubject[]) => {
  for (let subject of subjects) {
    await syncExtractedWeekSubject(subject);
  }
};
