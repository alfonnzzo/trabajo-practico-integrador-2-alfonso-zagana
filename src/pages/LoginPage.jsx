import { useEffect } from "react";
import useForm from "../hooks/useForm";
import { useNavigate } from "react-router";

const LoginPage = () => {
  const { handleChange, handleReset, values } = useForm({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    console.log(values);
  }, [values]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (res.ok) {
        navigate("/home");
      } else {
        alert("Login failed");
        handleReset();
      }
    } catch (error) {
      console.log("Error during login:", error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <br />
        <label>Username</label>
        <br />
        <input
          name="username"
          value={values.username}
          type="text"
          onChange={handleChange}
          required
        />
        <br />
        <label>Password</label>
        <br />
        <input
          name="password"
          value={values.password}
          type="password"
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">Iniciar sesion</button>
      </form>
    </div>
  );
};

export default LoginPage;
