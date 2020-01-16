import { restConnector } from "../../connector/axios";

class OTPService {
  sendOtpFromServer(credentials) {
    return restConnector({
      url: 'OTP/Send',
      method: "POST",
      data: credentials
    });
  }
  
  verifyOTP(otp) {
    return restConnector({
      url: 'OTP/Verify',
      method: "POST",
      data: otp
    });
  }
}

export default new OTPService();