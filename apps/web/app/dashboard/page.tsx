import React from 'react'
import TopBar from './topbar'
import FileInput from './fileInput'
import Scanners from './scanners'
import FileOutput from './fileOutput'
function page() {
  return (
    <div className='p-5 bg-zinc-900'>
      <TopBar/>
      <Scanners />
      <FileInput />
      <FileOutput />
    </div>
  )
}

export default page