import { restConnector } from "../../services/axios";
class TreeSubjectService {
    fetchSubjectsDDT() {
        return restConnector({
            url: '/electronic/subjects/tree/ddt',
            method: "GET",
        });
    }
    fetchSubjectsDTVT() {
        return restConnector({
            url: '/electronic/subjects/tree/dtvt',
            method: "GET",
        });
    }
}
export default new TreeSubjectService();