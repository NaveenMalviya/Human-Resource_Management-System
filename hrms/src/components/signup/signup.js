import { useState } from "react";
import { Link } from "react-router-dom";

import { BASE_API_URL } from "../../lib/constants.jsx";

const SignUpForm = () => {
  const [form, setForm] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    dob: "",
    gender: "",
    standard: "",
    address: "",
    city: "",
    state: "",
  });

  const [msg, setMsg] = useState();
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [isHovered, setIsHovered] = useState(false);
  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    }

    if (!form.password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const onUpdateField = (e) => {
    const nextFormState = {
      ...form,
      [e.target.name]: e.target.value,
    };
    setForm(nextFormState);
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch(`${BASE_API_URL}user/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setMsg(data.msg);
            setForm({
              fname: "",
              lname: "",
              email: "",
              password: "",
              dob: "",
              gender: "",
              standard: "",
              address: "",
              city: "",
              state: "",
            });
          } else {
            setMsg(data.msg);
          }
        } else {
          console.error("Signup failed");
        }
      } catch (error) {
        console.error("Error occurred:", error);
      }
    }
  };

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 ">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              // src="../assets/img/create-account-office.jpeg"
              src="../../../assets/img/create-account-office.jpeg"
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              // src="../assets/img/create-account-office-dark.jpeg"
              src="../../../assets/img/create-account-office-dark.jpeg"
              alt="Office"
            />
          </div>
          <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Create account
              </h1>

              {/* First Name and Last Name */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-sm">
                  <label className="text-gray-700 dark:text-gray-400">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="fname"
                    placeholder="Enter your first name"
                    value={form.fname}
                    onChange={onUpdateField}
                    className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                  />
                </div>
                <div className="text-sm">
                  <label className="text-gray-700 dark:text-gray-400">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lname"
                    placeholder="Enter your last name"
                    value={form.lname}
                    onChange={onUpdateField}
                    className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                  />
                </div>
              </div>

              {/* Email */}
              <label className="block mt-4 text-sm">
                <span className="text-gray-700 dark:text-gray-400">Email</span>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={onUpdateField}
                  className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                />
                {errors.email && (
                  <span className="error text-red-500" style={{ color: "red" }}>
                    {errors.email}
                  </span>
                )}
              </label>

              {/* Password */}
              <label className="block mt-4 text-sm">
                <span className="text-gray-700 dark:text-gray-400">
                  Password
                </span>
                <input
                  type="password"
                  name="password"
                  placeholder="***************"
                  value={form.password}
                  onChange={onUpdateField}
                  className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                />
                {errors.password && (
                  <span className="error text-red-500" style={{ color: "red" }}>
                    {errors.password}
                  </span>
                )}
              </label>

              {/* Other Fields */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="text-sm">
                  <label className="text-gray-700 dark:text-gray-400">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dob"
                    value={form.dob}
                    onChange={onUpdateField}
                    className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                  />
                </div>
                <div className="text-sm">
                  <label className="text-gray-700 dark:text-gray-400">
                    Gender
                  </label>
                  <input
                    type="text"
                    name="gender"
                    placeholder="Enter your gender"
                    value={form.gender}
                    onChange={onUpdateField}
                    className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="text-sm">
                  <label className="text-gray-700 dark:text-gray-400">
                    Standard
                  </label>
                  <input
                    type="text"
                    name="standard"
                    placeholder="Enter your standard"
                    value={form.standard}
                    onChange={onUpdateField}
                    className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                  />
                </div>
                <div className="text-sm">
                  <label className="text-gray-700 dark:text-gray-400">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    placeholder="Enter your address"
                    value={form.address}
                    onChange={onUpdateField}
                    className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="text-sm">
                  <label className="text-gray-700 dark:text-gray-400">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    placeholder="Enter your city"
                    value={form.city}
                    onChange={onUpdateField}
                    className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                  />
                </div>
                <div className="text-sm">
                  <label className="text-gray-700 dark:text-gray-400">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    placeholder="Enter your state"
                    value={form.state}
                    onChange={onUpdateField}
                    className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                  />
                </div>
                {msg && <span style={{ color: "#7d00aa" }}>{msg}</span>}
              </div>

              <button
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}          
                onClick={onSubmitForm}
                className="block px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple mx-auto"
                style={{backgroundColor: isHovered ? '#c392ff' : '#7d00aa'}}
              >
                Create account
              </button>
              <hr className="my-8" />

              <p className="mt-4 flex flex-col items-center text-center">
                <span style={{ color: "black" }}>Already have an account?</span>
                <Link
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  to="/login"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
