import React from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";
import { login } from "../features/user/userSlice";

const schema = yup
  .object({
    name: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

function LoginForm() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    if (user && user.name === data.name) {
      console.log("user already signed in");
    } else {
      dispatch(login(data));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name")} />
      <p>{errors.name?.message}</p>

      <input type={"password"} {...register("password")} />
      <p>{errors.password?.message}</p>

      <input type="submit" />
    </form>
  );
}

export default LoginForm;
