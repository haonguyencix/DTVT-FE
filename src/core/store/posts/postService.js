import { restConnector } from "core/services/axios";

class PostService {
  createPost(formData) { // có bao gồm upload post images
    return restConnector({
      url: "posts",
      method: "POST",
      data: formData
    });
  }

  deletePost(delObj) {
    return restConnector({
      url: "posts",
      method: "DELETE",
      data: delObj
    });
  }
  
  getPosts(pagination) {
    return restConnector({
      url: `posts?page=${pagination.page}&limit=${pagination.limit}`,
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

  getImgs(postId) {
    return restConnector({
      url: `images?postId=${postId}`,
      method: "GET"
    });
  }

  getInteracts(postId) {
    return restConnector({
      url: `interacts?postId=${postId}`,
      method: "GET"
    });
  }
}

export default new PostService();