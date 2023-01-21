import React, { useState } from "react";
import Card from "../ui/Card";
import PostCommentForm from "./PostCommentForm";
import { Avatar } from "@mui/material";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import PostAddIcon from "@mui/icons-material/PostAdd";
import SendIcon from "@mui/icons-material/Send";
import Comments from "./Comments";
import { useSelector } from "react-redux";

const Post = (props) => {
  const [showComments, setShowComments] = useState(false);
  const [liked, setLiked] = useState(false);
  const { photoURL, userName, email } = useSelector((state) => state.user);
  return (
    <Card className="bg-white py-2">
      <div className="post-header px-3">
        <div className="post-owner block">
          <Avatar
            src={photoURL}
            className="float-left mr-2 realtive top-[2px] !w-12 !h-12"
          />
          <p className="text-sm font-semibold">{userName}</p>
          <p className="text-[10px] sm:text-xs">{email}</p>
          <p className="text-xs">{props.time}</p>
        </div>
        <div className="post-lines text-xs sm:text-sm mt-7 px-1">
          {props.postContent}
        </div>
      </div>
      <div className="mt-3 bg-cyan-100">
        {props.postType === "image" && (
          <img src={props.postImage} className="mx-auto" alt="Post Pic" />
        )}
        {props.postType === "video" && (
          <video controls className="mx-auto">
            <source src={props.postImage} type="video/webm" />
          </video>
        )}
      </div>
      <div className="post-options px-3">
        <p className="text-xs text-slate-400 py-2 border-b border-slate-300">
          {props.totalLikes + "  likes"}
        </p>
        <div className="options flex justify-evenly mt-1">
          <button
            onClick={() => setLiked((l) => !l)}
            className="option-icon w-24 sm:w-32 flex justify-center gap-[2px] sm:gap-1 hover:bg-slate-200 h-12 items-center rounded-md"
          >
            <ThumbUpOffAltIcon
              className={`text-slate-600 !text-sm sm:!text-md ${
                liked && "text-sky-400"
              }`}
            />
            <p className="text-xs md:text-sm text-slate-600 font-semibold">
              Like
            </p>
          </button>
          <button
            onClick={() => setShowComments((show) => !show)}
            className="option-icon w-24 sm:w-32 flex justify-center gap-[2px] sm:gap-1 hover:bg-slate-200 h-12 items-center rounded-md"
          >
            <ChatBubbleOutlineIcon className="text-slate-600 !text-sm sm:!text-md" />
            <p className="text-xs md:text-sm text-slate-600 font-semibold">
              Comment
            </p>
          </button>
          <button className="option-icon w-24 sm:w-32 flex justify-center gap-[2px] sm:gap-1 hover:bg-slate-200 h-12 items-center rounded-md">
            <PostAddIcon className="text-slate-600 !text-sm sm:!text-md" />
            <p className="text-xs md:text-sm text-slate-600 font-semibold">
              Repost
            </p>
          </button>
          <button className="option-icon w-24 sm:w-32 flex justify-center gap-[2px] sm:gap-1 hover:bg-slate-200 h-12 items-center rounded-md">
            <SendIcon className="text-slate-600 !text-sm sm:!text-md" />
            <p className="text-xs md:text-sm text-slate-600 font-semibold">
              Send
            </p>
          </button>
        </div>
      </div>
      {showComments && (
        <>
          <Comments hidden={false} />
          <PostCommentForm hidden={false} />
        </>
      )}
    </Card>
  );
};

export default Post;
