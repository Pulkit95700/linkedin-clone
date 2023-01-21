import React from "react";
import Card from "../ui/Card";
import { Avatar } from "@mui/material";
import ProfileBackImage from "./../../assets/wall.jpg";
import { useSelector } from "react-redux";
import "animate.css"

const ProfileSideBar = (props) => {
  const {userName, photoURL, email} = useSelector((state) => state.user);

  return (
    <Card className={`${props.className} bg-white relative`}>
      <div className="realtive w-full">
        <img
          src={ProfileBackImage}
          alt={"profile-bg"}
          className={`'w-full -z-1 realtive rounded-md min-h-1/4 object-cover' ${props.imageClass}`}
        />
        <Avatar
          src={`${photoURL}`}
          className={`border-2 border-white absolute top-full left-1/2 ${props.avatarClass} -translate-x-1/2 -translate-y-1/2`}
        />
      </div>
      <div className="connection-data px-3 text-center -mt-3 border-b">
        <h4 className="font-semibold mb-2">{userName}</h4>
        <p className="text-md pb-6 md:text-xs text-slate-400">
          {email}
        </p>
      </div>
      <div className="px-4 py-3">
        <p className="text-md w-full text-slate-500 font-semibold md:text-sm flex justify-between">
          Connections <span className="text-[#1376d3] font-medium">100</span>
        </p>
        <p className="text-sm my-4 font-medium">Grow your network</p>
        <p className="text-md w-full text-slate-500 font-semibold md:text-sm flex justify-between">
          Posts <span className="text-[#1376d3] font-medium">10</span>
        </p>
      </div>
    </Card>
  );
};

export default ProfileSideBar;
