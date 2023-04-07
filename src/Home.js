import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "./global";

export function Home() {
  return (
    <div>
      <img
        className="logo"
        src="https://media.istockphoto.com/id/540396124/vector/crm-vector-icon-customer-relationship-management-logo.jpg?s=170667a&w=0&k=20&c=0pFh3i2g-j8_--2oeoVdY7Ybxf_l6UURAWMe2Ai2G2U="
      />
      <h3>
        Displayed Admin Details with Delete button and user Details just to view
      </h3>
      <LoginForm />
    </div>
  );
}

export function LoginForm() {
  const navigate = useNavigate();
  const [formState, setFormState] = useState("success");
  const { handleChange, values, handleSubmit } = useFormik({
    initialValues: { username: "", password: "" },
    onSubmit: async (values) => {
      console.log(values);

      const data = await fetch("http://localhost:4000/user/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(values),
      });
      if (data.status == 401) {
        console.log("ERROR");
        setFormState("error");
      } else {
        const result = await data.json();
        console.log("SUCCESS", result);
        localStorage.setItem("token", result.token);
        localStorage.setItem("roleId", result.roleId);
        navigate("/mobiles");
      }
    },
  });
  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Login with given Credentials</h2>
      <TextField
        label="Username"
        variant="outlined"
        onChange={handleChange}
        value={values.username}
        name="username"
      />
      <TextField
        label="Password"
        variant="outlined"
        onChange={handleChange}
        value={values.password}
        name="password"
      />
      <Button color={formState} type="submit" variant="contained">
        {formState == "error" ? "Retry" : "Submit"}
      </Button>
    </form>
  );
}
