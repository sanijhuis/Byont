import React from 'react'
import TopBar from './topbar'
function page() {
  return (
    <div className='m-5 p-5 ml-10 mr-10'>
      <TopBar/>
      <div className='flex justify-between mb-20'>
        <div>file input section</div>
        <div>scanner settings</div>
      </div>
      <div>outputs section</div>
    </div>
  )
}

export default page