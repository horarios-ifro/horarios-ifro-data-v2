import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Subject } from "./Subject";

@Entity("subject_slug")
export class SubjectSlug {
  @PrimaryColumn("integer")
  id!: number;

  @Column("varchar")
  slug!: string;

  @ManyToOne(() => Subject, (subject) => subject.slugs)
  subject!: Subject;
}
