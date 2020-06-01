import { restConnector } from "core/services/axios";

class ScoreService {
  getScores() {
    return restConnector({
      url: '/scores',
      method: "GET",
    });
  }
}

export default new ScoreService();
