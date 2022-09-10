import React from "react";
import PasswordTextField from "./PasswordTextField";
import TextField from "./TextField";
import { useForm } from "react-hook-form";
import axios from "axios";

import styles from "../styles/AuthForm.module.scss";

type Registration = {
  email: string;
  password: string;
  passwordConfirmation: string;
};

const AuthForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Registration>();

  const onSubmit = (data: {}) => {
    axios.post("http://localhost:5000/user", data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          register={{
            ...register("email", {
              required: "Введите email",
            }),
          }}
          placeholder="Email..."
          type="email"
          errorMessage={errors.email?.message}
        />
        <PasswordTextField
          register={{
            ...register("password", {
              required: "Введите пароль",
            }),
          }}
          placeholder="Пароль..."
          errorMessage={errors.password?.message}
        />
        <PasswordTextField
          register={{
            ...register("password", {
              required: "Повторите пароль",
            }),
          }}
          placeholder="Повторите пароль..."
          errorMessage={errors.password?.message}
        />
        <button className={styles.button}>Зарегестрироваться</button>
      </form>
    </div>
  );
};

export default AuthForm;
