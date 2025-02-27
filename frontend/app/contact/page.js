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
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
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
    navigator.clipboard.writeText("123 Music Avenue, Suite 101, San Francisco, CA 94107");
    setLocationCopied(true);
    setTimeout(() => setLocationCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Email Section */}
      <div className="flex items-start gap-4">
        <div
          onClick={handleEmailCopy}
          className="cursor-pointer relative bg-[#F5F5F5] p-3 rounded-full transition-all duration-300 hover:scale-110 hover:bg-[#70E3C7]"
        >
          <Mail className="h-6 w-6 text-[#490878] transition-colors duration-300 hover:text-white" />
          {emailCopied && (
            <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-xs text-green-500">
              Copied!
            </span>
          )}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-[#090909]">Email Us</h3>
          <p className="text-[#666666] mt-1">Our friendly team is here to help.</p>
          <a
            href="mailto:hello@lyricsflip.xyz"
            className="text-[#490878] hover:text-[#3CC8B9] inline-flex items-center gap-1"
          >
            hello@lyricsflip.xyz
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* Phone Section */}
      <div className="flex items-start gap-4">
        <div
          onClick={handlePhoneCopy}
          className="cursor-pointer relative bg-[#F5F5F5] p-3 rounded-full transition-all duration-300 hover:scale-110 hover:bg-[#70E3C7]"
        >
          <Phone className="h-6 w-6 text-[#490878] transition-colors duration-300 hover:text-white" />
          {phoneCopied && (
            <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-xs text-green-500">
              Copied!
            </span>
          )}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-[#090909]">Call Us</h3>
          <p className="text-[#666666] mt-1">Mon-Fri from 8am to 5pm.</p>
          <a
            href="tel:+1234567890"
            className="text-[#490878] hover:text-[#3CC8B9] inline-flex items-center gap-1"
          >
            +1 (234) 567-890
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* Location Section */}
      <div className="flex items-start gap-4">
        <div
          onClick={handleLocationCopy}
          className="cursor-pointer relative bg-[#F5F5F5] p-3 rounded-full transition-all duration-300 hover:scale-110 hover:bg-[#70E3C7]"
        >
          <MapPin className="h-6 w-6 text-[#490878] transition-colors duration-300 hover:text-white" />
          {locationCopied && (
            <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-xs text-green-500">
              Copied!
            </span>
          )}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-[#090909]">Visit Us</h3>
          <p className="text-[#666666] mt-1">Come say hello at our office HQ.</p>
          <p className="text-[#490878] mt-1">
            123 Music Avenue, Suite 101<br />
            San Francisco, CA 94107
          </p>
        </div>
      </div>

      {/* Social Media (Optional) */}
      <div>
        <h3 className="text-lg font-semibold text-[#090909] mb-4">Follow Us</h3>
        <div className="flex space-x-4">
          <a href="#" className="bg-[#F5F5F5] p-3 rounded-full hover:bg-[#70E3C7] transition-all duration-300" aria-label="Facebook">
            <Facebook className="h-5 w-5 text-[#490878]" />
          </a>
          <a href="#" className="bg-[#F5F5F5] p-3 rounded-full hover:bg-[#70E3C7] transition-all duration-300" aria-label="Twitter">
            <Twitter className="h-5 w-5 text-[#490878]" />
          </a>
          <a href="#" className="bg-[#F5F5F5] p-3 rounded-full hover:bg-[#70E3C7] transition-all duration-300" aria-label="Instagram">
            <Instagram className="h-5 w-5 text-[#490878]" />
          </a>
          <a href="#" className="bg-[#F5F5F5] p-3 rounded-full hover:bg-[#70E3C7] transition-all duration-300" aria-label="LinkedIn">
            <Linkedin className="h-5 w-5 text-[#490878]" />
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
  const { ref: headerRef, isIntersecting: headerInView } = useIntersectionObserver();
  const { ref: formRef, isIntersecting: formInView } = useIntersectionObserver();
  const { ref: infoRef, isIntersecting: infoInView } = useIntersectionObserver();
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
        message: error instanceof Error ? error.message : "An unknown error occurred",
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
        className={`relative overflow-hidden py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-r from-[#6CCBBE] to-[#490878] text-white ${
          headerInView ? "animate-fade-in" : "opacity-0"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#6CCBBE] to-[#490878] animate-gradient-x"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Get in Touch</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
            We'd love to hear from you! Whether you have a question about our services, need help with lyrics, or just want to say hello, we're here to help.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Form */}
          <div
            ref={formRef}
            className={`bg-[#F5F5F5] rounded-lg p-6 md:p-8 shadow-lg transform ${
              formInView ? "animate-slide-up" : "opacity-0 translate-y-10"
            } ${formShake ? "animate-shake" : ""}`}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-[#490878] mb-6">Send Us a Message</h2>
            {submitResult && (
              <div
                className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${
                  submitResult.success
                    ? "bg-green-50 text-green-800 border border-green-200"
                    : "bg-red-50 text-red-800 border border-red-200"
                }`}
              >
                {submitResult.success ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-500" />
                )}
                <p>{submitResult.message}</p>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#090909] mb-1">
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
                  } focus:outline-none focus:ring-2 focus:ring-[#70E3C7] focus:border-transparent transition-all duration-200 bg-white text-[#090909]`}
                  placeholder="John Doe"
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#090909] mb-1">
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
                  } focus:outline-none focus:ring-2 focus:ring-[#70E3C7] focus:border-transparent transition-all duration-200 bg-white text-[#090909]`}
                  placeholder="your@email.com"
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-[#090909] mb-1">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formValues.subject}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-md border ${
                    errors.subject ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-[#70E3C7] focus:border-transparent transition-all duration-200 bg-white text-[#090909]`}
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="feedback">Feedback</option>
                  <option value="lyrics">Lyrics Request</option>
                  <option value="business">Business Opportunity</option>
                </select>
                {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[#090909] mb-1">
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
                  } focus:outline-none focus:ring-2 focus:ring-[#70E3C7] focus:border-transparent transition-all duration-200 bg-white text-[#090909]`}
                  placeholder="How can we help you?"
                ></textarea>
                {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="acceptTerms"
                    name="acceptTerms"
                    type="checkbox"
                    checked={formValues.acceptTerms}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-[#490878] focus:ring-[#70E3C7] border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="acceptTerms" className="text-[#666666]">
                    I agree to the{" "}
                    <a href="#" className="text-[#490878] hover:text-[#3CC8B9] underline">
                      Privacy Policy
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-[#490878] hover:text-[#3CC8B9] underline">
                      Terms of Service
                    </a>
                  </label>
                  {errors.acceptTerms && <p className="mt-1 text-sm text-red-600">{errors.acceptTerms}</p>}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#490878] hover:bg-[#3CC8B9] text-white font-medium py-3 px-6 rounded-md transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    Send Message
                    <Send className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Information and Map */}
          <div className="space-y-10">
            <div ref={infoRef} className={`space-y-8 ${infoInView ? "animate-slide-up" : "opacity-0 translate-y-10"}`}>
              <h2 className="text-2xl md:text-3xl font-bold text-[#490878]">Contact Information</h2>
              <ContactInfo />
            </div>

            <div
              ref={mapRef}
              className={`rounded-lg overflow-hidden shadow-lg border border-gray-200 h-[300px] ${mapInView ? "animate-fade-in" : "opacity-0"}`}
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
          <h2 className="text-2xl md:text-3xl font-bold text-[#490878] mb-4">Frequently Asked Questions</h2>
          <p className="text-[#666666] max-w-2xl mx-auto mb-6">
            Can't find the answer you're looking for? Check out our comprehensive FAQ section.
          </p>
          <a
            href="/faq"
            className="inline-flex items-center gap-2 bg-[#F5F5F5] hover:bg-[#70E3C7] text-[#490878] font-medium py-3 px-6 rounded-md transition-all duration-300"
          >
            View FAQ
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
