import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div
        role="status"
        className="flex flex-row justify-center items-center min-h-screen"
      >
        Loading...
      </div>
    );
  }

  if (!user) {
    return navigate("/login");
  }

  return children;
};
