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
  #NEWSFEED = "/newsfeed";
  #POST_LIST = "/posts";
  #STUDENT_LIST = "/student-list";
  #POST_DETAIL = "/post-detail";
  #PROFILE = "/profile";
  #POST_SAVED = "/posts-saved";

  // params
  CLASSROOM_ID = ":classroomId";
  POST_TYPE = ":postType";

  // children 1
  // student login (common)
  STUDENT_SIGNUP = "/signup";

  // student home
  TREE_SUBJECT = this.STUDENT_HOME + "/tree-subject";
  STUDENT_POST_LIST = this.STUDENT_HOME + this.#POST_LIST;
  STUDENT_PROFILE = this.STUDENT_HOME + this.#PROFILE;
  STUDENT_POST_DETAIL = this.STUDENT_HOME + this.#POST_DETAIL;
  STUDENT_POST_SAVED = this.STUDENT_HOME + this.#POST_SAVED;
  STUDENT_CLASSROOM(classroomId, postType) {
    return this.STUDENT_HOME + this.#CLASSROOM + "/" + classroomId + "/" + postType;
  }

  // lecture login
  LECTURE_VERIFY = this.LECTURE_LOGIN + this.VERIFY;

  // lecture home
  LECTURE_POST_LIST = this.LECTURE_HOME + this.#POST_LIST;
  LECTURE_PROFILE = this.LECTURE_HOME + this.#PROFILE;
  LECTURE_POST_DETAIL = this.LECTURE_HOME + this.#POST_DETAIL;
  LECTURE_CLASSROOM(classroomId, postType) {
    return this.LECTURE_HOME + this.#CLASSROOM + "/" + classroomId + "/" + postType;
  }

  // children 2
  // student classroom
  STUDENT_CLASSROOM_NEWSFEED(classroomId, postType) {
    return (
      this.STUDENT_CLASSROOM(classroomId, postType) + this.#NEWSFEED
    );
  }
  STUDENT_LIST(classroomId, postType) {
    return this.STUDENT_CLASSROOM(classroomId, postType) + this.#STUDENT_LIST;
  }

  // lecture classroom
  LECTURE_CLASSROOM_NEWSFEED(classroomId, postType) {
    return (
      this.LECTURE_CLASSROOM(classroomId, postType) + this.#NEWSFEED
    );
  }
  LECTURE_STUDENT_LIST(classroomId, postType) {
    return this.LECTURE_CLASSROOM(classroomId, postType) + this.#STUDENT_LIST;
  }
}

export default new PATH();
