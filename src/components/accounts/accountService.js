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
}

export default new AccountService();