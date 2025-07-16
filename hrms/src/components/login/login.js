import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_API_URL } from "../../lib/constants.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./login.module.css";
import "./tailwind.output.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const onUpdateField = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

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

  const onSubmitForm = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    if (validateForm()) {
      try {
        const response = await fetch(`${BASE_API_URL}user/login_auth`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          console.error("Expected JSON but received:", contentType);
          setMsg("Unexpected server response.");
          return;
        }

        const data = await response.json();
        setMsg(data.msg); // Set message to show wrong password

        if (response.ok) {
          const authToken = data.authToken;
          localStorage.setItem("token", authToken);

          const userResponse = await fetch(
            `${BASE_API_URL}user/getuserbyid?userid=${data.user._id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: authToken,
              },
            }
          );

          if (!userResponse.ok) {
            throw new Error("Failed to fetch user data");
          }

          const userData = await userResponse.json();
          const name = `${userData.data.fname} ${userData.data.lname}`;
          localStorage.setItem("_id", userData.data._id);
          localStorage.setItem("name", name);
          localStorage.setItem("email", userData.data.email);
          localStorage.setItem("role", userData.data.role);

          if (userData.data.role === "admin") {
            navigate("/admin");
          } else {
            navigate("/user");
          }
        } else {
          setMsg("Login failed, please check your Email or Password.");
        }
      } catch (error) {
        console.error("Error occurred:", error);
        setMsg("An error occurred during login.");
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src="../../../assets/img/login-office.jpeg"
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src="../../../assets/img/login-office-dark.jpeg"
              alt="Office"
            />
          </div>
          <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200" style={{paddingLeft:'20px'}}>
                Login
              </h1>

              {/* Wrap the input fields in a form tag */}
              <form
                onSubmit={onSubmitForm}
                style={{
                  backgroundColor: "#fff",
                  border: "2px solid #fff",
                  width: "100%",
                }}
              >
                <label className="block text-sm">
                  <span className="text-gray-700 dark:text-gray-400">
                    Email
                  </span>
                  <input
                    type="text"
                    name="email"
                    placeholder="Enter Your Email"
                    value={form.email}
                    onChange={onUpdateField}
                    className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                  />
                  {errors.email && (
                    <span className="error" style={{ color: "red" }}>
                      {errors.email}
                    </span>
                  )}
                </label>
                <label className="block mt-4 text-sm">
                  <div
                    className="flex justify-between mb-2"
                    style={{ alignItems: "center" }}
                  >
                    <span className="text-gray-700 dark:text-gray-400">
                      Password
                    </span>
                    <FontAwesomeIcon
                      icon={showPassword ? faEyeSlash : faEye}
                      onClick={togglePasswordVisibility}
                      className="password-toggle-icon"
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="*********"
                    value={form.password}
                    onChange={onUpdateField}
                    className="block w-full text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                  />
                  {errors.password && (
                    <span className="error" style={{ color: "red" }}>
                      {errors.password}
                    </span>
                  )}
                </label>

                {/* Remove onClick from the button and rely on form submission */}
                <button
                  type="submit"
                  className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple mx-auto"
                >
                  Log in
                </button>
              </form>
              {msg && <p className="mt-4 text-center text-red-600">{msg}</p>}

              <hr className="" />

              <p className="mt-1 flex flex-col items-center text-center">
                <span style={{ color: "black" }}> Don't have an account? </span>
                <Link
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  to="../signup"
                >
                  Create Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
