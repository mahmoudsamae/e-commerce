"use client";
import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import React, { useRef } from "react";
import { toast, ToastContainer } from "react-toastify";

// contact us info
const data = [
  {
    id: 1,
    title: "Our Address",
    text: "123 Fashion Street, Style City, ST 12345",
    icon: <MapPinIcon className="dark:text-gray-300" />,
  },
  {
    id: 2,
    title: "Email",
    text: "contact@vogue.com",
    icon: <MailIcon className="dark:text-gray-300" />,
  },
  {
    id: 3,
    title: "Phone",
    text: "+1 (555) 123-4567",
    icon: <PhoneIcon className="dark:text-gray-300" />,
  },
];
const ContactPage = () => {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      message: messageRef.current.value,
    };

    // Validate form data
    if (!data.name || !data.email || !data.message) {
      toast.error("Please fill in all fields");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      const response = await fetch("/api/contact-massage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message");
      }

      // Clear form fields after successful submission
      nameRef.current.value = "";
      emailRef.current.value = "";
      messageRef.current.value = "";

      toast.success("Message sent successfully");
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error(error.message || "Failed to send message");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 mb-5 sm:mb-0">
      <ToastContainer />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-15">
        {/* contact us title and description */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-300">
            Contact Us
          </h1>
          <p className="mt-2 text-lg text-gray-500 dark:text-gray-400">
            We'd love to hear from you!
          </p>
        </div>

        {/* contact us form and map */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            {/* contact us form */}
            <form className="space-y-8 bg-gray-50 p-6 rounded-lg shadow-md dark:bg-gray-900">
              {/* name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  ref={nameRef}
                  placeholder="Your full name"
                  className="w-full px-4 py-2 rounded-md border dark:text-gray-300 border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition duration-300 placeholder:text-gray-500 dark:placeholder:text-gray-400"
                />
              </div>

              {/* email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  ref={emailRef}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-2 rounded-md border dark:text-gray-300 border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition duration-300 placeholder:text-gray-500 dark:placeholder:text-gray-400"
                />
              </div>

              {/* message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 "
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={6}
                  ref={messageRef}
                  placeholder="How can we help you?"
                  className="w-full px-4 py-2 rounded-md border dark:text-gray-300 border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition duration-300 resize-none placeholder:text-gray-500 dark:placeholder:text-gray-400"
                />
              </div>

              {/* send message button */}
              <button
                onClick={(e) => handleSubmit(e)}
                type="submit"
                className="w-full bg-primary text-white py-3 px-6 rounded-md hover:bg-hover transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
              >
                Send Message
              </button>
            </form>

            {/* contact us info */}
            <div className="mt-8 bg-gray-100 rounded-lg shadow-md p-4 space-y-6 dark:bg-gray-900">
              {data?.map((item) => (
                <div
                  key={item?.id}
                  className="flex items-center space-x-4 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition duration-300"
                >
                  <div className="bg-primary/10 p-3 rounded-full dark:bg-primary">
                    {item?.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-300">
                      {item?.title}
                    </h3>
                    <p className="mt-1 text-gray-600 dark:text-gray-400">
                      {item?.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* contact us map */}
          <div className="h-[600px] w-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10018861.651307758!2d5.398080472052395!3d51.08950822738207!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479a721ec2b1be6b%3A0x75e85d6b8e91e55b!2sGermany!5e0!3m2!1sen!2sus!4v1686251960080!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
