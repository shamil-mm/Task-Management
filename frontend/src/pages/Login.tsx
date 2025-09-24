
import { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import { loginUser } from "../services/authService";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login Data:", formData);
    try {
      const data =await loginUser(formData)
      console.log("Login success:",data)
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-950">
      <form
        onSubmit={handleSubmit}
        className="bg-white  p-6 rounded-xl shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

        <Input
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <Input
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="w-full bg-green-950 text-white py-2 rounded-lg hover:bg-green-800 transition"
        >
          Sign In
        </button>
        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <Link to="/register" className="text-green-950 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
