import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Heart } from "lucide-react";
import { motion } from "motion/react";

// ✅ Firebase
import { auth, provider } from "../../lib/firebase";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export function LoginPage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 🔥 GOOGLE LOGIN
  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);

      const result = await signInWithPopup(auth, provider);
      console.log("Google success:", result.user);

      navigate("/onboarding");

    } catch (error) {
      console.error("Google Login Error:", error);
      alert("Google login failed");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 EMAIL LOGIN
  const handleEmailLogin = async () => {
    try {
      setLoading(true);

      const result = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log("Email login success:", result.user);

      navigate("/onboarding");

    } catch (error: any) {
      console.error(error);

      if (error.code === "auth/user-not-found") {
        alert("User not found. Please sign up.");
      } else if (error.code === "auth/wrong-password") {
        alert("Wrong password");
      } else {
        alert("Login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  // 🔥 SIGNUP
  const handleSignup = async () => {
    try {
      setLoading(true);

      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log("Signup success:", result.user);

      navigate("/onboarding");

    } catch (error: any) {
      console.error(error);

      if (error.code === "auth/email-already-in-use") {
        alert("Email already in use");
      } else {
        alert("Signup failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, var(--blush-pink), var(--lavender), var(--champagne))",
      }}
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 w-64 h-64 rounded-full opacity-20"
          style={{ background: "var(--rose-gold)" }}
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 rounded-full opacity-20"
          style={{ background: "var(--lavender-dark)" }}
          animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
          transition={{ duration: 25, repeat: Infinity }}
        />
      </div>

      <motion.div
        className="relative z-10 w-full max-w-md px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-10 border">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <motion.div
              className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
              style={{
                background:
                  "linear-gradient(135deg, var(--rose-gold), var(--gold-accent))",
              }}
              whileHover={{ scale: 1.1 }}
            >
              <Heart className="w-10 h-10 text-white fill-white" />
            </motion.div>

            <h1 className="text-3xl text-center mb-2 bg-gradient-to-r from-rose-900 to-purple-900 bg-clip-text text-transparent">
              Blissful Moments
            </h1>

            <p className="text-muted-foreground text-center">
              Your dream wedding, perfectly planned
            </p>
          </div>

          {/* LOGIN */}
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="mb-2">Welcome Back</h2>
              <p className="text-sm text-muted-foreground">
                Sign in to continue planning your special day
              </p>
            </div>

            {/* GOOGLE */}
            <Button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full h-12"
              style={{
                background:
                  "linear-gradient(135deg, var(--rose-gold), var(--gold-accent))",
                color: "white",
              }}
            >
              {loading ? "Signing in..." : "Continue with Google"}
            </Button>

            {/* EMAIL */}
            <div className="text-center text-sm text-muted-foreground">
              or continue with email
            </div>

            <div className="space-y-3">
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 px-4 rounded-lg border"
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 px-4 rounded-lg border"
              />
            </div>

            <Button
              onClick={handleEmailLogin}
              disabled={loading}
              variant="outline"
              className="w-full h-12"
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>

            {/* SIGNUP */}
            <div className="text-center text-sm text-muted-foreground">
              Don't have an account?
              <span
                onClick={handleSignup}
                className="text-rose-600 ml-1 cursor-pointer hover:underline"
              >
                Sign up
              </span>
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-gray-600 mt-6">
          By continuing, you agree to our Terms
        </p>
      </motion.div>
    </div>
  );
}