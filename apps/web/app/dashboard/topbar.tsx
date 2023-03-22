import React from 'react'

function TopBar() {
  return (
    <div className='flex justify-between mb-10'>
        <div>logged in user</div>
        <div>
            <button>sync github</button>
            <button>settings</button>
            </div>
    </div>
  )
}

export default TopBar