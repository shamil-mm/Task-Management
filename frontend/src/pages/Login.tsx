
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { loginUser } from "../services/authService";


import { useDispatch,useSelector } from "react-redux";
import { loginSuccess } from "../store/authSlice";
import type { RootState } from "../store/store";

import { joiLoginSchema } from "../validation/authValidation";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const navigate=useNavigate()
  const dispatch=useDispatch();
  const token=useSelector((state:RootState)=>state.auth.accessToken)

  useEffect(()=>{
    if(token){
      navigate('/dashboard')
    }
  },[token,navigate])
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();

    const { error } = joiLoginSchema.validate(formData, { abortEarly: false });
    if (error) {
      const validationErrors: { email?: string; password?: string } = {};
      error.details.forEach((detail) => {
        const field = detail.path[0] as "email" | "password";
        validationErrors[field] = detail.message;
      });
      setErrors(validationErrors);
      return;
    }





    try {
      const data =await loginUser(formData)
      const { accessToken, email ,_id} = data;
      dispatch(loginSuccess({token:accessToken,user:{email,_id}}))
      if(data.message=="User logged in successfully"){
        navigate('/dashboard')
      }

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
        
        />
       {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>} 
        <Input
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password}</p>
        )}

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
