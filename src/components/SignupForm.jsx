import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { signup } from "../features/user/userSlice";

const schema = yup
  .object({
    name: yup.string().required(),
    password: yup.string().required(),
    role: yup.string(),
  })
  .required();

function SignupForm() {
  const roles = useSelector((store) => store.roles.roles);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    dispatch(signup(data));
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name")} />
      <p>{errors.name?.message}</p>

      <input type={"password"} {...register("password")} />
      <p>{errors.password?.message}</p>

      <select name="" id="" {...register("role")}>
        {roles.map((role) => (
          <option key={role._id} value={role._id}>
            {role.name}
          </option>
        ))}
      </select>

      <input type="submit" />
    </form>
  );
}

export default SignupForm;
