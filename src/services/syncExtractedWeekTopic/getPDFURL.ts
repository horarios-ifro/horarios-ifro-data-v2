import { fetchForumTopicPDFAttachmentLink } from "@horarios-ifro/extractors/dist/campi/jiparana/v1/Moodle/Grades/PDFAttachment";

export const getPDFURL = async (topicURL: string) =>
  (await fetchForumTopicPDFAttachmentLink(topicURL))!;
