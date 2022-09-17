import React, { FC } from "react";
import PasswordTextField from "./PasswordTextField";
import TextField from "./TextField";
import { useForm } from "react-hook-form";

import styles from "../styles/LoginForm.module.scss";
import axios from "axios";
import { useAppDispatch } from "../store/hooks/redux";
import { login } from "../store/slices/userSlice";

interface LoginFormProps {
  setOpen: () => void;
}

type LoginData = {
  email: string;
  password: string;
};
const LoginForm: FC<LoginFormProps> = ({ setOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginData>();

  const dispatch = useAppDispatch();

  const onSubmit = (data: {}) => {
    axios.post("http://localhost:5000/users/login", data).then((res) => {
      if (res.data) {
        setOpen();
        dispatch(login(res.data));
      } else {
        setError("email", { message: "Неверный логин или пароль" });
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
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
