import { createSlice } from "@reduxjs/toolkit";
import { setCookie } from "../../utils/utils";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase/firebase";
import { getSnap } from "../../firebase/StorageUtils";
import { addUserData } from "../../firebase/StorageUtils";

const initialState = {
  isAuthenticated: false,
  uid: '',
  userName: "Pulkit",
  email: '',
  photoURL: '',
  posts: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action){
      state.isAuthenticated = true;
      state.uid = action.payload.uid;
      state.email = action.payload.email;
      state.photoURL = action.payload.photoURL;
      state.userName = action.payload.userName;
    },

    logout(state) {
      state.isAuthenticated = false;
      setCookie("uid", "", 0);
    },

    setPosts(state, action){
      state.posts = action.payload;
    },

    addPost(state, action){
      state.posts.unshift(action.payload);
    }
  },
});

const signIn = () => async (dispatch) => {
  try {
    const response = await signInWithPopup(auth, provider);

    const data = {
      userName: response.user.displayName,
      email: response.user.email,
      photoURL: response.user.photoURL,
      uid: response.user.uid,
    };
    
    setCookie("userName", response.user.displayName, 0.5);
    setCookie("email", response.user.email, 0.5);
    setCookie("photoURL", response.user.photoURL, 0.5);
    setCookie("uid", response.user.uid, 0.5);

    // we can store the user information on login with cookies so that we have to not login again and again
    const querySnapshot = await getSnap(`${response.user.uid}`);

    console.log(querySnapshot.docs);
    if(querySnapshot.docs.length === 0){
      await addUserData(data);
    }else{
      console.log(querySnapshot.docs);
    }

    dispatch(login(data));
    
  } catch (err) {
    console.log("not able to use it.");
    alert("it caused Error");
  }

};
export default userSlice;

const userReducer = userSlice.reducer;

export { userReducer };

const { login, logout, setPosts, addPost } = userSlice.actions;

export { logout, login, signIn, setPosts, addPost};
