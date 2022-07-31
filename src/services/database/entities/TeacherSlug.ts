import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Teacher } from "./Teacher";

@Entity("teacher_slug")
export class TeacherSlug {
  @PrimaryColumn("integer")
  id!: number;

  @Column("varchar")
  slug!: string;

  @ManyToOne(() => Teacher, (i) => i.slugs)
  teacher!: Teacher;
}
