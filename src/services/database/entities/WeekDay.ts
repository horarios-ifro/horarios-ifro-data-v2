import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Week } from "./Week";
import { WeekDayItem } from "./WeekDayItem";

@Entity("week_day")
export class WeekDay {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column("datetime")
  absoluteDay!: Date;

  @Column("integer")
  weekDayOrder!: number;

  @ManyToOne(() => Week, (week) => week.days)
  week!: Week;

  @OneToMany(() => WeekDayItem, (weekDayItem) => weekDayItem.weekDay)
  items!: WeekDayItem[];
}
