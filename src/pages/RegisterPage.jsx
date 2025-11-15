import { useEffect } from "react";
import useForm from "../hooks/useForm";
import { useNavigate } from "react-router";
import { useState } from "react";

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const { handleChange, handleReset, values } = useForm({
    username: "",
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    dni: "",
  });

  useEffect(() => {
    console.log(values);
  }, [values]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const payload = {
      name: values.firstname,
      lastname: values.lastname,
      username: values.username,
      email: values.email,
      password: values.password,
    };

    try {
      const res = await fetch("http://localhost:4000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        navigate("/home");
      } else {
        alert("Login failed");
        handleReset();
      }
    } catch (error) {
      console.log("Error during login:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <p>Loading...</p>}

      <form onSubmit={handleSubmit}>
        <br />
        <label>username</label>
        <br />
        <input
          name="username"
          onChange={handleChange}
          value={values.username}
          disabled={loading}
          type="text"
          required
        />
        <br />
        <label>email</label>
        <br />
        <input
          name="email"
          onChange={handleChange}
          value={values.email}
          disabled={loading}
          type="email"
          required
        />
        <br />
        <label>password</label>
        <br />
        <input
          name="password"
          onChange={handleChange}
          value={values.password}
          disabled={loading}
          type="password"
          required
        />
        <br />
        <label>firstname</label>
        <br />
        <input
          name="firstname"
          onChange={handleChange}
          value={values.firstname}
          disabled={loading}
          type="text"
          required
        />
        <br />
        <label>lastname</label>
        <br />
        <input
          name="lastname"
          onChange={handleChange}
          value={values.lastname}
          disabled={loading}
          type="text"
          required
        />
        <br />
        <label>dni</label>
        <br />
        <input
          name="dni"
          onChange={handleChange}
          value={values.dni}
          disabled={loading}
          type="number"
          required
        />
        <br />
        <button type="submit" disabled={loading}>Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
