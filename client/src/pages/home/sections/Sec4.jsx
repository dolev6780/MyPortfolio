import React, { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";
export default function Sec4() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const sendEmail = () => {
    if (name === "" || email === "" || message === "") {
      setErrorMessage("Enter details");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
      return;
    }
    emailjs
      .send(
        "service_y6uevlo",
        "template_bunl90m",
        {
          to_email: "dolev6780@gmail.com",
          name: name,
          email: email,
          message: message,
        },
        "oZR8eM-Vr3CfkYC8m"
      )
      .then((response) => {
        setSuccessMessage("Thank you I will reach as soon as possible");
        setTimeout(() => {
          setSuccessMessage("");
        }, 30000);
        console.log("Email sent successfully!", response);
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
  };

  return (
    <div
      id="contactme"
      className="h-full w-full mt-32 flex justify-center items-center"
    >
      <div className="border-2 lg:p-10 rounded-2xl shadow-3xl hover:shadow-inner hover:shadow-slate-200">
        <h1
          className="text-3xl text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-400 font-bold mt-10 cursor-pointer
      md:text-4xl lg:text-5xl xl:text-6xl"
        >
          Contact Me
        </h1>
        <div className="mt-10 xl:mt-14">
          <div>
            <input
              className="p-2 w-[300px] xl:w-[400px] xl:p-3 xl:text-lg pr-6 pl-6 m-4  border-2 border-blue-500 text-blue-500 placeholder:text-blue-500 rounded-md font-medium "
              type="text"
              placeholder="Full Name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div>
            <input
              className="p-2 w-[300px] xl:w-[400px] xl:p-3 xl:text-lg pr-6 pl-6 m-4 border-2 border-blue-500 text-blue-500 placeholder:text-blue-500 rounded-md font-medium"
              type="text"
              placeholder="Email Address"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div>
            <textarea
              className="p-2 w-[300px] xl:w-[400px] xl:p-3 xl:text-lg pr-6 pl-6 m-4 border-2 border-blue-500 text-blue-500 placeholder:text-blue-500 rounded-md font-medium"
              cols="22"
              rows="5"
              placeholder="Tell me what we can create together."
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
          </div>
          <label className="text-red-500">{errorMessage}</label>
          <div>
            <motion.button
              whileHover={{ scale: 1.2 }}
              className="p-2 xl:w-[150px] xl:p-3 xl:text-lg pr-8 pl-8 m-4 bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-lg "
              onClick={() => {
                sendEmail();
              }}
            >
              Send
            </motion.button>
          </div>
          <label className="text-sm md:text-xl text-blue-500 relative bottom-2">{successMessage}</label>
       
        </div>
      </div>
    </div>
  );
}
