import { restConnector } from "../../connector/axios";

class ClassroomService {
  studentSignUp(student) {
    return restConnector({
      url: 'Accounts/Student',
      method: "POST",
      data: student
    });
  }
}

export default new ClassroomService();