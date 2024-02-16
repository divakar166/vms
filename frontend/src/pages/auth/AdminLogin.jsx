import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bg from './bg.jpg';

const AdminLogin = () => {
  const [message,setMessage] = useState('');
  const navigate = useNavigate();
  const handleLogin = async(e) => {
    e.preventDefault();
    let email = e.target.email.value;
    let password = e.target.password.value;
    try{
      const response = await fetch('http://localhost:5000/admin/login',{
        method:"POST",
        headers:{
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({email,password})
      })
      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem('adminToken', token);
        setMessage('Login Success!');
        navigate('/admin');
      } else {
        const error = await response.json();
        setMessage(error['message']);
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
            <h2 className="text-2xl font-bold">Welcome Back, Admin</h2>
            <p className="text-slate-500">Please enter credentails to log into your account</p>
          </div>
          <form className="pl-5 pr-5" onSubmit={handleLogin}>
            <div className='mb-2'>
              <input type="email" placeholder='Enter email' name='email' className='p-2 w-full rounded-sm' />
            </div>
            <div className='mt-2 mb-2'>
              <input type="password" placeholder='Enter password' name='password' className='p-2 w-full rounded-sm' />
            </div>
            <div className="mt-2 mb-2">
              <a href="/login" className='text-blue-500'>Forget password?</a>
            </div>
            <div className="text-red-600">{message}</div>
            <div className="mt-2">
              <button type="submit" className='bg-blue-500 text-white font-semibold p-2 w-full rounded-sm'>Login</button>
            </div>
          </form>
        </div>
      </main>
      <aside className='w-3/5 h-full'>
        <img src={bg} className='h-full w-full object-cover' alt="background" />
      </aside>
    </div>
  )
}

export default AdminLogin