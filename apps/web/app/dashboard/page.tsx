import React from 'react'
import TopBar from './topbar'
import FileInput from './fileInput'
function page() {
  return (
    <div className='p-5 bg-zinc-900 h-screen'>
      <TopBar/>
      <hr></hr>
      <FileInput />
      <div className='text-white'>outputs section</div>
    </div>
  )
}

export default page