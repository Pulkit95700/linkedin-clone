import React, { useEffect, useCallback } from "react";
import ProfileSideBar from "../components/Profile/ProfileSideBar";
import AddPostForm from "../components/Posts/AddPostForm";
import Post from "../components/Posts/Post";
import Card from "../components/ui/Card";
import { collection, doc, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useSelector, useDispatch } from "react-redux";
import { setPosts } from "../store/userReducer/userSlice";

const Feed = () => {
  const { uid, posts } = useSelector((state) => state.user);
  const {postRefresh} = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  const getPosts = useCallback(async () => {
    const userRef = doc(db, "users", uid);
    const postsRef = query(collection(userRef, "posts"), orderBy("timestamp", "desc"));
    const querySnapshot = await getDocs(postsRef);

    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data(), timestamp: new Date(doc.data().timestamp.toDate()).toTimeString()});
    });

    dispatch(setPosts(data));
  }, [uid, dispatch]);

  useEffect(() => {
    getPosts();
  }, [postRefresh, getPosts]);

  return (
    <div className="px-12 py-4 w-full flex flex-col justify-center items-center md:items-start md:flex-row lg:justify-start gap-4">
      <ProfileSideBar
        className="md:w-64 shrink"
        avatarClass="!w-24 !h-24 md:!w-16 md:!h-16"
      />
      <div className="md:max-w-xl flex-1 w-full feeds__posts flex flex-col gap-4 lg:mr-64">
        <AddPostForm />
        {posts.map((post) => {
          return (
            <Post
              key={post.id}
              postImage={post.url}
              postContent={post.text}
              postType={post.type}
              totalLikes = {0}
              id = {post.id}
              time = {post.timestamp}
            />
          );
        })}
      </div>
      <Card className="hidden lg:flex text-xl px-3 feeds_weather w-64 bg-white text-center min-h-[15rem] h-80 fixed left-full -translate-x-[110%] items-center">
        <h1>
          Hello there! This is Made By Pulkit Gupta. Make sure to use it and
          tell me if anything goes wrong. I am available on linkedIn.
        </h1>
      </Card>
    </div>
  );
};

export default Feed;
