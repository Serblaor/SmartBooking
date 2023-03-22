import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";

const Register = () => {
const [credentials, setCredentials] = useState({
username: "",
email: "",
password: "",
passport: "",
phone: "",
country: "",
city: "",
});

const [mensaje, setMensaje] = useState("");
const [loading, setLoading] = useState(false);
const [showConfirm, setShowConfirm] = useState(false);

const navigate = useNavigate();

const handleChange = (e) => {
  setCredentials({ ...credentials, [e.target.name]: e.target.value });
};

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setMensaje('');
    setShowConfirm(false);
  try {
    const response = await fetch("/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    if (!credentials.username) {
      setMensaje('Ingrese un nombre de usuario');
      setLoading(false);
      return;
    }
    else if (!credentials.email.includes('@')) {
      setMensaje('Ingrese un correo electrónico válido');
      setLoading(false);
      return;
    } 
    else if (credentials.password.length < 6) {
      setMensaje('La contraseña debe tener al menos 6 caracteres');
      setLoading(false);
      return;
    } 
    else if (credentials.passport.length < 5) {
      setMensaje('El número de pasaporte debe tener al menos 5 caracteres');
      setLoading(false);
      return;
    }
    else if (credentials.phone.length < 7 || credentials.phone.length > 10) {
      setMensaje('El número de teléfono debe tener entre 7 y 10 caracteres');
      setLoading(false);
      return;
    }
    else if (response.ok) {
      setMensaje("Usuario registrado correctamente.");
      setShowConfirm(true);
    } else {
      const error = await response.json();
      setMensaje(error.message);
    }
  } catch (error) {
    console.error(error);
    setMensaje("Hubo un error al registrar al usuario.");
  }
  setLoading(false);
};

const handleConfirm = () => {
  setShowConfirm(false);
  navigate("/login");
};

return (
  
  <form onSubmit={handleSubmit}>
    <h2 className="entrada">Start the new SmartBooking experience! 🏨   </h2>
    <input
      type="text"
      placeholder="Username"
      id="username"
      name="username"
      value={credentials.username}
      onChange={handleChange}
    />
    <input
      type="email"
      placeholder="Email"
      id="email"
      name="email"
      value={credentials.email}
      onChange={handleChange}
    />
    <input
      type="password"
      placeholder="password"
      id="password"
      name="password"
      value={credentials.password}
      onChange={handleChange}
    />
    <input
      type="text"
      placeholder="Passport ID"
      id="passport"
      name="passport"
      value={credentials.passport}
      onChange={handleChange}
    />
    <input
      type="text"
      placeholder="Phone"
      id="phone"
      name="phone"
      value={credentials.phone}
      onChange={handleChange}
    />
    <input
      type="text"
      placeholder="Country"
      id="country"
      name="country"
      value={credentials.country}
      onChange={handleChange}
    />
    <input
      type="text"
      placeholder="City"
      id="city"
      name="city"
      value={credentials.city}
      onChange={handleChange}
      title="city"
    />
    <button type="submit" disabled={loading}>
      Registrar
    </button>
    <p>{mensaje}</p>
    {showConfirm && (
      <div>
        
        <button onClick={handleConfirm}>Login</button>
      </div>
    )}
  </form>
);
}
export default Register;