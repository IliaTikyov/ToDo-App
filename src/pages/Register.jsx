import React, { useEffect, useMemo, useState } from "react";
import { auth } from "../../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const navigate = useNavigate();

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
  }, [email, password, confirm, acceptedTerms]);

  const canSubmit =
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
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setFormError(mapFirebaseError(err?.code));
    } finally {
      setLoading(false);
    }
  };

  const baseInput =
    "w-full rounded-md border bg-gray-50 dark:bg-zinc-800 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500";
  const errorBorder = "border-red-400 dark:border-red-400";
  const normalBorder = "border-gray-300 dark:border-zinc-700";

  return (
    <div className="min-h-screen grid place-items-center bg-[#ecedef] dark:bg-gray-800 dark:text-white">
      <div className="w-full max-w-md rounded-2xl bg-white dark:bg-zinc-900 shadow p-6">
        <div className="flex flex-col justify-center items-center space-y-0.5 mb-6">
          <h1 className="text-2xl font-semibold dark:text-white">
            Create Your Account
          </h1>
          <h2 className="text-sm text-gray-600 dark:text-gray-300">
            Start tracking your tasks daily
          </h2>
        </div>

        {formError && (
          <div className="mb-4 rounded-md bg-red-50 dark:bg-red-900/20 border border-red-300 text-red-700 dark:text-red-300 px-3 py-2 text-sm">
            {formError}
          </div>
        )}

        <form onSubmit={handleUserRegister} className="space-y-4">
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
            <label htmlFor="password" className="block text-sm mb-1">
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
                className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-600 dark:text-gray-300"
                aria-label={showPw ? "Hide password" : "Show password"}
              >
                {showPw ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
            )}

            <div className="mt-2 h-1 w-full bg-gray-200 dark:bg-zinc-800 rounded">
              <div
                className="h-1 rounded transition-all"
                style={{
                  width: `${(pwStrength / 5) * 100}%`,
                  background:
                    pwStrength < 2
                      ? "#ef4444"
                      : pwStrength < 4
                      ? "#f59e0b"
                      : "#10b981",
                }}
              />
            </div>
          </div>

          <div>
            <label htmlFor="confirm" className="block text-sm mb-1">
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
                className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-600 dark:text-gray-300"
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

          <div>
            <label className="inline-flex items-center gap-2 text-sm select-none">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="accent-blue-600"
              />
              <span>
                I agree to the
                <Link
                  to="/terms"
                  className="text-blue-600 hover:underline ml-1"
                >
                  Terms and Conditions
                </Link>
              </span>
            </label>
            {errors.terms && (
              <p className="mt-1 text-sm text-red-500">{errors.terms}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={!canSubmit}
            className={`w-full rounded-full px-4 py-2 font-semibold text-white transition 
              ${
                canSubmit
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-blue-400 cursor-not-allowed"
              }`}
          >
            {loading ? "Creating account..." : "Register"}
          </button>

          <p className="text-sm text-center text-gray-600 dark:text-gray-300">
            Have an account?
            <Link to="/login" className="ml-1 text-blue-600 hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
