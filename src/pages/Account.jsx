import React, { useState, useEffect } from "react";
import Menu from "../components/Menu";
import ThemeToggle from "../components/ThemeToggle";
import { RxAvatar } from "react-icons/rx";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { CgDanger } from "react-icons/cg";
import { BiTrash } from "react-icons/bi";

const Account = () => {
  const [userEmail, setUserEmail] = useState("Loading...");
  const [userName, setUserName] = useState("Loading...");
  const [lastLoginIn, setLastLogin] = useState("Loading ...");
  const [created, setCreated] = useState("Loading...");
  const auth = getAuth();

  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.email) setUserEmail(user.email);
        if (user.displayName) setUserName(user.displayName);

        setLastLogin(user.metadata.lastSignInTime);
        setCreated(user.metadata.creationTime);
      } else {
        navigate("/login");
      }
    });

    return () => unsub();
  }, [auth, navigate]);

  const handleDeleteAccount = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const confirmed = window.confirm(
      "You are about to permanently delete your account. Continue?"
    );
    if (!confirmed) return;

    try {
      await user.delete();
      console.log("User account deleted successfully");
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Error deleting user:", error);
      console.log("Error code:", error.code);

      if (error.code === "auth/requires-recent-login") {
        navigate("/login");
      } else {
        alert("Something went wrong while deleting your account.");
      }
    }
  };

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
                  to="/updatePassword"
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
                onClick={handleDeleteAccount}
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
