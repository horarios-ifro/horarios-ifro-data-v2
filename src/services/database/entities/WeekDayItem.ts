import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Klass } from "./Klass";
import { Subject } from "./Subject";
import { Teacher } from "./Teacher";
import { WeekDay } from "./WeekDay";

@Entity("week_day_item")
export class WeekDayItem {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column("integer")
  order!: number;

  @ManyToOne(() => WeekDay, (i) => i.items)
  weekDay!: WeekDay;

  @ManyToOne(() => Teacher, (i) => i.weekDayItems, { nullable: true })
  teacher!: Teacher | null;

  @ManyToOne(() => Klass, (i) => i.weekDayItems, { nullable: true })
  klass!: Klass | null;

  @ManyToOne(() => Subject, (i) => i.weekDayItems, { nullable: true })
  subject!: Subject | null;
}
