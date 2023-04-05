import React from 'react'

function InfoTabs(props: {
    title: string,
    info: string
}) {
  return (
    <div className='flex justify-center items-center flex-col'>
        <h1>{props.title}</h1>
        <p>{props.info}</p>
    </div>
  )
}

export default InfoTabs