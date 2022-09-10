import React, { FC, useState } from "react";
import styles from "../styles/TextField.module.scss";
import { UseFormRegisterReturn } from "react-hook-form";

interface TextFiledProps {
  value?: string;
  onChange?: (text: string) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement> | undefined;
  placeholder: string;
  register?: UseFormRegisterReturn<"email" | "name">;
  type?: "text" | "email";
  errorMessage?: string;
}

const TextField: FC<TextFiledProps> = ({
  value,
  onChange,
  onBlur,
  placeholder,
  register,
  errorMessage,
  type = "text",
}) => {
  return (
    <>
      {errorMessage && <div className={styles.error}>{errorMessage}</div>}
      <input
        value={value}
        placeholder={placeholder}
        {...register}
        type={type}
        autoComplete="off"
        className={styles.input}
      />
    </>
  );
};

export default TextField;
