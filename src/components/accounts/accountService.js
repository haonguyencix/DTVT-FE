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

  forgotPassword(email) {
    return restConnector({
      url: 'Accounts/Password/Forgot',
      method: "POST",
      data: email
    });
  }
}

export default new AccountService();