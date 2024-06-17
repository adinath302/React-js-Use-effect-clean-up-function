import { createContext, useReducer } from "react";

export const PostList = createContext({
  postlist: [],
  addpost: () => {},
  deletepost: () => {},
  addinitialposts: () => {},
});

const PostListReducer = (CurrentPostList, action) => {
  switch (action.type) {
    case "DELETE_POST":
      return CurrentPostList.filter(post => post.id !== action.payload.postid);
    case "ADD_INITIAL_POSTS":
      return action.payload.posts;
    case "ADD_POST":
      return [action.payload, ...CurrentPostList];
    default:
      return CurrentPostList;
  }
};

const PostListProvider = ({ children }) => {
  const [postlist, dispatchpostlist] = useReducer(PostListReducer, []);

  const addpost = (userid, title, body, reactions, tags) => {
    dispatchpostlist({
      type: "ADD_POST",
      payload: {
        id: Date.now(),
        title,
        body,
        reactions: { likes: reactions.likes || 0, dislikes: reactions.dislikes || 0 },
        userId: userid,
        tags,
      },
    });
  };

  const addinitialposts = (posts) => {
    dispatchpostlist({
      type: "ADD_INITIAL_POSTS",
      payload: { posts },
    });
  };

  const deletepost = (postid) => {
    dispatchpostlist({
      type: "DELETE_POST",
      payload: { postid },
    });
  };

  return (
    <PostList.Provider value={{ postlist, addpost, deletepost, addinitialposts }}>
      {children}
    </PostList.Provider>
  );
};

export default PostListProvider;
