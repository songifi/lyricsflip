"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import {
  EyeIcon,
  EyeOffIcon,
  Headphones,
  HelpCircle,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Imagee from "../../public/img/LyricsFlipAuthLogo.png";
import { signUp } from "@/hooks/signUp";
import { SuccessAnimation } from "@/components/ui/SuccessAnimation";

const schema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password confirmation must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const handleFormSubmit = async (data) => {
    setIsLoading(true);
    try {
      const result = await signUp(data);
      if (result.success) {
        setSignupSuccess(true);
        setTimeout(() => setSignupSuccess(false), 3000);
      }
    } catch (error) {
      console.error("Signup failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-purple-50">
      <div className="hidden md:flex w-1/2 rounded-br-[3rem] rounded-tr-[3rem] bg-black flex-col justify-center items-center p-8">
        <Image
          src={Imagee}
          alt="LyricFlip logo"
          width={300}
          height={200}
          placeholder="blur"
          className="animate-customBounce"
        />
        <h1 className="text-4xl text-center font-bold text-white">
          Welcome To <span className="text-emerald-400">LyricFlip</span>
        </h1>
        <p className="text-gray-300 text-center max-w-sm animate-slowPulse">
          Unlock endless fun as you guess song titles, challenge your friends,
          and climb to the top.
        </p>
      </div>

      <div className="flex-1 px-10 pt-20 md:p-24 bg-white relative">
        <div className="absolute top-6 left-10 flex items-center gap-2">
          <Headphones className="w-5 h-5 text-emerald-400 animate-pulse" />
          <span className="text-sm text-gray-500">LyricFlip.</span>
        </div>
        <div className="absolute top-4 right-10">
          <Button variant="ghost" size="icon" aria-label="Help">
            <HelpCircle className="w-5 h-5" />
          </Button>
        </div>

        <h1 className="text-2xl font-bold text-center mb-6">
          Unlock the Fun of Guessing Lyrics
        </h1>
        <p className="text-center mb-6 text-base">
          Sign up to test your music knowledge and climb the leaderboard
        </p>

        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="space-y-5 text-gray-400"
        >
          {["username", "email", "password", "confirmPassword"].map(
            (field, index) => (
              <div key={index} className="space-y-2">
                <Label htmlFor={field}>
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </Label>
                <div className="relative">
                  <Input
                    id={field}
                    type={
                      field.includes("password")
                        ? (
                            field === "password"
                              ? showPassword
                              : showConfirmPassword
                          )
                          ? "text"
                          : "password"
                        : "text"
                    }
                    placeholder={`Enter your ${field}`}
                    {...register(field)}
                    aria-invalid={errors[field] ? "true" : "false"}
                    className={cn(errors[field] && "border-red-500")}
                  />
                  {field.includes("password") && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                      onClick={() =>
                        field === "password"
                          ? setShowPassword(!showPassword)
                          : setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {field === "password" ? (
                        showPassword
                      ) : showConfirmPassword ? (
                        <EyeIcon className="w-4 h-4" />
                      ) : (
                        <EyeOffIcon className="w-4 h-4" />
                      )}
                    </Button>
                  )}
                </div>
                {errors[field] && (
                  <p className="text-sm text-red-500">
                    {errors[field].message}
                  </p>
                )}
              </div>
            )
          )}

          <Button
            type="submit"
            className="w-full p-7 rounded-3xl bg-slate-300 hover:bg-slate-400"
            disabled={isSubmitting || isLoading}
          >
            {isSubmitting || isLoading ? (
              <Loader2 className="mr-2 h-10 w-10 text-purple-900 animate-spin" />
            ) : (
              "Sign Up"
            )}
          </Button>
        </form>

        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <a href="/signIn" className="text-teal-500">
            Login
          </a>
        </p>
      </div>
      {signupSuccess && <SuccessAnimation />}
    </div>
  );
};

export default Signup;
