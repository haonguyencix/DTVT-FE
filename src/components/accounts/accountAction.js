// import services
import AccountService from "./accountService";

// import models
import { StudentAccount } from "./account";

export const studentSignUp = (values, replace) => {
  const { id, password, birth, role } = values;
  
  let studentModel = new StudentAccount(id, password, birth, role);
  replace("/");
  
  // AccountService.studentSignUp(studentModel)
  //   .then(res => {
  //     console.log(res);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });
};
