import { restConnector } from "../../connector/axios";

class TasksService {
    fetchTasks() {
        return restConnector({
            url: 'lanes',
            method: "GET",
        });
    }
}

export default new TasksService();