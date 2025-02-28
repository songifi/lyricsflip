"use client";

import { useState } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { submitContactForm } from "../actions/contact";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ArrowRight,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { z } from "zod";

// Reuse the same validation schema for client-side validation
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(3, { message: "Please select a subject" }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" }),
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions" }),
  }),
});

// Interactive Contact Info Component with hover & copy-to-clipboard
function ContactInfo() {
  const [emailCopied, setEmailCopied] = useState(false);
  const [phoneCopied, setPhoneCopied] = useState(false);
  const [locationCopied, setLocationCopied] = useState(false);

  const handleEmailCopy = () => {
    navigator.clipboard.writeText("hello@lyricsflip.xyz");
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const handlePhoneCopy = () => {
    navigator.clipboard.writeText("+1 (234) 567-890");
    setPhoneCopied(true);
    setTimeout(() => setPhoneCopied(false), 2000);
  };

  const handleLocationCopy = () => {
    navigator.clipboard.writeText(
      "123 Music Avenue, Suite 101, San Francisco, CA 94107"
    );
    setLocationCopied(true);
    setTimeout(() => setLocationCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Email Section */}
      <div className="flex items-start gap-4">
        <div
          onClick={handleEmailCopy}
          className="relative p-3 transition-all duration-300 rounded-full cursor-pointer bg-background-paper hover:scale-110 hover:bg-primary-light"
        >
          <Mail className="w-6 h-6 transition-colors duration-300 text-primary-main hover:text-white" />
          {emailCopied && (
            <span className="absolute text-xs text-green-500 -translate-x-1/2 -top-4 left-1/2">
              Copied!
            </span>
          )}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Email Us</h3>
          <p className="mt-1 text-text-secondary">
            Our friendly team is here to help.
          </p>
          <a
            href="mailto:hello@lyricsflip.xyz"
            className="inline-flex items-center gap-1 text-primary-main hover:text-primary-hover"
          >
            hello@lyricsflip.xyz
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Phone Section */}
      <div className="flex items-start gap-4">
        <div
          onClick={handlePhoneCopy}
          className="relative p-3 transition-all duration-300 rounded-full cursor-pointer bg-background-paper hover:scale-110 hover:bg-primary-light"
        >
          <Phone className="w-6 h-6 transition-colors duration-300 text-primary-main hover:text-white" />
          {phoneCopied && (
            <span className="absolute text-xs text-green-500 -translate-x-1/2 -top-4 left-1/2">
              Copied!
            </span>
          )}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Call Us</h3>
          <p className="mt-1 text-text-secondary">Mon-Fri from 8am to 5pm.</p>
          <a
            href="tel:+1234567890"
            className="inline-flex items-center gap-1 text-primary-main hover:text-primary-hover"
          >
            +1 (234) 567-890
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Location Section */}
      <div className="flex items-start gap-4">
        <div
          onClick={handleLocationCopy}
          className="relative p-3 transition-all duration-300 rounded-full cursor-pointer bg-background-paper hover:scale-110 hover:bg-primary-light"
        >
          <MapPin className="w-6 h-6 transition-colors duration-300 text-primary-main hover:text-white" />
          {locationCopied && (
            <span className="absolute text-xs text-green-500 -translate-x-1/2 -top-4 left-1/2">
              Copied!
            </span>
          )}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Visit Us</h3>
          <p className="mt-1 text-text-secondary">
            Come say hello at our office HQ.
          </p>
          <p className="mt-1 text-primary-main">
            123 Music Avenue, Suite 101
            <br />
            San Francisco, CA 94107
          </p>
        </div>
      </div>

      {/* Social Media (Optional) */}
      <div>
        <h3 className="mb-4 text-lg font-semibold text-text-primary">
          Follow Us
        </h3>
        <div className="flex space-x-4">
          <a
            href="#"
            className="p-3 transition-all duration-300 rounded-full bg-background-paper hover:bg-primary-light"
            aria-label="Facebook"
          >
            <Facebook className="w-5 h-5 text-primary-main" />
          </a>
          <a
            href="#"
            className="p-3 transition-all duration-300 rounded-full bg-background-paper hover:bg-primary-light"
            aria-label="Twitter"
          >
            <Twitter className="w-5 h-5 text-primary-main" />
          </a>
          <a
            href="#"
            className="p-3 transition-all duration-300 rounded-full bg-background-paper hover:bg-primary-light"
            aria-label="Instagram"
          >
            <Instagram className="w-5 h-5 text-primary-main" />
          </a>
          <a
            href="#"
            className="p-3 transition-all duration-300 rounded-full bg-background-paper hover:bg-primary-light"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5 text-primary-main" />
          </a>
        </div>
      </div>
    </div>
  );
}

// Main Contact Page Component
export default function ContactPage() {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    acceptTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);
  const [formShake, setFormShake] = useState(false);

  // Animation refs via our custom hook
  const { ref: headerRef, isIntersecting: headerInView } =
    useIntersectionObserver();
  const { ref: formRef, isIntersecting: formInView } =
    useIntersectionObserver();
  const { ref: infoRef, isIntersecting: infoInView } =
    useIntersectionObserver();
  const { ref: mapRef, isIntersecting: mapInView } = useIntersectionObserver();

  // Validate a single field
  const validateField = (name, value) => {
    try {
      const fieldSchema = z.object({ [name]: contactFormSchema.shape[name] });
      fieldSchema.parse({ [name]: value });
      setErrors((prev) => ({ ...prev, [name]: undefined }));
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldError = error.errors.find((e) => e.path[0] === name);
        if (fieldError) {
          setErrors((prev) => ({ ...prev, [name]: fieldError.message }));
        }
      }
      return false;
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    const newValue = type === "checkbox" ? e.target.checked : value;
    setFormValues((prev) => ({ ...prev, [name]: newValue }));
    validateField(name, newValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;
    for (const key in formValues) {
      if (!validateField(key, formValues[key])) {
        isValid = false;
      }
    }
    if (!isValid) {
      setFormShake(true);
      setTimeout(() => setFormShake(false), 500);
      return;
    }
    setIsSubmitting(true);
    setSubmitResult(null);
    try {
      const result = await submitContactForm(formValues);
      setSubmitResult(result);
      if (result.success) {
        setFormValues({
          name: "",
          email: "",
          subject: "",
          message: "",
          acceptTerms: false,
        });
      }
    } catch (error) {
      setSubmitResult({
        success: false,
        message:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div
        ref={headerRef}
        className={`relative overflow-hidden py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-r from-gradient-from to-primary-main text-white ${
          headerInView ? "animate-fade-in" : "opacity-0"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gradient-from to-primary-main animate-gradient-x"></div>
        <div className="relative mx-auto text-center max-w-7xl">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
            Get in Touch
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl opacity-90">
            We&apos;d love to hear from you! Whether you have a question about
            our services, need help with lyrics, or just want to say hello,
            we&apos;re here to help.
          </p>
        </div>
      </div>

      <div className="px-4 py-16 mx-auto max-w-7xl md:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Contact Form */}
          <div
            ref={formRef}
            className={`bg-background-paper rounded-lg p-6 md:p-8 shadow-lg transform ${
              formInView ? "animate-slide-up" : "opacity-0 translate-y-10"
            } ${formShake ? "animate-shake" : ""}`}
          >
            <h2 className="mb-6 text-2xl font-bold md:text-3xl text-primary-main">
              Send Us a Message
            </h2>
            {submitResult && (
              <div
                className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${
                  submitResult.success
                    ? "bg-green-50 text-green-800 border border-green-200"
                    : "bg-red-50 text-red-800 border border-red-200"
                }`}
              >
                {submitResult.success ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-500" />
                )}
                <p>{submitResult.message}</p>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block mb-1 text-sm font-medium text-text-primary"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formValues.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-md border ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-transparent transition-all duration-200 bg-white text-text-primary`}
                  placeholder="John Doe"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block mb-1 text-sm font-medium text-text-primary"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formValues.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-md border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-transparent transition-all duration-200 bg-white text-text-primary`}
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block mb-1 text-sm font-medium text-text-primary"
                >
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formValues.subject}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-md border ${
                    errors.subject ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-transparent transition-all duration-200 bg-white text-text-primary`}
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="feedback">Feedback</option>
                  <option value="lyrics">Lyrics Request</option>
                  <option value="business">Business Opportunity</option>
                </select>
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block mb-1 text-sm font-medium text-text-primary"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formValues.message}
                  onChange={handleInputChange}
                  rows={5}
                  className={`w-full px-4 py-3 rounded-md border ${
                    errors.message ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-transparent transition-all duration-200 bg-white text-text-primary`}
                  placeholder="How can we help you?"
                ></textarea>
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                )}
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="acceptTerms"
                    name="acceptTerms"
                    type="checkbox"
                    checked={formValues.acceptTerms}
                    onChange={handleInputChange}
                    className="w-4 h-4 border-gray-300 rounded text-primary-main focus:ring-primary-light"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="acceptTerms" className="text-text-secondary">
                    I agree to the{" "}
                    <a
                      href="#"
                      className="underline text-primary-main hover:text-primary-hover"
                    >
                      Privacy Policy
                    </a>{" "}
                    and{" "}
                    <a
                      href="#"
                      className="underline text-primary-main hover:text-primary-hover"
                    >
                      Terms of Service
                    </a>
                  </label>
                  {errors.acceptTerms && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.acceptTerms}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary-main hover:bg-primary-hover text-white font-medium py-3 px-6 rounded-md transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                ) : (
                  <>
                    Send Message
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Information and Map */}
          <div className="space-y-10">
            <div
              ref={infoRef}
              className={`space-y-8 ${
                infoInView ? "animate-slide-up" : "opacity-0 translate-y-10"
              }`}
            >
              <h2 className="text-2xl font-bold md:text-3xl text-primary-main">
                Contact Information
              </h2>
              <ContactInfo />
            </div>

            <div
              ref={mapRef}
              className={`rounded-lg overflow-hidden shadow-lg border border-gray-200 h-[300px] ${
                mapInView ? "animate-fade-in" : "opacity-0"
              }`}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100939.98555098464!2d-122.50764017948533!3d37.75781499657613!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1656543745932!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="LyricsFlip Office Location"
              ></iframe>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20 text-center">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl text-primary-main">
            Frequently Asked Questions
          </h2>
          <p className="max-w-2xl mx-auto mb-6 text-text-secondary">
            Can't find the answer you're looking for? Check out our
            comprehensive FAQ section.
          </p>
          <a
            href="/faq"
            className="inline-flex items-center gap-2 px-6 py-3 font-medium transition-all duration-300 rounded-md bg-background-paper hover:bg-primary-light text-primary-main"
          >
            View FAQ
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
