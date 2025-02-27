"use server";

import { z } from "zod";

// Form validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(3, { message: "Please select a subject" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions" }),
  }),
});

// (Optional) Simple in-memory rate limiting
const RATE_LIMIT_WINDOW = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 3;
const ipRequestMap = new Map();

export async function submitContactForm(formData) {
  // Validate form data
  try {
    contactFormSchema.parse(formData);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: "Validation failed",
        errors: error.errors.reduce((acc, curr) => {
          const field = curr.path[0];
          acc[field] = curr.message;
          return acc;
        }, {}),
      };
    }
    throw error;
  }

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Simulate database storage and sending email notification
  console.log("Storing contact form submission:", formData);
  console.log("Sending email notification to admin");

  // Simulate a 90% success rate for demo purposes
  const isSuccess = Math.random() > 0.1;
  if (!isSuccess) {
    return {
      success: false,
      message: "Failed to submit form. Please try again later.",
    };
  }

  return {
    success: true,
    message: "Thank you for your message! We'll get back to you soon.",
  };
}
