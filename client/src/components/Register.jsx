import React from "react";
import { useSelector } from "react-redux";
const Register = () => {
  const user = useSelector((state) => state.user);

  return (
    <div className="container-fluid h1 p-5 text-center">
      Register{JSON.stringify(user)}
    </div>
  );
};

export default Register;
