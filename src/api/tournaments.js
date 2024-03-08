import axios from "axios";
import { BACKEND_URL } from "../const";

async function getAllTournaments() {
  try {
    const result = await axios.get(`${BACKEND_URL}/tournament/get_all`);
    return result.data
  } catch (err) {
    return new Promise((resolve, reject) => reject(err));
  }
}

async function getTournament({ id }) {
  try {
    const result = await axios.get(`${BACKEND_URL}/tournament/data/${id}`);
    return result.data
  } catch (err) {
    return new Promise((resolve, reject) => reject(err));
  }
}

async function createTournament(data) {
  const { tournamentName, sportsName, defaultNumberOfPeriods, defaultPeriodDuration } = data;
  try {
    const result = await axios.post(`${BACKEND_URL}/tournament/create`, {
      name: tournamentName,
      sport_name: sportsName,
      default_number_of_periods: defaultNumberOfPeriods * 1,
      default_period_duration: defaultPeriodDuration * 1,
    });
    return result.data
  } catch (err) {
    return new Promise((resolve, reject) => reject(err));
  }
}

export { getAllTournaments, createTournament, getTournament };