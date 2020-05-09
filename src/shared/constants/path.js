class PATH {
  // root
  STUDENT_LOGIN = "/";
  STUDENT_HOME = "/student-home";
  LECTURE_LOGIN = "/lecture";
  LECTURE_HOME = "/lecture-home";

  // common
  VERIFY = "/verify";
  FORGOT_PASSWORD = "/forgot-password";
  RESET_PASSWORD = "/reset-password";
  #CLASSROOM = "/classroom";
  #STUDENT_LIST = "/student-list";
  #POST_DETAIL = "/post-detail";
  #PROFILE = "/profile";

  // params
  CLASSROOM_ID = ":classroomId";

  // children 1
  // student login (common)
  STUDENT_SIGNUP = "/signup";

  // student home
  TREE_SUBJECT = this.STUDENT_HOME + "/tree-subject";
  STUDENT_PROFILE = this.STUDENT_HOME + this.#PROFILE;
  STUDENT_POST_DETAIL = this.STUDENT_HOME + this.#POST_DETAIL;
  STUDENT_CLASSROOM(classroomId) {
    return (
      this.STUDENT_HOME + this.#CLASSROOM + "/" + classroomId
    );
  }

  // lecture login
  LECTURE_VERIFY = this.LECTURE_LOGIN + this.VERIFY;

  // lecture home
  LECTURE_PROFILE = this.LECTURE_HOME + this.#PROFILE;
  LECTURE_POST_DETAIL = this.LECTURE_HOME + this.#POST_DETAIL;
  LECTURE_CLASSROOM(classroomId) {
    return (
      this.LECTURE_HOME + this.#CLASSROOM + "/" + classroomId
    );
  }

  // children 2
  // student classroom
  STUDENT_LIST(classroomId) {
    return this.STUDENT_CLASSROOM(classroomId) + this.#STUDENT_LIST;
  }

  // lecture classroom
  LECTURE_STUDENT_LIST(classroomId) {
    return this.LECTURE_CLASSROOM(classroomId) + this.#STUDENT_LIST;
  }
}

export default new PATH();
