import React from "react";

const Comment = (props) => {
  return (
    <div className="comment w-64 border border-slate-500 rounded px-2 py-1 bg-slate-100 mb-1">
      <p className="text-xs font-semibold">Pulkit Gupta</p>
      <p className="text-xs">hello This is my first Comment</p>
    </div>
  );
};
const Comments = (props) => {
  return (
    <div className="bg-slate-200 w-full px-4 py-2 mt-2">
      <Comment />
    </div>
  );
};

export default Comments;
