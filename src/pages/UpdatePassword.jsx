import React, { useState, useRef, useEffect } from "react";
import {
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";

const UpdatePassword = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const currentEmail = useRef(null);
  const auth = getAuth();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user && currentEmail.current) {
        currentEmail.current.value = user.email;
      }
    });

    return () => unsub();
  }, [auth]);

  const resetPassword = async () => {
    const email = currentEmail.current?.value?.trim();

    if (!email) {
      setIsOpen(true);
      setSuccess(false);
      setMessage("Please enter a valid email address.");
      return;
    }

    setIsOpen(false);
    setMessage("");

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess(true);
      setMessage(
        "Email was sent successfully! Please check your inbox (and spam folder)."
      );
      setIsOpen(true);
    } catch (err) {
      console.error("Error while trying to reset your password:", err);
      setSuccess(false);
      setMessage(
        "Email was not sent! Are you sure this email is registered with us?"
      );
      setIsOpen(true);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-gray-50 dark:bg-gray-900 flex justify-center items-center px-4">
      <div
        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
                      px-8 py-6 rounded-2xl shadow-lg w-full max-w-md flex-row"
      >
        {/* Heading */}
        <h1 className="text-2xl font-extrabold mb-4 text-center text-gray-800 dark:text-gray-100">
          Change Password
        </h1>

        <hr className="border-gray-300 dark:border-gray-600" />

        {/* Form */}
        <div className="space-y-5 mt-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              ref={currentEmail}
              type="email"
              className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-600 
                         bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 
                         px-3 py-2 shadow-sm focus:outline-none 
                         focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <button
            className="w-full mt-3 py-2 rounded-full bg-indigo-600 text-white font-semibold 
                       hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400 
                       transition-colors shadow"
            onClick={resetPassword}
          >
            Reset Password
          </button>
        </div>

        {isOpen && (
          <div
            className={`mt-5 text-center font-medium ${
              success ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdatePassword;
