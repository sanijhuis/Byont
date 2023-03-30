import React from 'react'
import { AiTwotoneSetting } from 'react-icons/ai'
function TopBar() {
  return (
    <div className='flex justify-between mb-5 text-white'>
        <div>logged in user</div>
        <div>
            <button className='text-center shadow-xl bg-lime-300 rounded-lg p-1 mr-2'>sync github</button>
            <button><AiTwotoneSetting className='text-2xl' /></button>
            </div>
    </div>
  )
}

export default TopBar