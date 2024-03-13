import axios from "axios";
import { BACKEND_URL } from "../const";

async function createMatch(data) {
  const { name, team1Id, team2Id, tournamentId } = data;
  try {
    const result = await axios.post(`${BACKEND_URL}/match/create`, {
      name,
      team1_id: team1Id,
      team2_id: team2Id,
      tournament_id: tournamentId,
    });
    return result.data
  } catch (err) {
    return new Promise((resolve, reject) => reject(err));
  }
}

async function getMatch({ id }) {
  try {
    const result = await axios.get(`${BACKEND_URL}/match/data/${id}`);
    return result.data
  } catch (err) {
    return new Promise((resolve, reject) => reject(err));
  }
}

async function startMatch({ id }) {
  try {
    const result = await axios.get(`${BACKEND_URL}/match/start/${id}`);
    return result.data
  } catch (err) {
    return new Promise((resolve, reject) => reject(err));
  }
}

async function finishMatch({ id }) {
  try {
    const result = await axios.get(`${BACKEND_URL}/match/finish/${id}`);
    return result.data
  } catch (err) {
    return new Promise((resolve, reject) => reject(err));
  }
}

export { createMatch, getMatch, startMatch, finishMatch };