import { restConnector } from "../../services/axios";
import { getLocalStorage } from '../../services/common';

class TreeSubjectService {
    fetchSubjectsDDT() {
        return restConnector({
            url: '/electronic/subjects/tree/ddt',
            method: "GET",
            headers:
            {
                "Authorization": "Bearer " + getLocalStorage('STUDENT_LOGIN_TOKEN')
            }
        });
    }
    fetchSubjectsDTVT() {
        return restConnector({
            url: '/electronic/subjects/tree/dtvt',
            method: "GET",
            headers:
            {
                "Authorization": "Bearer " + getLocalStorage('STUDENT_LOGIN_TOKEN')
            }
        });
    }
}
export default new TreeSubjectService();