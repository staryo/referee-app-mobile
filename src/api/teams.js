import axios from "axios";
import { BACKEND_URL } from "../const";

async function createTeam(data) {
  const { teamName, tournamentId } = data;
  try {
    const result = await axios.post(`${BACKEND_URL}/team/create`, {
      team_name: teamName,
      tournament_id: tournamentId,
    });
    return result.data
  } catch (err) {
    return new Promise((resolve, reject) => reject(err));
  }
}

export { createTeam };