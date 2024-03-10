import axios from "axios";
import { BACKEND_URL } from "../const";

async function createPlayer(data) {
  const { firstName, lastName, description, tournamentId } = data;
  try {
    const result = await axios.post(`${BACKEND_URL}/player/create`, {
      first_name: firstName,
      last_name: lastName,
      description,
      tournament_id: tournamentId,
    });
    return result.data
  } catch (err) {
    return new Promise((resolve, reject) => reject(err));
  }
}

export { createPlayer };