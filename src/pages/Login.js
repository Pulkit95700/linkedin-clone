import React from "react";
import Logo from "../assets/logo.png";
import GoogleIcon from "@mui/icons-material/Google";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { signIn } from "../store/userReducer/userSlice";

const Login = () => {
  const dispatch = useDispatch();

  return (
    <div className="border bg-white border-slate-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl w-64 h-64 flex flex-col gap-4 items-center justify-center py-2 px-2">
      <img src={Logo} alt="linkedIn" />
      <Button variant="contained" onClick={() => dispatch(signIn())}>
        <GoogleIcon className="!w-4 !h-4 -translate-y-[1px]" />
        <span className="ml-1">Sign In With Google</span>
      </Button>
    </div>
  );
};

export default Login;
