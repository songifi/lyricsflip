"use client"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { EyeIcon, EyeOffIcon, Headphones, HelpCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import Imagee from "../../public/img/LyricsFlipAuthLogo.png"
import { signUp } from "@/hooks/signUp"
import { Loader2 } from "lucide-react"
import { SuccessAnimation } from "@/components/ui/SuccessAnimation"

// Define the validation schema using Zod
const schema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Password confirmation must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  })

// Define the Signup component
const Signup = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [signupSuccess, setSignupSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  })

  const handleFormSubmit = async (data) => {
    setIsLoading(true)
    try {
      const result = await signUp(data)
      if (result.success) {
        setSignupSuccess(true)
        // Reset form or redirect user after a delay
        setTimeout(() => {
          setSignupSuccess(false)
          // Add your redirect logic here
        }, 3000)
      }
    } catch (error) {
      console.error("Signup failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-purple-50 flex flex-col md:flex-row bg-#F6EDFC">
      {/* Left Section: Visuals and welcome text */}
      <div className="relative hidden md:flex w-1/2 rounded-br-[3rem] rounded-tr-[3rem] bg-gradient-to-br from-black via-black to-black flex-col justify-center items-center p-8 ">
        {/* Gradient background decorations */}
        <span className="spanA absolute z-30 top-0 -left-3 bg-blend-screen rounded-full bg-gradient-to-br from-purple-950 via-purple-950 to-black p-28 mb-2 filter blur-xl"></span>

        {/* Logo and animated content */}
        <div className="relative z-50 animate-customBounce flex flex-col items-center text-center space-y-8">
          <Image src={Imagee} alt="Profile Picture" width={300} height={200} placeholder="blur" />
        </div>

        {/* Welcome message */}
        <div className="space-y-4 inset-5 z-50">
          <h1 className="text-4xl justify-center text-center font-bold text-white">
            Welcome To <br />
            <span className="text-emerald-400 ">LyricFlip</span>
          </h1>
          <p
            className="text-gray-300 font-geist justify-center max-w-sm animate-slowPulse"
            style={{ animationDuration: "3s" }}
          >
            Unlock endless fun as you guess song titles, <br /> challenge your friends, and climb to the top
          </p>
        </div>

        {/* Gradient background decorations */}
        <div className="spanB z-40 absolute bottom-0 right-0 bg-blend-color-dodge rounded-full bg-gradient-to-br from-black via-teal-800 to-white p-28 filter blur-xl"></div>
      </div>

      {/* Right Section: Sign-up form */}
      <div className="relative bg-gradient-to-br from-purple-50 via-purple-50 to-white z-10 px-10 pt-20 flex-1 flex-col justify-center md:p-24 bg-#e9d0fa">
        {/* Header with logo */}
        <div className="absolute top-6 left-10 flex items-center gap-2">
          <Headphones className="w-5 h-5 text-emerald-400 animate-pulse" />
          <span className="text-sm text-gray-500">LyricFlip.</span>
        </div>

        {/* Help button */}
        <div className="absolute top-4 right-10">
          <Button variant="ghost" size="icon">
            <HelpCircle className="w-5 h-5" />
            <span className="text-sm text-black">Help</span>
          </Button>
        </div>

        {/* Title and description */}
        <h1 className="text-xl md:text-2xl font-bold text-center mb-4 md:mb-6">Unlock the Fun of Guessing Lyrics</h1>
        <p className="text-center mb-4 md:mb-6 text-sm md:text-base">
          Sign up to guess song titles, test your music knowledge, and climb the leaderboard
        </p>

        {/* Sign-up form */}
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5 text-gray-400">
          {/* Username field */}
          <div className="space-y-2" style={{ outline: "none" }}>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="Enter your username"
              {...register("username")}
              aria-invalid={errors.username ? "true" : "false"}
              className={cn(errors.username && "border-red-500")}
              
            />
            {errors.username && (
              <p className="text-sm text-red-500" role="alert">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Email field */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              aria-invalid={errors.email ? "true" : "false"}
              className={cn(errors.email && "border-red-500")}
            />
            {errors.email && (
              <p className="text-sm text-red-500" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password field */}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password")}
                aria-invalid={errors.password ? "true" : "false"}
                className={cn(errors.password && "border-red-500")}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeIcon className="w-4 h-4" /> : <EyeOffIcon className="w-4 h-4" />}
              </Button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-500" role="alert">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm password field */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                {...register("confirmPassword")}
                aria-invalid={errors.confirmPassword ? "true" : "false"}
                className={cn(errors.confirmPassword && "border-red-500")}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
              >
                {showConfirmPassword ? <EyeIcon className="w-4 h-4" /> : <EyeOffIcon className="w-4 h-4" />}
              </Button>
            </div>
            {errors.confirmPassword && (
              <p className="text-sm text-red-500" role="alert">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit button */}
          <Button
            type="submit"
            className="w-full p-7 rounded-3xl bg-slate-300 hover:bg-slate-400"
            disabled={isSubmitting || isLoading}
          >
            {isSubmitting || isLoading ? <Loader2 className="mr-2 h-10 w-10 text-purple-900 animate-spin" /> : "Sign Up"}
          </Button>
        </form>

        {/* Login link */}
        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <a href="/signIn" className="text-teal-500">
            Login
          </a>
        </p>
      </div>
      {signupSuccess && <SuccessAnimation />}
    </div>
  )
}

export default Signup

