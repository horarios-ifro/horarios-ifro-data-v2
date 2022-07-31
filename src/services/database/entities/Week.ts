import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { WeekDay } from "./WeekDay";

@Entity("week")
export class Week {
  @PrimaryColumn("varchar")
  id!: string;

  @Column("varchar")
  link!: string;

  @Column("varchar")
  title!: string;

  @Column("varchar")
  pdfURL!: string;

  @Column("datetime")
  publishedAt!: Date;

  @Column("datetime")
  startsAt!: Date;

  @Column("datetime")
  endsAt!: Date;

  @OneToMany(() => WeekDay, (weekDay) => weekDay.week)
  days!: WeekDay[];
}
