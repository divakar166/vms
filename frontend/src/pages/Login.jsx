import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import bg from '../images/bg.jpg';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [message,setMessage] = useState('');
  const handleLogin = async(e) => {
    e.preventDefault();
    let vendorCode = e.target.vendorCode.value;
    let password = e.target.password.value;
    try{
      const response = await fetch('http://localhost:5000/auth/login',{
        method:"POST",
        headers:{
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({vendorCode,password})
      })
      if (response.ok) {
        const { token } = await response.json();
        login(token);
        setMessage('Login Success!')
        navigate('/')
      } else {
        const error = await response.json();
        setMessage(error['message'])
        console.error('Login failed:', error);
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
            <h2 className="text-2xl font-bold">Welcome Back</h2>
            <p className="text-slate-500">Please enter credentails to log into your account</p>
          </div>
          {message}
          <form className="pl-5 pr-5" onSubmit={handleLogin}>
            <div className='mb-2'>
              <input type="text" placeholder='Enter vendor code' name='vendorCode' className='p-2 w-full rounded-sm' />
            </div>
            <div className='mt-2 mb-2'>
              <input type="password" placeholder='Enter password' name='password' className='p-2 w-full rounded-sm' />
            </div>
            <div className="mt-2 mb-2">
              <a href="/login" className='text-blue-500'>Forget password?</a>
            </div>
            <div className="mt-2">
              <button type="submit" className='bg-blue-500 text-white font-semibold p-2 w-full rounded-sm'>Login</button>
            </div>
          </form>
          <div className="p-5 flex justify-center">
            <p className="text-slate-500">Don't have an account? <a href="/register" className='text-blue-500 font-semibold'>Sign Up</a></p>
          </div>
        </div>
      </main>
      <aside className='w-3/5 h-full'>
        <img src={bg} className='h-full w-full object-cover' alt="background" />
      </aside>
    </div>
  )
}
