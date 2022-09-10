import React from "react";
import PasswordTextField from "./PasswordTextField";
import TextField from "./TextField";
import { useForm } from "react-hook-form";

import styles from "../styles/LoginForm.module.scss";
import axios from "axios";

type LoginData = {
  email: string;
  password: string;
};
const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  const onSubmit = (data: {}) => {
    alert(JSON.stringify(data));
  };

  return (
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
      <button className={styles.button}>Войти</button>
    </form>
  );
};

export default LoginForm;
