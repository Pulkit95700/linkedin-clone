import React, { useState } from "react";
import Logo from "../../assets/logo.png";
import SearchIcon from "@mui/icons-material/Search";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import Card from "../ui/Card";
import { Avatar } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/userReducer/userSlice";
import { NavLink } from "react-router-dom";

// px-12 = padding 3rem from both sides
const NavBar = () => {
  const [openProfilePopup, setOpenProfilePopup] = useState(false);
  const dispatch = useDispatch();
  const signOut = () => {
    dispatch(logout());
  }

  const {photoURL} = useSelector((state) => state.user);
  return (
    <nav className="bg-white px-7 sm:px-12 flex py-1 justify-between items-center border-b border-slate-300 fixed top-0 w-full z-40 shadow">
      <div className="navbar-left flex items-center">
        <img className="w-11" src={Logo} alt="logo" />
        <div className="hidden sm:flex md:w-64 pl-4 navbar-left__search items-center rounded h-8 bg-[#eef3f8]">
          <SearchIcon className="text-[#081018] !text-base !font-black" />
          <input
            type="text"
            className="flex-1 bg-inherit outline-none pl-1 text-sm text-black placeholder:text-black"
            placeholder="Search"
          />
        </div>
      </div>
      <ul className="navbar-right translate-y-1 flex flex-1 list-none items-center justify-center gap-2">
        <li className="h-10 w-10 sm:w-16 place-items-center grid">
          <NavLink
            className={({ isActive }) =>
              `${
                isActive
                  ? "text-black md:border-b-2 text-center md:border-black w-full"
                  : "w-full text-[#6a6c6e] text-center"
              } h-full items-center flex justify-center`
            }
            to={"/feed"}
          >
            <HomeRoundedIcon className={""} />
            {/* <p className="hidden md:block text-xs text-center">Home</p> */}
          </NavLink>
        </li>
        <li className="h-10 w-10 sm:w-16 place-items-center grid">
          <NavLink
            className={({ isActive }) =>
              `${
                isActive
                  ? "text-black md:border-b-2 text-center md:border-black w-full"
                  : "text-[#6a6c6e] w-full text-center"
              } h-full items-center flex justify-center`
            }
            to={"/connections"}
          >
            <GroupRoundedIcon className={""} />
            {/* <p className="hidden md:block text-xs text-center">Network</p> */}
          </NavLink>
        </li>
        <li className="h-10 w-10 sm:w-16 place-items-center grid">
          <NavLink
            className={({ isActive }) =>
              `${
                isActive
                  ? "text-black md:border-b-2 text-center md:border-black w-full"
                  : "text-[#6a6c6e] w-full text-center"
              } h-full items-center flex justify-center`
            }
            to={"/chats"}
          >
            <ChatRoundedIcon className={""} />
            {/* <p className="hidden md:block text-xs text-center">Messages</p> */}
          </NavLink>
        </li>
      </ul>
      <div className="md:w-64 relative">
        <Avatar
          src={`${photoURL}`}
          className="!text-xs ml-auto cursor-pointer"
          onClick={() => setOpenProfilePopup(prev => !prev)}
        />
        {openProfilePopup && <Card className = "absolute bg-white text-xs rounded top-full left-full py-2 text-center -translate-x-full w-32">
            <button className="hover:underline hover:bg-slate-100 cursor-pointer text-center w-full h-full px-1 py-1 bg-none" onClick={signOut}>Sign Out</button>
        </Card>}
      </div>
    </nav>
  );
};

export default NavBar;
