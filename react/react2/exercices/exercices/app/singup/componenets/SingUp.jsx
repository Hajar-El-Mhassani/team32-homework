"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Box, Typography } from "@mui/material";
import signUpSchema from "@/validation/loginValidation.js";

const SignUpForm = () => {
  const router = useRouter();

  // Refs for inputs
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);

  // Form state
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});

  // move to next field on Enter
  const handleKeyDown = (e, nextRef) => {
    if (e.key === "Enter" && nextRef.current) {
      e.preventDefault();
      nextRef.current.focus();
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = signUpSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors = {};
      result.error.errors.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    if (Object.keys(newErrors).length === 0) {
      // Redirect to home
      router.push("/");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 400, margin: "auto", mt: 5 }}
    >
      <Typography variant="h5" gutterBottom>
        Sign Up
      </Typography>

      <input
        ref={firstNameRef}
        name="firstName"
        placeholder="First Name"
        value={form.firstName}
        onChange={handleChange}
        onKeyDown={(e) => handleKeyDown(e, lastNameRef)}
        style={{
          width: "100%",
          padding: "8px",
          marginBottom: "10px",
          borderColor: errors.firstName ? "red" : "#ccc",
        }}
      />
      {errors.firstName && <p style={{ color: "red" }}>{errors.firstName}</p>}

      <input
        ref={lastNameRef}
        name="lastName"
        placeholder="Last Name"
        value={form.lastName}
        onChange={handleChange}
        onKeyDown={(e) => handleKeyDown(e, emailRef)}
        style={{
          width: "100%",
          padding: "8px",
          marginBottom: "10px",
          borderColor: errors.lastName ? "red" : "#ccc",
        }}
      />
      {errors.lastName && <p style={{ color: "red" }}>{errors.lastName}</p>}

      <input
        ref={emailRef}
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        onKeyDown={(e) => handleKeyDown(e, phoneRef)}
        style={{
          width: "100%",
          padding: "8px",
          marginBottom: "10px",
          borderColor: errors.email ? "red" : "#ccc",
        }}
      />
      {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}

      <input
        ref={phoneRef}
        name="phone"
        placeholder="Phone Number"
        value={form.phone}
        onChange={handleChange}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
        style={{
          width: "100%",
          padding: "8px",
          marginBottom: "10px",
          borderColor: errors.phone ? "red" : "#ccc",
        }}
      />
      {errors.phone && <p style={{ color: "red" }}>{errors.phone}</p>}

      <Button type="submit" variant="contained" fullWidth>
        Submit
      </Button>
    </Box>
  );
};
export default SignUpForm;
