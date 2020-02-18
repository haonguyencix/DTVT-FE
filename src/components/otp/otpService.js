import { restConnector } from "../../connector/axios";

class OTPService {
  sendOTP(credentials) {
    return restConnector({
      url: "otp/send",
      method: "POST",
      data: credentials
    });
  }

  verifyOTP(otp) {
    return restConnector({
      url: "otp/verify",
      method: "POST",
      data: otp
    });
  }

  sendOtpForgotPassword(id) {
    return restConnector({
      url: "otp/send/password/forgot",
      method: "POST",
      data: id
    });
  }

  loginResetPassword(otp) {
    return restConnector({
      url: "otp/login/password/reset",
      method: "POST",
      data: otp
    });
  }
}

export default new OTPService();
