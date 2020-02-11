import { restConnector } from "../../connector/axios";

class AccountService {
  studentSignUp(student) {
    return restConnector({
      url: "Accounts/Student",
      method: "POST",
      data: student
    });
  }

  studentSignIn(student) {
    return restConnector({
      url: "Accounts/Student/Login",
      method: "POST",
      data: student
    });
  }

  lectureSignUp(lecture) {
    return restConnector({
      url: "Accounts/Lecture",
      method: "POST",
      data: lecture
    });
  }

  lectureSignIn(lecture) {
    return restConnector({
      url: "Accounts/Lecture/Login",
      method: "POST",
      data: lecture
    });
  }

  forgotPassword(email) {
    return restConnector({
      url: "Accounts/Password/Forgot",
      method: "POST",
      data: email
    });
  }
}

export default new AccountService();
