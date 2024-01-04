// import React, { useState } from 'react';
import bg from '../images/bg.jpg';

export default function Register() {
  return (
    <div className='w-screen h-screen flex'>
      <main className='w-2/5 bg-slate-200 p-5 flex justify-center items-center'>
        <div className="w-2/3 h-auto">
          <div className="p-5">
            <h2 className="text-3xl font-bold">Create an account</h2>
            <p className="text-slate-500 font-semibold">It takes a few seconds to create an account</p>
          </div>
          <form className="pl-5 pr-5">
            <div className='mb-2'>
              <input type="text" placeholder='First name' className='p-2 w-full rounded-sm' />
            </div>
            <div className='mb-2'>
              <input type="text" placeholder='Last name' className='p-2 w-full rounded-sm' />
            </div>
            <div className='mb-2'>
              <input type="email" placeholder='Email' className='p-2 w-full rounded-sm' />
            </div>
            <div className='mt-2 mb-2'>
              <input type="password" placeholder='Password' className='p-2 w-full rounded-sm' />
            </div>
            <div className="mt-2">
              <button type="submit" className='bg-indigo-500 text-white font-semibold p-2 w-full rounded-sm'>Register</button>
            </div>
          </form>
          <div className="p-5 flex justify-center">
            <p className="text-slate-500">Already have an account? <a href="/login" className='text-indigo-600 font-semibold'>Log In</a></p>
          </div>
        </div>
      </main>
      <aside className='w-3/5 h-full'>
        <img src={bg} className='h-full w-full object-cover' alt="background" />
      </aside>
    </div>
  )
}
