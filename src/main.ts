import { startDatabase } from "./services/database/AppDataSource";
import { syncExtractedWeekTopic } from "./services/syncExtractedWeekTopic/syncExtractedWeekTopic";
import "./utils/polyfills";
import { getNewWeekTopics } from "./getNewWeekTopics";
import { WeekRepository } from "./services/database/repositories/week.repository";
import * as jetpack from "fs-jetpack";
import { VIEWS_PATH } from "./utils/VIEWS_PATH";
import { join } from "path";
import { jsonStringify } from "./utils/jsonStringify";

async function main() {
  await startDatabase();

  const newWeeksTopics = await getNewWeekTopics();

  for (let newWeekTopic of newWeeksTopics) {
    console.log(`[info] new week found: "${newWeekTopic.title}".`);
    await syncExtractedWeekTopic(newWeekTopic);
  }

  const weeks = await WeekRepository.find();
  await jetpack.writeAsync(
    join(VIEWS_PATH, "weeks.json"),
    jsonStringify(weeks)
  );
}

main();
