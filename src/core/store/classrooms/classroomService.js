import { restConnector } from "core/services/axios";

class ClassroomService {
  getClassrooms() {
    return restConnector({
      url: "classrooms",
      method: "GET",
    });
  }

  getStudentList(classroomId) {
    return restConnector({
      url: `classrooms?classroomId=${classroomId}`,
      method: "GET",
    });
  }
}

export default new ClassroomService();
