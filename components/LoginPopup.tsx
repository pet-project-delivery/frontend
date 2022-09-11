import React, { FC, useState } from "react";
import styles from "../styles/LoginPopup.module.scss";
import AuthForm from "./AuthForm";
import LoginForm from "./LoginForm";
import PasswordTextField from "./PasswordTextField";
import TextField from "./TextField";

interface LoginPopupProps {
  setOpen: () => void;
}

const LoginPopup: FC<LoginPopupProps> = ({ setOpen }) => {
  const [active, setActive] = useState(0);

  return (
    <div className={styles.popup}>
      <div className={styles.buttons}>
        <button
          onClick={() => setActive(1)}
          className={`${styles.button} ${active ? styles.active : null}`}
        >
          Регистрация
        </button>
        <button
          onClick={() => setActive(0)}
          className={`${styles.button} ${!active ? styles.active : null}`}
        >
          Вход
        </button>
      </div>
      {active === 1 ? (
        <AuthForm setOpen={setOpen} />
      ) : (
        <LoginForm setOpen={setOpen} />
      )}
    </div>
  );
};

export default LoginPopup;
