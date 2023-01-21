import React, { useRef, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  closeModal,
  setPostRefresh,
  toggleImageBox,
  toggleVideoBox,
} from "../../store/uiReducer/uiSlice";
import Card from "../ui/Card";
import { Avatar } from "@mui/material";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import PhotoSizeSelectActualIcon from "@mui/icons-material/PhotoSizeSelectActual";
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";
import Modal from "@mui/material/Modal";
import CircularProgressWithLabel from "../ui/CircularProgressWithLabel";
import { db, storage } from "../../firebase/firebase";
import {
  doc,
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";
import { v4 } from "uuid";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const AddPostModal = (props) => {
  const { userName, uid, photoURL, email } = useSelector((state) => state.user);
  const { showAddFormImageBox, showAddFormVideoBox, showModal } = useSelector(
    (state) => state.ui
  );
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState("");
  const [postInput, setPostInput] = useState("");
  const [progressValue, setProgressValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const modalRef = useRef();
  const dispatch = useDispatch();

  const uploadFile = useCallback((e) => {
    e.preventDefault();
    if (file == null) {
      alert("please enter a file(image or video) with post");
      return;
    }

    setLoading(true);

    const fileRef = ref(storage, `files/${uid}/${v4()}${file.name}`);

    const uploadTask = uploadBytesResumable(fileRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setProgressValue(progress);

        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            console.log("working fine");
        }
      },
      (error) => {
        setLoading(false);

        switch (error.code) {
          case "storage/unauthorized":
            setError("storage/unauthorized");
            break;
          case "storage/canceled":
            setError("storage/canceled");
            break;
          case "storage/unknown":
            setError("storage/unknown");
            break;
          default:
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const usersRef = doc(db, "users", `${uid}`);
          const postsRef = collection(usersRef, "posts");

          addDoc(postsRef, {
            text: postInput,
            type: fileType,
            url: downloadURL,
            timestamp: serverTimestamp(),
          })
            .then((docRef) => {
              onSnapshot(docRef, (dat) => {
                console.log(dat.data());
                // dispatch(addPost({id: dat.id(), ...dat.data(), timestamp: new Date(doc.data().timestamp.toDate()).toTimeString()}))
              });
              dispatch(setPostRefresh());
              setLoading(false);
              setFile(null);
              setFileType("");
              dispatch(closeModal());
            })
            .catch((err) => {
              setLoading(false);

              setError("could not connect to database..");
            });
        });
      }
    );
  }, [file, uid, dispatch, fileType, postInput]);

  const fileInputChangeHandler = (e, type) => {
    e.preventDefault();
    const file = e.target.files[0];
    setFileType(type);
    setFile(file);
  };

  return (
    <div ref={modalRef}>
      <Modal open={showModal} onClose={() => dispatch(closeModal())}>
        <Card className="animate__animated animate__fadeIn bg-white w-4/5 md:w-1/2 mx-auto translate-y-14 !rounded-lg px-3 py-2">
          <h1 className="inline-block">Create Post</h1>
          <button onClick={() => dispatch(closeModal())}>
            <CancelPresentationIcon className="hover:text-red-500 absolute left-full top-2 -translate-x-[150%]" />
          </button>
          <hr className="text-slate-500" />
          <div className="post-owner mt-4">
            <Avatar
              src={photoURL}
              className="float-left mr-2 realtive top-[2px] !w-12 !h-12"
            />
            <p className="text-sm font-semibold">{userName}</p>
            <p className="text-[10px] sm:text-xs">{email}</p>
            <p className="text-xs">{new Date().toTimeString()}</p>
          </div>
          {error && <p>{error}</p>}
          {!error && loading && (
            <CircularProgressWithLabel value={progressValue} />
          )}
          {!error &&
            !loading &&
            !showAddFormImageBox &&
            !showAddFormVideoBox && (
              <form className="">
                <textarea
                  className="sm:text-md w-full outline-none px-2 mt-2 h-32 sm:h-64"
                  placeholder="What you want to talk about?"
                  value={postInput}
                  onChange={(e) => setPostInput(e.target.value)}
                ></textarea>
                <div className="flex gap-3 w-full items-center">
                  <button
                    type="button"
                    onClick={() => dispatch(toggleImageBox())}
                  >
                    <PhotoSizeSelectActualIcon className="text-slate-500" />
                  </button>
                  <button
                    type="button"
                    onClick={() => dispatch(toggleVideoBox())}
                  >
                    <SmartDisplayIcon className="text-slate-500" />
                  </button>

                  <p className="flex-1 text-xs text-center">Add hashtags</p>
                  <button
                    onClick={uploadFile}
                    type="submit"
                    className="post ml-auto p-2 w-14 rounded-xl bg-sky-600 text-white"
                  >
                    Post
                  </button>
                </div>
              </form>
            )}
          {!loading && showAddFormImageBox && (
            <div class="w-full text-center mt-4 mb-2">
              <input
                type={"file"}
                onChange={(e) => fileInputChangeHandler(e, "image")}
                accept=".jpg,.png,.jpeg,.gif"
              />
              <div className="mt-2 border w-full bg-slate-200 p-2">
                <img
                  alt="form-Pic"
                  className="mx-auto max-w-32 max-h-32 object-cover"
                  src={file && URL.createObjectURL(file)}
                />
              </div>
              <button
                className="w-20 text-white mt-4 p-2 bg-sky-600 rounded"
                onClick={() => dispatch(toggleImageBox())}
              >
                Done
              </button>
            </div>
          )}
          {!error && !loading && showAddFormVideoBox && (
            <div class="w-full text-center mt-4 mb-2">
              <input
                type={"file"}
                onChange={(e) => fileInputChangeHandler(e, "video")}
                accept=".mp4"
              />
              <div className="mt-2 border w-full bg-slate-200 p-2">
                {file && (
                  <video controls width="250" className="mx-auto">
                    <source
                      src={file && URL.createObjectURL(file)}
                      type="video/webm"
                    />
                  </video>
                )}
              </div>
              <button
                className="w-20 text-white mt-4 p-2 bg-sky-600 rounded"
                onClick={() => dispatch(toggleVideoBox())}
              >
                Done
              </button>
            </div>
          )}
        </Card>
      </Modal>
    </div>
  );
};

export default AddPostModal;
