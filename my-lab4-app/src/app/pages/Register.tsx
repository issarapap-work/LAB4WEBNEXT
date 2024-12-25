import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Register: React.FC = () => {
  const [userName, setUserName] = useState ("");
  const [passWord, setPassWord] = useState ("");
  const [error, setError] = useState ("");
  const navigate = useNavigate ();

  const handleRegister = async (e:React.FormEvent) => {
    e.preventDefault();

    if(!userName || !passWord) {
      setError("Please fill in all fields");
      return;
    }
    try {
      const response = await fetch('https://weblab.localapp.cc/user-profile/register', {
        method : 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({userName, passWord}),
      });
      const data = await response.json();
      if(response.ok) {
        navigate('/landing');
      } else {
        setError(data.error);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return(
    <div className="register">
      <form onSubmit={handleRegister}>
        <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Username"/>
        <input type="password" value={passWord} onChange={(e) => setPassWord (e.target.value)} placeholder="Password"/>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
 export default Register;
