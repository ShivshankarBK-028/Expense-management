import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Mail, Lock, Eye } from "lucide-react";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("user", JSON.stringify(response.data));

      if (response.data.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(error);
      alert("Invalid email or password");
    }
  };

  return (
    <div 
      className="d-flex align-items-center justify-content-center min-vh-100 p-3" 
      style={{ backgroundColor: "#f8fafc" }}
    >
      <div 
        className="bg-white border border-light shadow-sm p-4 p-sm-5 w-100" 
        style={{ maxWidth: "440px", borderRadius: "32px" }}
      >
        
        {/* Lock Icon */}
        <div className="d-flex justify-content-center mb-4">
          <div 
            className="rounded-circle d-flex align-items-center justify-content-center text-primary" 
            style={{ width: "64px", height: "64px", backgroundColor: "#eff6ff" }}
          >
            <Lock size={28} strokeWidth={1.75} />
          </div>
        </div>

        {/* Heading */}
        <h1 className="h3 fw-bold text-center text-dark mb-1" style={{ letterSpacing: "-0.5px" }}>
          Welcome Back
        </h1>
        
        <p className="text-center text-muted small fw-medium mb-4">
          Please login to your account
        </p>

        <hr className="text-black-50 opacity-10 mb-4" />

        {/* FIXED: Changed flex-col to flex-column */}
        <form onSubmit={handleLogin} className="d-flex flex-column gap-3 w-100">
          
          {/* Email */}
          <div className="w-100 text-start">
            <label className="form-label small fw-semibold text-dark mb-2">
              Email
            </label>
            <div className="position-relative d-flex align-items-center w-100">
              <Mail 
                className="position-absolute text-muted" 
                size={20} 
                strokeWidth={1.5} 
                style={{ left: "16px", zIndex: 5, pointerEvents: "none" }} 
              />
              <input
                type="email"
                placeholder="Enter your email"
                className="form-control w-100"
                style={{ 
                  paddingLeft: "48px", 
                  paddingTop: "12px", 
                  paddingBottom: "12px", 
                  borderRadius: "12px",
                  borderColor: "#bfdbfe" 
                }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="w-100 text-start mt-2">
            <label className="form-label small fw-semibold text-dark mb-2">
              Password
            </label>
            <div className="position-relative d-flex align-items-center w-100">
              <Lock 
                className="position-absolute text-muted" 
                size={20} 
                strokeWidth={1.5} 
                style={{ left: "16px", zIndex: 5, pointerEvents: "none" }} 
              />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="form-control w-100"
                style={{ 
                  paddingLeft: "48px", 
                  paddingRight: "48px", 
                  paddingTop: "12px", 
                  paddingBottom: "12px", 
                  borderRadius: "12px",
                  borderColor: "#dee2e6" 
                }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="btn position-absolute text-muted p-0 border-0 d-flex align-items-center justify-content-center"
                style={{ right: "16px", zIndex: 5 }}
              >
                <Eye size={20} strokeWidth={1.5} />
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="btn btn-primary w-100 fw-semibold mt-3 shadow-sm"
            style={{ 
              paddingTop: "12px", 
              paddingBottom: "12px", 
              borderRadius: "12px",
              backgroundColor: "#2563eb",
              border: "none"
            }}
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <div className="d-flex align-items-center justify-content-center text-muted small fw-medium mt-5 w-100">
          <div className="flex-grow-1 border-top border-light opacity-50"></div>
          <span className="px-3 d-flex align-items-center gap-2 text-nowrap" style={{ fontSize: "12px", color: "#94a3b8" }}>
            <Lock size={14} strokeWidth={2} /> Secure Access
          </span>
          <div className="flex-grow-1 border-top border-light opacity-50"></div>
        </div>

      </div>
    </div>
  );
}

export default Login;