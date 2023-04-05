import React from 'react'
import TopBar from './topbar'
import FileInput from './fileInput'
import Hero from './Hero'
import Scanners from './scanners'
function page() {
  return (
    <div className='p-5 bg-zinc-900 h-screen'>
      <TopBar/>
      <Scanners />
      <FileInput />
      <div className='text-white'>outputs section</div>
    </div>
  )
}

export default page