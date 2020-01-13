import { format } from "date-fns";

export class StudentAccount {
  constructor(_id, _password, _birth, _role) {
    this.id = _id;
    this.password = _password;
    this.birth = format(_birth, "yyyy-MM-dd");
    this.role = _role;
  }
}
