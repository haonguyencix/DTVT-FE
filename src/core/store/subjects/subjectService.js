import { restConnector } from "../../services/axios";

class TreeSubjectService {
  fetchSubjectsDDT() {
    return restConnector({
      url: "/electronic/subjects/tree/ddt",
      method: "GET",
    });
  }

  fetchSubjectsDTVT() {
    return restConnector({
      url: "/electronic/subjects/tree/dtvt",
      method: "GET",
    });
  }

  fetchCommingSubject(id) {
    return restConnector({
      url: `/coming-subject/?id=${id}`,
      method: "GET",
    });
  }

  postCommingSubject(data) {
    return restConnector({
      url: "/selected-subject",
      method: "POST",
      data: data
    });
  }

  fetchSelectedSubject(id) {
    return restConnector({
      url: `/selected-subject/${id}`,
      method: "GET"
    });
  }

  deleteSelectedSubject(data) {
    return restConnector({
      url: `/selected-subject`,
      method: "DELETE",
      data: data
    });
  }
}
export default new TreeSubjectService();
