import { Teacher } from "../services/database/entities/Teacher";

export const sortTeachers = (teachers: Teacher[]) =>
  Array.from(teachers).sort((a, b) => {
    const aName = a.fullName ?? a.slugs[0].slug;
    const bName = b.fullName ?? b.slugs[0].slug;
    return aName.localeCompare(bName);
  });
