import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";

export function Home() {
  return (
    <div>
      <h1>Welcome to Mobile App🎉🎁</h1>
      <LoginForm />
    </div>
  );
}

function LoginForm() {
  const { handleChange, values, handleSubmit } = useFormik({
    initialValues: { username: "saro", password: "123" },
    onSubmit: async (values) => {
      console.log(values);

      const data = await fetch("http://localhost:4000/user/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(values),
      });
      if (data.status == 401) {
        console.log("ERROR");
      } else {
        const result = await data.json();
        console.log("SUCCESS", result);
      }
    },
  });
  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Login</h2>
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
      <Button type="submit" variant="contained">
        Submit
      </Button>
    </form>
  );
}
