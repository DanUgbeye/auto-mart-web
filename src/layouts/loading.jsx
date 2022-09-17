import React from 'react'

const Loading = () => {
  return (
    <div className=" absolute top-[50%] translate-y-[-50%] grid place-items-center z-[1001] left-0 right-0 ">
      <i className=" fa fat fa-spinner-third fa-fw fa-5x fa-spin text-primary-red-60 speed "></i>
    </div>
  )
}

export default Loading;