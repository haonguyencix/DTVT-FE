import { restConnector } from "core/services/axios";

class ClassroomService {
  getClassrooms(filter, role) {
    return restConnector({
      url: `classrooms/${role}${
        role === "LECTURE" ? `/${filter.category}` : ""
      }?schoolYear=${filter.schoolYear}&semester=${filter.semester}`,
      method: "GET",
    });
  }

  getStudentList(classroomId, postType) {
    return restConnector({
      url: `classrooms/students?classroomId=${classroomId}&type=${postType}`,
      method: "GET",
    });
  }

  appointLead(studentId, classroomId, status, postType) {
    return restConnector({
      url: `/classrooms/lead/${status}`,
      method: "PUT",
      data: { studentId, classroomId, type: postType },
    });
  }

  getClassroomInfo(classroomId, postType) {
    return restConnector({
      url: `classrooms/info?classroomId=${classroomId}&type=${postType}`,
      method: "GET",
    });
  }

  getClassroomCategory() {
    return restConnector({
      url: `classrooms/category`,
      method: "GET",
    });
  }
}

export default new ClassroomService();
