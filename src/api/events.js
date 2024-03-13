import axios from "axios";
import { BACKEND_URL } from "../const";

async function createEvent(data) {
  const { matchId, goalAuthorId, time, period, teamNumber, assistAuthorId } = data;
  try {
    const result = await axios.post(`${BACKEND_URL}/event/create`, {
      match_id: matchId,
      goal_author_id: goalAuthorId,
      time,
      period,
      team_number: teamNumber,
      assist_author_id: assistAuthorId
    });
    return result.data
  } catch (err) {
    console.log(err)
    return new Promise((resolve, reject) => reject(err));
  }
}


export { createEvent };