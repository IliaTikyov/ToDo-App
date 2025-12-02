import React, { useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { auth, googleProvider } from "../../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);

  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  useEffect(() => {
    setFormError("");
  }, [email, password]);

  const validate = () => {
    const next = {};
    if (!emailRegex.test(email)) next.email = "Enter a valid email address.";
    if (!password) next.password = "Enter your password.";
    return next;
  };

  const canSubmit =
    email && password && Object.keys(errors).length === 0 && !loading;

  useEffect(() => {
    setErrors(validate());
  }, [email, password]);

  const mapFirebaseError = (code) => {
    switch (code) {
      case "auth/invalid-credential":
      case "auth/wrong-password":
      case "auth/user-not-found":
        return "Incorrect email or password.";
      case "auth/too-many-requests":
        return "Too many attempts. Please try again later.";
      case "auth/invalid-email":
        return "That email looks invalid.";
      case "auth/network-request-failed":
        return "Network error. Check your connection and try again.";
      default:
        return "Could not sign you in. Please try again.";
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const now = validate();
    setErrors(now);
    if (Object.keys(now).length) return;

    setLoading(true);
    setFormError("");
    try {
      await setPersistence(
        auth,
        remember ? browserLocalPersistence : browserSessionPersistence
      );
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      setFormError(mapFirebaseError(error?.code));
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setGoogleLoading(true);
    setFormError("");
    try {
      await setPersistence(
        auth,
        remember ? browserLocalPersistence : browserSessionPersistence
      );
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (err) {
      setFormError(mapFirebaseError(err?.code));
    } finally {
      setGoogleLoading(false);
    }
  };

  const onForgotPassword = async () => {
    setFormError("");
    setResetSent(false);
    if (!emailRegex.test(email)) {
      setErrors((e) => ({
        ...e,
        email: "Enter a valid email to reset your password.",
      }));
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setResetSent(true);
    } catch (err) {
      setFormError(mapFirebaseError(err?.code));
    }
  };

  const baseInput =
    "w-full rounded-md border bg-gray-50 dark:bg-zinc-900 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500";
  const normalBorder = "border-gray-300 dark:border-zinc-700";
  const errorBorder = "border-red-400 dark:border-red-400";

  return (
    <div className="min-h-screen grid place-items-center bg-[#ecedef] dark:bg-gray-800 dark:text-white">
      <div className="w-full max-w-md rounded-2xl bg-white dark:bg-zinc-900 shadow p-6">
        <div className="text-center space-y-1 mb-6">
          <h1 className="text-2xl font-semibold">Welcome back</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Log in to continue tracking your tasks
          </p>
        </div>

        {formError && (
          <div className="mb-4 rounded-md bg-red-50 dark:bg-red-900/20 border border-red-300 text-red-700 dark:text-red-300 px-3 py-2 text-sm">
            {formError}
          </div>
        )}

        <button
          type="button"
          onClick={signInWithGoogle}
          disabled={googleLoading}
          className={`w-full flex items-center justify-center gap-2 rounded-xl px-4 py-2 font-medium transition 
            ${
              googleLoading
                ? "bg-gray-200 dark:bg-zinc-800 cursor-wait"
                : "bg-white dark:bg-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-700"
            } 
            border border-gray-300 dark:border-zinc-700`}
        >
          <FcGoogle className="text-xl" />
          {googleLoading ? "Signing in…" : "Continue with Google"}
        </button>

        <div className="my-4 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200 dark:bg-zinc-800" />
          <span className="text-xs uppercase text-gray-500">or</span>
          <div className="h-px flex-1 bg-gray-200 dark:bg-zinc-800" />
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`${baseInput} ${
                errors.email ? errorBorder : normalBorder
              }`}
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm mb-1">
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                className="text-xs text-blue-600 hover:underline"
              >
                {showPw ? "Hide" : "Show"}
              </button>
            </div>
            <input
              id="password"
              type={showPw ? "text" : "password"}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`${baseInput} ${
                errors.password ? errorBorder : normalBorder
              }`}
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <label className="inline-flex items-center gap-2 text-sm select-none">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="accent-blue-600"
              />
              <span>Remember me</span>
            </label>

            <button
              type="button"
              onClick={onForgotPassword}
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot password?
            </button>
          </div>
          {resetSent && (
            <p className="text-xs text-green-600">
              Password reset email sent. Check your inbox.
            </p>
          )}

          <button
            type="submit"
            disabled={!canSubmit}
            className={`w-full rounded-xl px-4 py-2 font-semibold text-white transition 
              ${
                canSubmit
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-blue-400 cursor-not-allowed"
              }`}
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>

          <p className="text-sm text-center text-gray-600 dark:text-gray-300">
            Don’t have an account?
            <Link to="/register" className="ml-1 text-blue-600 hover:underline">
              Create one
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
