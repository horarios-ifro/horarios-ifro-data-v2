import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { TeacherSlug } from "./TeacherSlug";
import { WeekDayItem } from "./WeekDayItem";

@Entity("teacher")
export class Teacher {
  @PrimaryColumn("varchar")
  id!: string;

  @Column("varchar", { nullable: true })
  fullName!: string | null;

  @OneToMany(() => TeacherSlug, (i) => i.teacher)
  slugs!: TeacherSlug[];

  @OneToMany(() => WeekDayItem, (i) => i.teacher)
  weekDayItems!: WeekDayItem[];
}
