import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { KlassSlug } from "./KlassSlug";
import { WeekDayItem } from "./WeekDayItem";

@Entity("class")
export class Klass {
  @PrimaryColumn("varchar")
  id!: string;

  @Column("varchar")
  year!: string;

  @Column("varchar")
  course!: string;

  @Column("varchar")
  label!: string;

  @OneToMany(() => KlassSlug, (klassSlug) => klassSlug.klass)
  slugs!: KlassSlug[];

  @OneToMany(() => WeekDayItem, (i) => i.klass)
  weekDayItems!: WeekDayItem[];
}
