import React from 'react'

function FileOutput() {
  return (

    <div className="relative overflow-x-auto bg-zinc-800">
      <table className="w-full text-sm text-left text-gray-300">
        <thead className="text-xs uppercase border-b">
          <tr>
            <th scope="col" className="px-6 py-3">
              file name
            </th>
            <th scope="col" className="px-6 py-3">
              file size
            </th>
            <th scope="col" className="px-6 py-3">
              scanners used
            </th>
            <th scope="col" className="px-6 py-3">
              download
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap dark:text-white">
              test1.sol
            </th>
            <td className="px-6 py-4">
            64Mb
            </td>
            <td className="px-6 py-4">
            Mithril, Manticore
            </td>
            <td className="px-6 py-4">
              <button className='p-2 bg-lime-500 text-white rounded-xl'>download</button>
            </td>
          </tr>
          <tr className="border-b">
            <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap ">
            test1.sol
            </th>
            <td className="px-6 py-4">
            64Mb
            </td>
            <td className="px-6 py-4">
            Mithril, Manticore
            </td>
            <td className="px-6 py-4">
            <button className='p-2 bg-lime-500 text-white rounded-xl'>download</button>
            </td>
          </tr>
          <tr className="border-b">
            <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap ">
            test1.sol
            </th>
            <td className="px-6 py-4">
            64Mb
            </td>
            <td className="px-6 py-4">
            Mithril, Manticore
            </td>
            <td className="px-6 py-4">
            <button className='p-2 bg-lime-500 text-white rounded-xl'>download</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  )
}

export default FileOutput