import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCookie } from "./utils/utils";
import { login } from "./store/userReducer/userSlice";
import NavBar from "./components/NavBar/NavBar";
import Connections from "./pages/Connections";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Chats from "./pages/Chats";


function App() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    if (getCookie("uid") !== "") {
      const data = {
        userName: getCookie("userName"),
        email: getCookie("email"),
        photoURL: getCookie("photoURL"),
        uid: getCookie("uid"),
      };

      dispatch(login(data));
    }
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        {isAuthenticated && <NavBar />}
        <Routes>
          {!isAuthenticated && <Route path="/login" element={<Login />} />}
          {isAuthenticated && (
            <>
              <Route path="/" element={<Navigate to={"/feed"} />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/chats" element={<Chats />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<Navigate to={"/feed"} />} />
            </>
          )}
          {!isAuthenticated && (
            <Route path="*" element={<Navigate to={"/login"} />} />
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
