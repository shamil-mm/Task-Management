import { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import { registerUser } from "../services/authService";
import { JoiRegisterSchemaJoi } from "../validation/authValidation";
import toast from "react-hot-toast";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();

    const { error } = JoiRegisterSchemaJoi.validate(formData, { abortEarly: false });
    if (error) {
      const validationErrors: { [key: string]: string } = {};
      error.details.forEach((err) => {
        if (err.path[0]) validationErrors[err.path[0]] = err.message;
      });
      setErrors(validationErrors);
      return;
    }
    setErrors({});
   
    try {
      const { confirmPassword, ...data } = formData; 
      const res = await registerUser(data);
      console.log("Register success:", res);
    } catch (err: any) {
      console.error("Register error:", err.response?.data || err.message);
      if(!err.response.data.success){
        toast.error(err.response.data.message);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-950">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>
        
        <Input
          label="Name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          
        />
         {errors.name && <p className="text-red-600 text-sm p-0 m-">{errors.name}</p>}

        <Input
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
      
        />
        {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}

        <Input
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
       
        />
        {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}

        <Input
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
       
        />
        
        {errors.confirmPassword && <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>}
        <button
          type="submit"
          className="w-full bg-green-950 text-white py-2 rounded-lg hover:bg-green-800 transition"
        >
          Sign Up
        </button>
        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/" className="text-green-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
