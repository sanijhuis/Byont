import React from 'react'

export default function FileInput() {
    return (
        <div className='flex justify-between mb-20 mt-2'>
            <div className='flex flex-col p-10 shadow-lg border-2'>
                <h1 className='text-white'>file input</h1>
                <input type='file' className='text-white'></input>
                <div className='text-white'>scanner settings</div>
            </div>
        </div>
    )
}