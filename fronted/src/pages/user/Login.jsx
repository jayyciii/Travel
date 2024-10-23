import Link from 'next/link';
import React, { useState } from 'react'
import Register from './Register';
import { useLoginUserMutation } from '../../redux/features/auth/authApi';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/features/auth/authSlice'; // Import setUser từ authSlice

const Login= () => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loginUser, {isLoading: loginLoading}] = useLoginUserMutation()
 
 const navigate = useNavigate()
  const handleLogin = async(e) => {
    e.preventDefault();
    const data = {
      email,
      password
    }
    //console.log(data);
    try {
      const response = await loginUser(data).unwrap();
      console.log(response)
      const { token, user } = response;
     dispatch(setUser({user}))
      alert("Login successful");
      navigate('/');
    } catch (error) {
      // setMessage("Please prov a valid email and password");
      console.log(error);
    }
    
  }

  return (
    <div className='max-w-sm bg-white mx-auto p-8 mt-36'>
      <h2 className='text-2xl font-semibold pt-5'>Please Login</h2>
      <form onSubmit={handleLogin} className='space-y-5 max-w-sm mx-auto pt-8'>
        <input type='text' value={email}
          placeholder='Email'
          required
          onChange={(e) => setEmail(e.target.value)}
          className='w-full bg-bgPrimary focus:outline-none px-5 py-3'
        />

        <input type='password' value={password}
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
          required
          className='w-full bg-bgPrimary focus:outline-none px-5 py-3'
        />

        {
          message && <p className='text-red-500'>{message}</p>
        }

        <button 
        disabled={loginLoading}
        className='w-full mt-5 bg-primary hover:bg-indigo-500 text-white font-medium py-3 rounded-md'>Login</button>

      </form>

       <p className='my-5 text-center'>Don't have an account? <Link href="/register" className='text-red-700' >Register</Link> here.</p>  

    </div>
  )
}

export default Login