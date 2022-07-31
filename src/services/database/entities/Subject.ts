import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { SubjectSlug } from "./SubjectSlug";
import { WeekDayItem } from "./WeekDayItem";

@Entity("subject")
export class Subject {
  @PrimaryColumn("varchar")
  id!: string;

  @Column("varchar", { nullable: true })
  name!: string | null;

  @OneToMany(() => SubjectSlug, (subjectSlug) => subjectSlug.subject)
  slugs!: SubjectSlug[];

  @OneToMany(() => WeekDayItem, (i) => i.subject)
  weekDayItems!: WeekDayItem[];
}
