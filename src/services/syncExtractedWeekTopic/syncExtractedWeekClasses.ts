import { IClass } from "@horarios-ifro/extractors/dist/campi/jiparana/v1/PDFGrade";
import { syncExtractedWeekClass } from "./syncExtractedWeekClass";

export const syncExtractedWeekClasses = async (
  extractedWeekClasses: IClass[]
) => {
  for (let klass of extractedWeekClasses) {
    await syncExtractedWeekClass(klass);
  }
};
