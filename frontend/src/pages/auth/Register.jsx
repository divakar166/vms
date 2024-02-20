import { useState } from 'react';
import bg from './bg.jpg';

export default function Register() {
  const [message,setMessage] = useState('')
  const handleRegister = async (e) => {
    e.preventDefault();
    let name = e.target.name.value;
    let email = e.target.email.value;
    let password = e.target.password.value;
    try{
      const response = await fetch('http://localhost:5000/auth/register',{
        method:"POST",
        headers:{
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({name,email,password})
      })
      if (response.ok) {
        const res = await response.json();
        setMessage(res['message'])
      } else {
        const error = await response.json();
        setMessage(error['message'])
      }
    }catch(error){
      setMessage(error['message'])
      console.error('Error during login :',error);
    }
  }
  return (
    <div className='w-screen h-screen flex'>
      <main className='w-2/5 bg-slate-200 p-5 flex justify-center items-center'>
        <div className="w-2/3 h-auto">
          <div className="p-5">
            <h2 className="text-3xl font-bold">Create an account</h2>
            <p className="text-slate-500 font-semibold">It takes a few seconds to create an account</p>
          </div>
          <form className="pl-5 pr-5" onSubmit={handleRegister}>
            <div className='mb-2'>
              <input type="text" name='name' placeholder='Full name' className='p-2 w-full rounded-sm' />
            </div>
            <div className='mb-2'>
              <input type="email" name='email' placeholder='Email' className='p-2 w-full rounded-sm' />
            </div>
            <div className='mt-2 mb-2'>
              <input type="password" name='password' placeholder='Password' className='p-2 w-full rounded-sm' />
            </div>
            <div className="mt-2">
              <button type="submit" className='bg-blue-500 text-white font-semibold p-2 w-full rounded-sm'>Register</button>
            </div>
          </form>
          <div className="text-red-500 pl-5">{message}</div>
          <div className="p-5 flex justify-center">
            <p className="text-slate-500">Already have an account? <a href="/login" className='text-blue-600 font-semibold'>Log In</a></p>
          </div>
        </div>
      </main>
      <aside className='w-3/5 h-full'>
        <img src={bg} className='h-full w-full object-cover' alt="background" />
      </aside>
    </div>
  )
}
