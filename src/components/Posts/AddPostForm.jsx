import React from "react";
import { Avatar } from "@mui/material";
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";
import ForumIcon from "@mui/icons-material/Forum";
import PhotoSizeSelectActualIcon from "@mui/icons-material/PhotoSizeSelectActual";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AddPostModal from "./AddPostModal";

import "animate.css";
import Card from "../ui/Card";
import {openModal, toggleImageBox, toggleVideoBox } from "../../store/uiReducer/uiSlice";

const AddPostForm = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {photoURL} = useSelector((state) => state.user);

  const showImageBoxHandler = () => {
    dispatch(openModal())
    dispatch(toggleImageBox());
  };

  const showVideoBoxHandler = () => {
    dispatch(openModal())
    dispatch(toggleVideoBox());
  };

  return (
    <>
      <Card className="w-full bg-white px-3 py-2.5">
        <div className="flex gap-3">
          <Avatar src={`${photoURL}`} className="!w-14 !h-14" />
          <button
            onClick={() => dispatch(openModal())}
            className="flex-1 text-left border border-slate-500 hover:bg-slate-100 rounded-full px-6 text-slate-500 text-sm font-semibold"
          >
            Start a post
          </button>
        </div>
        <div className="post-type flex justify-between w-full mt-2 sm:px-12">
          <div
            className="flex gap-1 sm:gap-2 hover:bg-slate-200 cursor-pointer rounded p-2 items-center"
            onClick={showImageBoxHandler}
          >
            <PhotoSizeSelectActualIcon className="text-cyan-600 !w-[20px] sm:!w-auto" />
            <p className="sm:text-sm text-xs text-slate-400 font-semibold">
              Photos
            </p>
          </div>
          <div
            className="flex gap-1 sm:gap-2 hover:bg-slate-200 cursor-pointer rounded p-2 items-center"
            onClick={showVideoBoxHandler}
          >
            <SmartDisplayIcon className="!text-lime-800 !w-[20px] sm:!w-auto" />
            <p className="sm:text-sm text-xs text-slate-400 font-semibold">
              Videos
            </p>
          </div>
          <div
            onClick={() => navigate("/chats")}
            className="flex gap-1 sm:gap-2 hover:bg-slate-200 cursor-pointer rounded p-2 items-center"
          >
            <ForumIcon className="text-violet-400 !w-[20px] sm:!w-auto" />
            <p className="sm:text-sm text-xs text-slate-400 font-semibold">
              Messages
            </p>
          </div>
        </div>
      </Card>
      {/* for showing Modal */}
      <AddPostModal />
    </>
  );
};

export default AddPostForm;