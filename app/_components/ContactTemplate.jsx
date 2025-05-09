import React from "react";

const ContactTemplate = ({ name, email, message }) => {
  return (
    <div className="bg-white dark:bg-gray-800 flex flex-col gap-4">
      <h1 className="text-2xl font-bold">From: {email}</h1>
      <h2 className="text-xl font-bold">Name: {name}</h2>
      <p className="text-lg">Message: {message}</p>
    </div>
  );
};

export default ContactTemplate;
