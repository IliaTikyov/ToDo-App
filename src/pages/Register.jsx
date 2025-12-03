import React, { useEffect, useMemo, useState } from "react";
import { auth } from "../../config/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const [showPw, setShowPw] = useState(false);
  const [showPw2, setShowPw2] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");

  const pwStrength = useMemo(() => {
    let s = 0;
    if (password.length >= 8) s++;
    if (/[A-Z]/.test(password)) s++;
    if (/[a-z]/.test(password)) s++;
    if (/\d/.test(password)) s++;
    if (/[^A-Za-z0-9]/.test(password)) s++;
    return s;
  }, [password]);

  const validate = () => {
    const next = {};
    if (!name.trim()) next.name = "Please enter your name.";
    if (!emailRegex.test(email)) next.email = "Please enter a valid email.";
    if (password.length < 8) next.password = "Use at least 8 characters.";
    if (!/[A-Z]/.test(password))
      next.password =
        (next.password ? next.password + " " : "") + "Add an uppercase letter.";
    if (!/\d/.test(password))
      next.password =
        (next.password ? next.password + " " : "") + "Add a number.";
    if (confirm !== password) next.confirm = "Passwords do not match.";
    if (!acceptedTerms) next.terms = "You must accept the Terms to continue.";
    return next;
  };

  useEffect(() => {
    setErrors(validate());
    setFormError("");
  }, [name, email, password, confirm, acceptedTerms]);

  const canSubmit =
    name &&
    email &&
    password &&
    confirm &&
    acceptedTerms &&
    Object.keys(errors).length === 0 &&
    !loading;

  const mapFirebaseError = (code) => {
    switch (code) {
      case "auth/email-already-in-use":
        return "That email is already registered. Try logging in instead.";
      case "auth/invalid-email":
        return "That email address looks invalid.";
      case "auth/weak-password":
        return "Your password is too weak. Try adding more characters.";
      case "auth/network-request-failed":
        return "Network error. Please check your connection and try again.";
      default:
        return "Something went wrong creating your account. Please try again.";
    }
  };

  const handleUserRegister = async (e) => {
    e.preventDefault();
    const now = validate();
    setErrors(now);
    setFormError("");

    if (Object.keys(now).length) return;

    try {
      setLoading(true);
      const cred = await createUserWithEmailAndPassword(auth, email, password);

      if (cred.user) {
        await updateProfile(cred.user, {
          displayName: name.trim(),
        });
      }

      navigate("/");
    } catch (err) {
      setFormError(mapFirebaseError(err?.code));
    } finally {
      setLoading(false);
    }
  };

  const baseInput =
    "w-full rounded-md border bg-gray-50 dark:bg-gray-700 px-3 py-2 " +
    "outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 " +
    "text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500";
  const errorBorder = "border-red-400 dark:border-red-400";
  const normalBorder = "border-gray-300 dark:border-gray-600";

  return (
    <div className="min-h-screen grid place-items-center bg-gray-50 dark:bg-gray-900 dark:text-white px-4">
      <div className="w-full max-w-md rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg p-6 sm:p-8">
        {/* Header */}
        <div className="flex flex-col justify-center items-center space-y-1 mb-6">
          <h1 className="text-2xl font-extrabold text-gray-800 dark:text-gray-100">
            Create Your Account
          </h1>
          <h2 className="text-sm text-gray-600 dark:text-gray-300">
            Start tracking your tasks daily
          </h2>
        </div>

        {/* Error banner */}
        {formError && (
          <div className="mb-4 rounded-md bg-red-50 dark:bg-red-900/20 border border-red-300 text-red-700 dark:text-red-300 px-3 py-2 text-sm">
            {formError}
          </div>
        )}

        <form onSubmit={handleUserRegister} className="space-y-4">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm mb-1 text-gray-700 dark:text-gray-200"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`${baseInput} ${
                errors.name ? errorBorder : normalBorder
              }`}
              placeholder="Your name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm mb-1 text-gray-700 dark:text-gray-200"
            >
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

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm mb-1 text-gray-700 dark:text-gray-200"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPw ? "text" : "password"}
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`${baseInput} pr-12 ${
                  errors.password ? errorBorder : normalBorder
                }`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
                aria-label={showPw ? "Hide password" : "Show password"}
              >
                {showPw ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
            )}

            {/* Password strength bar */}
            <div className="mt-2 h-1 w-full bg-gray-200 dark:bg-gray-700 rounded">
              <div
                className="h-1 rounded transition-all"
                style={{
                  width: `${(pwStrength / 5) * 100}%`,
                  background:
                    pwStrength < 2
                      ? "#ef4444" // red-500
                      : pwStrength < 4
                      ? "#f59e0b" // amber-500
                      : "#10b981", // emerald-500
                }}
              />
            </div>
          </div>

          {/* Confirm password */}
          <div>
            <label
              htmlFor="confirm"
              className="block text-sm mb-1 text-gray-700 dark:text-gray-200"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirm"
                type={showPw2 ? "text" : "password"}
                autoComplete="new-password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className={`${baseInput} pr-12 ${
                  errors.confirm ? errorBorder : normalBorder
                }`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPw2((v) => !v)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
                aria-label={
                  showPw2 ? "Hide confirm password" : "Show confirm password"
                }
              >
                {showPw2 ? "Hide" : "Show"}
              </button>
            </div>
            {errors.confirm && (
              <p className="mt-1 text-sm text-red-500">{errors.confirm}</p>
            )}
          </div>

          {/* Terms */}
          <div>
            <label className="inline-flex items-center gap-2 text-sm select-none text-gray-700 dark:text-gray-200">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="accent-indigo-600"
              />
              <span>
                I agree to the
                <Link
                  to="/terms"
                  className="text-indigo-600 dark:text-indigo-400 hover:underline ml-1"
                >
                  Terms and Conditions
                </Link>
              </span>
            </label>
            {errors.terms && (
              <p className="mt-1 text-sm text-red-500">{errors.terms}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!canSubmit}
            className={`w-full rounded-full px-4 py-2 font-semibold text-white text-sm sm:text-base transition 
              ${
                canSubmit
                  ? "bg-indigo-600 hover:bg-indigo-700 shadow"
                  : "bg-indigo-300 cursor-not-allowed"
              }`}
          >
            {loading ? "Creating account..." : "Register"}
          </button>

          {/* Login link */}
          <p className="text-sm text-center text-gray-600 dark:text-gray-300 mt-2">
            Have an account?
            <Link
              to="/login"
              className="ml-1 text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
