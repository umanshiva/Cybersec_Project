// import React, {useState} from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import {Button , Input, Logo} from './index'
// import { useForm } from 'react-hook-form'


// function Login() {

//     const navigate = useNavigate()

//     const {register, handleSubmit} = useForm()

//     const [error, setError] = useState("")

//     const login = async (data) => {
//         setError("")

//         try {
//             let session = 1

//             if(session){

//                 // get user data from backend and then dispatch it to our store
//                 // const userData = await authService.getCurrentUser().then(dispatch(authLogin(userData)))

//                 // and then navigate to home page
//                 // when u use navigate it automatically navigates to the link but if u use link then u have to click something to go there
//                 navigate('/dashboard')
//             }
//         } catch (error) {
//             setError(error.message)
//         }
//     }


//   return (
//     <div
//     className='flex items-center justify-center w-full'>
//         <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
//         <div className="mb-2 flex justify-center">
//                     <span className="inline-block w-full max-w-[100px]">
//                         <Logo width="100%" />
//                     </span>
//         </div>
//         <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>

//         {/* if account dont exist then we give option to sign up */}
//         {/* <p className="mt-2 text-center text-base text-black/60">
//                     Don&apos;t have any account?&nbsp;
//                     <Link
//                         to="/signup"
//                         className="font-medium text-primary transition-all duration-200 hover:underline"
//                     >
//                         Sign Up
//                     </Link>
//         </p> */}

//         {/* display errors if any */}
//         {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

//         {/* create form-> call handleSubmit from useForm and pass in login as function as handleSubmit manages the states and takes the values from the input fields */}
//         <form onSubmit={handleSubmit(login)} className='mt-8'>
//             <div className='space-y-5'>

//                 <Input
//                     label="Username: "
//                     placeholder="Enter your username"
//                     type="text"
//                     // useForm() vala register toh pehle spread karo aur ye cheze add kardo (make the keys of register unique("username"))
//                     {...register("username", {
//                         required: true,
//                         validate: {
//                         matchPattern: (value) => /^[a-zA-Z0-9_]{3,15}$/.test(value) || 
//                             "Username must be 3-15 characters long and can only contain letters, numbers, and underscores",
//                         }
//                     })}
//                 />


//                 <Input
//                 label="Password: "
//                 type="password"
//                 placeholder="Enter your password"
//                 {...register("password", {
//                     required: true,
//                 })}
//                 />

//                 {/* button for submit */}
//                 <Button
//                 type="submit"
//                 className="w-full"
//                 >Sign in</Button>
//             </div>
//         </form>
//         </div>
//     </div>
//   )
// }

// export default Login

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Input, Logo } from './index';
import { useForm } from 'react-hook-form';

function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setError('');
    setLoading(true);

    const formDetails = new URLSearchParams();
    formDetails.append('username', data.username);
    formDetails.append('password', data.password);

    try {
      const response = await fetch('http://localhost:8000/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formDetails,
      });

      setLoading(false);

      if (response.ok) {
        const responseData = await response.json();
        localStorage.setItem('access_token', responseData.access_token);
        console.log("IF EXEC")
        navigate('/dashboard');
      } else {
        const errorData = await response.json();
        console.log("ELSE EXEC")
        setError(errorData.detail || 'Authentication failed!');
      }
    } catch (error) {
      setLoading(false);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Username: "
              placeholder="Enter your username"
              type="text"
              {...register('username', {
                required: 'Username is required',
                validate: {
                  matchPattern: (value) =>
                    /^[a-zA-Z0-9_]{3,15}$/.test(value) ||
                    'Username must be 3-15 characters long and can only contain letters, numbers, and underscores',
                },
              })}
            />
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register('password', {
                required: 'Password is required',
              })}
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Logging in...' : 'Sign in'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
