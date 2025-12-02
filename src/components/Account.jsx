import React, { useState, useEffect } from "react";
import Menu from "./Menu";
import ThemeToggle from "./ThemeToggle";
import { RxAvatar } from "react-icons/rx";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";
import { GiSecurityGate } from "react-icons/gi";
import { CgDanger } from "react-icons/cg";
import { BiTrash } from "react-icons/bi";

const Account = () => {
  const [userEmail, setUserEmail] = useState("Loading...");
  const [userName, setUserName] = useState("Loading...");
  const [lastLoginIn, setLastLogin] = useState("Loading ...");
  const [created, setCreated] = useState("Loading...");
  const auth = getAuth();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user && user.email && user.displayName) {
        setUserEmail(user.email);
        setUserName(user.displayName);
      }
      if (user) {
        const lastSignIn = user.metadata.lastSignInTime;
        const accountCreated = user.metadata.creationTime;
        setLastLogin(lastSignIn);
        setCreated(accountCreated);
      }
    });
    return () => unsub;
  }, [auth]);

  return (
    <div className="relative min-h-screen w-full bg-gray-50 dark:bg-gray-900">
      <div className="absolute top-3 left-2">
        <Menu />
      </div>
      <div className="absolute top-3 right-3">
        <ThemeToggle />
      </div>

      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-8 py-6 rounded-2xl shadow-lg w-11/12 max-w-md sm:max-w-xl">
          <h1 className="text-2xl font-bold flex items-center gap-2 mb-4 justify-center text-gray-800 dark:text-gray-100">
            Account Info
            <RxAvatar className="self-start" style={{ fontSize: "1.75em" }} />
          </h1>

          <hr className="border-gray-300 dark:border-gray-600" />

          <div className="mt-4 space-y-2">
            <label className="font-semibold text-gray-700 dark:text-gray-200 flex gap-2">
              User Name:{" "}
              <p className="font-light text-gray-500 dark:text-gray-400">
                {userName}
              </p>
            </label>

            <label className="font-semibold text-gray-700 dark:text-gray-200 flex gap-2">
              User Email:{" "}
              <p className="font-light text-gray-500 dark:text-gray-400">
                {userEmail}
              </p>
            </label>

            <label className="font-semibold text-gray-700 dark:text-gray-200 flex gap-2">
              Last Signed In:{" "}
              <p className="font-light text-gray-500 dark:text-gray-400">
                {lastLoginIn}
              </p>
            </label>

            <label className="font-semibold text-gray-700 dark:text-gray-200 flex gap-2">
              Created:{" "}
              <p className="font-light text-gray-500 dark:text-gray-400">
                {created}
              </p>
            </label>

            <div className="mt-4">
              <h3 className="text-xl font-bold mb-2 flex items-center gap-1 text-gray-800 dark:text-gray-100">
                Security
                <CgDanger style={{ fontSize: "1.25em" }} />
              </h3>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Due to security reasons we can not display your password, but
                you can update it from here:{" "}
                <Link
                  to="/changePassword"
                  className="underline text-indigo-600 dark:text-indigo-400"
                >
                  Update Password
                </Link>
              </p>
            </div>

            <hr className="border-gray-300 dark:border-gray-600 mb-2" />

            <div className="flex justify-center">
              <button
                type="submit"
                className="mt-4 flex gap-2 items-center cursor-pointer text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-semibold"
              >
                Delete Account <BiTrash style={{ fontSize: "1.2em" }} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
