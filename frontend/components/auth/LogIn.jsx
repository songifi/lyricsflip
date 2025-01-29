"use client";

import React, { useState } from "react";
import * as Yup from "yup";
import Image from "next/image";
import Imagee from "../../public/img/LyricsFlipAuthLogo.png"
import { Music, HelpCircle, EyeOffIcon, EyeIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { Label } from "../ui/label";

const LogIn = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = ({ setSubmitting }) => {
    //handles submission
    setSubmitting(false);
  };

  // Initial values for form fields
  const initialValues = {
    email: "",
    password: "",
  };

  //validation schemas for the form
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .min(5, "Email must be more than 5 characters")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  return (
    <div className=' min-h-screen grid md:grid-cols-2'>
      {/* image container section {Left Side}  */}
      <div className='relative hidden md:flex flex-1 rounded-br-[2rem] rounded-tr-[2rem] bg-gradient-to-br from-black via-black to-black    flex-col justify-center items-center p-8 '>
        <span className='spanA absolute z-30 top-0 -left-3 bg-blend-screen rounded-full bg-gradient-to-br from-purple-950 via-purple-950 to-black p-32 mb-6 filter blur-xl'></span>
        <div className='relative z-50 animate-customBounce flex flex-col items-center text-center space-y-8'>
          <Image
            src={Imagee}
            alt='Profile Picture'
            width={300}
            height={200}
            placeholder='blur'
          />
        </div>
        <div className='space-y-4 inset-5 z-50'>
          <h1 className='text-4xl font-bold text-white'>
            Welcome To <span className='text-emerald-400'>LyricFlip</span>
          </h1>
          <p className='text-gray-300 justify-center max-w-sm'>
            Unlock endless fun as you guess song titles, challenge your friends,
            and climb to the top
          </p>
        </div>
        <div className='spanB z-40 absolute bottom-0 right-0 bg-blend-color-dodge rounded-full bg-gradient-to-br from-black via-teal-800 to-white p-32 filter blur-xl'></div>
      </div>

      {/*Form container section {Right Side} */}

      <div className='relative flex flex-col justify-center p-8  '>
        {/* LyricFlip logo  at the top left*/}
        <div className='absolute top-4 left-4 flex items-center gap-2'>
          <Music className='w-5 h-5 bg-[#70E3C7] rounded-md p-1' />
          <span className='  text-[#490878] text-[10px]'>LyricFlip.</span>
        </div>

        {/* Help icon at the top right  */}
        <a href=''>
          <div className='absolute top-4 flex items-center  gap-2 right-10'>
            <HelpCircle className='w-3 h-3' />
            <span className=' text-[#121212] text-[10px] font-bold'>Help</span>
          </div>
        </a>

        {/* form header section  */}
        <div className="mt-6">
          <h1 className='text-[#121212] text-xl md:text-2xl font-bold text-center'>
            Ready to Flip Some <br /> Lyrics Again ?
          </h1>
          <p className='text-center mb-4 md:mb-6 text-sm md:text-base'>
            Dive back in and guess the song titles to climb the <br /> leaderboard. Let
            the music challenge continue
          </p>
        </div>

        {/* form section  */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className='space-y-8 w-full md:px-8 '>
              {/* email field  */}
              <div className='space-y-2 mb-5 flex flex-col '>
                <Label htmlFor='email'>
                  <p className='font-semibold text-[#A09D9D]'>Email</p>
                </Label>
                <div className=' rounded-sm bg-slate-100'>
                  <Field
                    id='email'
                    name='email'
                    type='email'
                    placeholder='Enter your email'
                    className='bg-transparent text-sm p-2 py-3 focus:outline-none'
                  />
                </div>
                <ErrorMessage
                  name='email'
                  component='p'
                  className='text-red-500 text-sm'
                />
              </div>

              {/* password field  */}
              <div className='space-y-2 mb-5'>
                <Label htmlFor='password'>
                  <p className=' font-semibold text-[#A09D9D]'>Password</p>
                </Label>
                <div>
                  <div className=' bg-slate-100 flex items-center justify-between'>
                    <Field
                      id='password'
                      name='password'
                      type={showPassword ? "text" : "password"}
                      placeholder='Password'
                      className='bg-transparent text-sm p-2 py-3 focus:outline-none'
                    />
                    {/* toggle password icons  */}
                    <Button
                      type='button'
                      variant='ghost'
                      size='icon'
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeIcon className='w-4 h-4' />
                      ) : (
                        <EyeOffIcon className='w-4 h-4' />
                      )}
                      <span className='sr-only'></span>
                    </Button>
                  </div>

                  <ErrorMessage
                    name='password'
                    component='p'
                    className='text-red-500  mt-2 text-sm'
                  />
                </div>
              </div>

              {/* Authorization/Forgot password field  */}

              <div className='flex justify-between mt- items-center'>
                <div className='flex items-center text-[#121212] gap-1'>
                  <input type='checkbox' />
                  <p className='md:text-sm text-[12px]'>Keep me logged In</p>
                </div>

                <div>
                  <a className='md:text-sm text-[12px]'>Forgot Password</a>
                </div>
              </div>

              {/* submit button  */}
              <div className=''>
                <Button
                  type='submit'
                  className='w-full rounded-3xl bg-[#D9D9D9] text-[#8C8282]'
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Signing In........ " : "Sign In"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>

        <p className='mt-14 text-center text-sm'>
          Don't have an account? <a className='text-[#70E3C7]'>Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default LogIn;
