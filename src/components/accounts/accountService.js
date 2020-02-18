import { restConnector } from "../../connector/axios";

class AccountService {
  studentSignUp(student) {
    return restConnector({
      url: 'accounts/student',
      method: "POST",
      data: student
    });
  }

  studentSignIn(student) {
    return restConnector({
      url: 'accounts/student/login',
      method: "POST",
      data: student
    });
  }

  lectureSignUp(lecture) {
    return restConnector({
      url: "accounts/lecture",
      method: "POST",
      data: lecture
    });
  }

  lectureSignIn(lecture) {
    return restConnector({
      url: "accounts/lecture/login",
      method: "POST",
      data: lecture
    });
  }

  resetPassword(newPassword) {
    return restConnector({
      url: "accounts/password/reset",
      method: "POST",
      data: newPassword
    });
  }
}

export default new AccountService();
