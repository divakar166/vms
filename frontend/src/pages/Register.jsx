import React, { useState } from 'react';

export default function Register() {
  const [loginData, setLoginData] = useState({ name:'',email: '', password: '' });
  const [message, setMessage] = useState('');
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log(loginData)
    setMessage('Login submitted');
  };
  return (
    <div className='w-screen h-screen bg-gradient-to-r from-[#ADA996] via-[#F2F2F2] to-[#EAEAEA] m-0 p-0 flex flex-col justify-center items-center'>
      <div className='text-3xl font-bold p-2'>Vendor Management System</div>
      <div className='h-auto bg-white p-5 w-1/3 shadow-2xl  rounded-lg'>
        <div className="login text-[16px] mb-2 flex justify-between">
          <div className='text-[20px]'>Register</div>
          <div>have an account? <a href="/login" className='text-blue-600'>Login</a></div>
        </div>
        <form onSubmit={handleLoginSubmit}>
          <div className='text-lg'>
            <div className='mb-2'>
              <input
                className='border w-full pl-2'
                type="text"
                value={loginData.name}
                placeholder='Full name'
                onChange={(e) => setLoginData({ ...loginData, name: e.target.value })}
              />
            </div>
            <div className='mb-2'>
              <input
                className='border w-full pl-2'
                type="email"
                value={loginData.email}
                placeholder='Email address'
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
              />
            </div>
            <div className='flex justify-evenly'>
              <div className='mb-2 mr-1'>
                <input
                  className='border w-full pl-2'
                  type="password"
                  value={loginData.password}
                  placeholder='Password'
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                />
              </div>
              <div className='mb-2 ml-1'>
                <input
                  className='border w-full pl-2'
                  type="password"
                  value={loginData.password}
                  placeholder='Confirm password'
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                />
              </div>
            </div>
          </div>
          <div className='flex justify-between mb-2'>
            <div>
              <input type="checkbox" name="remember" id="remember" /> Remember me
            </div>
            <div>
              <a href="#" className='text-blue-500'>Forget password?</a>
            </div>
          </div>
          <div>
            <button type="submit" className='w-full text-lg p-1 bg-blue-600 text-white rounded-md'>Login</button>
          </div>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  )
}
