import { restConnector } from "../../connector/axios";

class OTPService {
  sendOtpFromServer(credentials) {
    return restConnector({
      url: 'otp/send',
      method: "POST",
      data: credentials
    });
  }
  
  verifyOTP(otp) {
    return restConnector({
      url: 'otp/verify',
      method: "POST",
      data: otp
    });
  }
}

export default new OTPService();