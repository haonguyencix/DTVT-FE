import { restConnector } from "services/axios";

class TasksService {
  fetchTasks() {
    return restConnector({
      url: "lanes",
      method: "GET"
    });
  }

  addTask(lane) {
    return restConnector({
      url: "lanes",
      method: "POST",
      data: lane
    });
  }

  deleteTask(laneId) {
    return restConnector({
      url: "lanes",
      method: "DELETE",
      data: { id: Number(laneId) }
    });
  }

  updateTask(updataLane) {
    return restConnector({
      url: "lanes",
      method: "PUT",
      data: updataLane
    });
  }
}

export default new TasksService();
