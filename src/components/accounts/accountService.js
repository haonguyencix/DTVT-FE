import { restConnector } from "../../connector/axios";

class AccountService {
  studentSignUp(student) {
    return restConnector({
      url: 'Accounts/Student',
      method: "POST",
      data: student
    });
  }

  studentSignIn(student) {
    return restConnector({
      url: 'Accounts/Student/Login',
      method: "POST",
      data: student
    });
  }
}

export default new AccountService();