import { restConnector } from "core/services/axios";

class ClassroomService {
  getClassrooms(filter) {
    return restConnector({
      url: `classrooms?schoolYear=${filter.schoolYear}&semester=${filter.semester}`,
      method: "GET",
    });
  }

  getStudentList(classroomId) {
    return restConnector({
      url: `classrooms/students?classroomId=${classroomId}`,
      method: "GET",
    });
  }
}

export default new ClassroomService();
