import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Klass } from "./Klass";
import { Teacher } from "./Teacher";

@Entity("class_slug")
export class KlassSlug {
  @PrimaryColumn("integer")
  id!: number;

  @Column("varchar")
  slug!: string;

  @ManyToOne(() => Klass, (klass) => klass.slugs)
  klass!: Klass;
}
