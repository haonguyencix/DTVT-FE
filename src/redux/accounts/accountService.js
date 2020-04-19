import { restConnector } from "services/axios";

class AccountService {
  signUp(account, role) {
    return restConnector({
      url: `accounts/${role}`,
      method: "POST",
      data: account
    });
  }

  login(account) {
    return restConnector({
      url: 'auth/login',
      method: "POST",
      data: account
    });
  }

  getCredential() {
    return restConnector({
      url: 'credential',
      method: "GET"
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
