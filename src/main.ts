import { startDatabase } from "./services/database/AppDataSource";
import { syncExtractedWeekTopic } from "./services/syncExtractedWeekTopic/syncExtractedWeekTopic";
import "./utils/polyfills";
import { getNewWeekTopics } from "./getNewWeekTopics";
import { syncViews } from "./syncViews";

async function main() {
  await startDatabase();

  const newWeeksTopics = await getNewWeekTopics();

  for (let newWeekTopic of newWeeksTopics) {
    console.log(`[info] new week found: "${newWeekTopic.title}".`);
    await syncExtractedWeekTopic(newWeekTopic);
  }

  await syncViews();
}

main().then(() => console.log("done."));
