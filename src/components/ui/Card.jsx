import React from 'react'

const Card = (props) => {
  return (
    <div className = {`${props.className} rounded-xl border border-slate-300`}>
        {props.children}
    </div>
  )
}

export default Card