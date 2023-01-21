import React from 'react';
import { Avatar } from '@mui/material';

const PostCommentForm = (props) => {
  return (
    <div className={`${props.hidden && 'hidden'} flex gap-1 px-2 h-9 items-center mt-2`}>
      <Avatar src="https://media.licdn.com/dms/image/D4D35AQFCG8BkmrWPkQ/profile-framedphoto-shrink_100_100/0/1658591333394?e=1674460800&v=beta&t=ZjDEGduqEc52bNeihtHtTsUQlz8h6k_mD0gvzeXaVdw" className='!hidden sm:!flex' />
      <form className='rounded-3xl flex-1 text-sm border border-slate-400 flex items-center h-9'>
        <input type="text" className='rounded-3xl flex-1 text-sm placeholder:text-slate-400 outline-none px-4' placeholder='Add a comment...'/>
        <button type="submit" className='rounded-r-3xl text-white font-light w-16 sm:w-24 grid place-items-center bg-sky-700 hover:bg-sky-500 h-full'>Post</button>
      </form>
    </div>
  )
}

export default PostCommentForm