'use client';

import Link from "next/link";
import React from "react";
import { useState } from "react"
import { BsGithub } from "react-icons/bs";
export default function Login() {

  let [currentForm, setCurrentForm] = useState('');
  const toggleFunction = () => {
    if (currentForm === 'login') {
      setCurrentForm('register');
    } else {
      setCurrentForm('login');
     }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-zinc-900">
      <section className="m-auto">
        <div className="">
          <div>
          <svg width="90" height="90" viewBox="0 0 80 32" xmlns="http://www.w3.org/2000/svg"><path className="fill-lime-300" d="M21.6156 11.3611L24.2897 18.9613L28.3008 11.3611H32.7577L26.0441 23.9473L26.0724 24.0278H26.0012L21.6156 32.25H17.2761L21.6156 24.0278L17.1588 11.3611H21.6156ZM4.45682 0.25V19.1389C4.45682 20.9798 5.95337 22.4722 7.79944 22.4722C9.64552 22.4722 11.1421 20.9798 11.1421 19.1389C11.1421 17.2979 9.64552 15.8056 7.79944 15.8056L7.77778 15.8058V11.3613L7.79944 11.3611C12.0639 11.3611 15.529 14.774 15.5978 19.0103L15.5989 19.1389C15.5989 23.4344 12.107 26.9167 7.79944 26.9167C3.535 26.9167 0.0699201 23.5037 0.0010449 19.2675L0 19.1389L0 0.25H4.45682ZM41.0028 11.3611C45.3103 11.3611 48.8022 14.8433 48.8022 19.1389C48.8022 23.4344 45.3103 26.9167 41.0028 26.9167C36.6953 26.9167 33.2033 23.4344 33.2033 19.1389C33.2033 18.2696 33.3463 17.4337 33.6102 16.6531L37.8395 18.0589C37.7233 18.3976 37.6602 18.7609 37.6602 19.1389C37.6602 20.9798 39.1567 22.4722 41.0028 22.4722C42.8489 22.4722 44.3454 20.9798 44.3454 19.1389C44.3454 17.2979 42.8489 15.8056 41.0028 15.8056C40.5584 15.8056 40.1344 15.892 39.7465 16.049L38.3354 11.8279C39.1676 11.5258 40.0659 11.3611 41.0028 11.3611ZM59.2758 11.3611C63.5402 11.3611 67.0053 14.774 67.0742 19.0103L67.0752 19.1389V26.9167H62.6184V19.1389C62.6184 17.2979 61.1218 15.8056 59.2758 15.8056C57.4531 15.8056 55.9711 17.2604 55.9339 19.0691L55.9331 19.1389V26.9167H51.4763V19.1389L51.4774 19.0103C51.5462 14.774 55.0113 11.3611 59.2758 11.3611ZM76.6574 5.80556L76.6573 11.3611H80V15.8056H76.6573L76.6574 19.1389C76.6574 20.9798 78.1539 22.4722 80 22.4722V26.9167L79.871 26.9156C75.6655 26.8476 72.2691 23.4603 72.2016 19.2662L72.2006 19.1389L72.2004 15.8056H68.8579V11.3611H72.2004L72.2006 5.80556H76.6574Z" fill="current"></path></svg>
          </div>
          <p className="text-4xl text-gray-200">Scan your <span className="text-lime-300">smart contract</span> </p>
          <p className="text-2xl text-gray-500">for <span className="text-red-400">security risks</span> &</p>
          <p className="text-2xl text-gray-500">never worry about security issues again.</p>
        </div>
      </section>
      <section className="m-auto flex flex-row">
        <div className="shadow-lg rounded-md p-20">
          <p className="text-center text-xl text-white">{currentForm === "login" ? <span>Register</span> : <span>Login</span>}</p>
          <hr></hr>
          <form className="flex flex-col">
            <input type="email" placeholder="Email" className="p-2 m-2 rounded-md" style={{display: currentForm == 'login' ? 'flex' : 'none'}} />
            <input type="text" placeholder="Username" className="p-2 m-2 rounded-md" />
            <input type="password" placeholder="Password" className="p-2 m-2 rounded-md" />
            <input type="password" placeholder="re-enter password" className="p-2 m-2 rounded-md" style={{display: currentForm == 'login' ? 'flex' : 'none'}} />
            <Link href={'/dashboard'} type="submit" className="text-center shadow-xl bg-lime-300 rounded-lg p-1" >{currentForm === 'login' ? <span>Register</span> : <span>Login</span>}</Link>
          </form>
          <div className="flex justify-center flex-col">
          <p className="text-white">Don't have an account?<span className="hover:underline hover:cursor-pointer text-indigo-800" onClick={toggleFunction}>{currentForm === "login" ? <span> Login here!</span> : <span> Register here!</span>}</span></p>
          <p className="mt-5 text-white">other signup methods</p>
          <hr></hr>
          <h1 className="fa fa-github text-4xl text-white mt-2"><Link href={'http://localhost:3001/auth'}><BsGithub /></Link></h1>
          <p className="text-white">github</p>
          </div>
        </div>
      </section>
    </div>
  )
}
