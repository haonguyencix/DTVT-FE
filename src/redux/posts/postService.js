import { restConnector } from "services/axios";

class PostService {
  createPost(formData) { // có bao gồm upload post images
    return restConnector({
      url: "posts",
      method: "POST",
      data: formData
    });
  }
  
  getPosts() {
    return restConnector({
      url: "posts",
      method: "GET"
    });
  }

  interactPost(interact) {
    return restConnector({
      url: `posts/interact`,
      method: "POST",
      data: interact
    });
  }
}

export default new PostService();