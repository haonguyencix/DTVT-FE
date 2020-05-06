import { restConnector } from "core/services/axios";

class ClassroomService {
  getClassrooms(filter, role) {
    return restConnector({
      url: `classrooms/${role}?schoolYear=${filter.schoolYear}&semester=${filter.semester}`,
      method: "GET",
    });
  }

  getStudentList(classroomId) {
    return restConnector({
      url: `classrooms/students?classroomId=${classroomId}`,
      method: "GET",
    });
  }

  appointLead(studentId, classroomId, status) {
    return restConnector({
      url: `/classrooms/lead/${status}`,
      method: "PUT",
      data: { studentId, classroomId }
    });
  }
}

export default new ClassroomService();
