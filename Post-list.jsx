import { useContext, useEffect, useState } from "react";
import { PostList as PostListData } from "../store/Post-List-store";
import WelcomeMessage from "./WelcomeMessage";
import Post from "./Post";
import LoadingSpinner from "./Loading-Spinner";

const PostList = () => {
  const { postlist, addinitialposts } = useContext(PostListData);
  const [featching, setfeatching] = useState(false);

  useEffect(() => {
    setfeatching(true);
    fetch("https://dummyjson.com/posts")
      .then((res) => res.json())
      .then((data) => {
        // Ensure reactions field has both likes and dislikes
        const formattedPosts = data.posts.map((post) => ({
          ...post,
          reactions: {
            likes: post.reactions.likes || 0,
            dislikes: post.reactions.dislikes || 0,
          },
          tags: post.tags || [],
        }));
        addinitialposts(formattedPosts);
        setfeatching(false);
      });

    return () => {
      console.log("Cleaning up");
    };
  }, []);

  return (
    <>
      {featching && <LoadingSpinner />}
      {!featching && postlist.length === 0 && <WelcomeMessage />}
      {!featching &&
        postlist.map((posts) => <Post key={posts.id} posts={posts} />)}
    </>
  );
};

export default PostList;
