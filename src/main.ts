import { Post } from "./model/post";
import { Comment } from "./model/comment";
import { Author } from "./model/author";

const apiUrl: string = "https://jsonplaceholder.typicode.com";

const postsUrl: string = apiUrl + "/posts";
const commentsUrl: string = `${apiUrl}/comments`;
const usersUrl: string = `${apiUrl}/users`;


async function setAuthor(authorId: void): Promise<void> {
  const user: Author = await getApiResponse(`${usersUrl}/${authorId}`);
  const userElement: HTMLElement = document.getElementById("author");
  userElement.classList.add("author");
  userElement.innerHTML = `<h3>${user.name} <small>(${user.email})</small></h3>`;
};

  async function loadComments(postId: any): Promise<void> {
    const comments: Comment[] = await getApiResponse(`${commentsUrl}?postId=${postId}`);
    const commentsContainer = document.getElementById("comments");
    commentsContainer.innerHTML = "";
    for (const comment of comments) {
      const commentElement = document.createElement("div");
      commentElement.classList.add("comment");
      commentElement.innerHTML = `
        <h4><i>${comment.name}</i> by <code>${comment.email}</code></h4>
        <p>${comment.body}</p>
      `;
      commentsContainer.append(commentElement);
    }
  };
async function getApiResponse(url: string): Promise<any> {
    const postsRequest: Promise<Response> = fetch(url);
    const response: Response = await postsRequest;
    const json: any = await response.json();
    return json;
  };
  async function addListElement(post: Post): Promise<void> {
    const element = document.createElement('li');
    const label = `${post.id} ${post.title}`;
    element.innerText = label;
    element.classList.add('title');
    element.addEventListener('click', async () => {
      const contentElement = document.getElementById('content');
      contentElement.innerHTML = `<h2>${post.title}</h2><p>${post.body}</p>`;
      setAuthor(post.userId);
      loadComments(post.id);
    });

    const listContainer = document.getElementById('list');
    listContainer.append(element);
  }
  document.addEventListener("DOMContentLoaded", (): void => {
    const content = document.querySelector("#content");
  
    setTimeout((): void => {
      getApiResponse(postsUrl)
        .then((posts: Post[]) => {
          content.innerHTML = "Select post&hellip;";
  
          for (const post of posts) {
          addListElement(post);
          }
        })
        
        .finally((): void => {
          const loader = document.querySelector("#spinner");
          loader.remove();
        });
    }, 2000);
  });