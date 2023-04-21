import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { addDefect } from "../features/defects/defectSlice";

const schema = yup
  .object({
    userRegisteredBy: yup.string().required(),
    title: yup.string().required(),
    location: yup.string().required(),
    description: yup.string().required(),
    DepartmentRegisteredBy: yup.string().required(),
    DepartmentAssignedTo: yup.string().required(),
  })
  .required();

function AddDefectForm() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user.user);
  const roles = useSelector((store) => store.roles.roles);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    dispatch(addDefect(data));

    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="complete-defect-form">
      <input
        style={{ display: "none" }}
        value={user._id}
        {...register("userRegisteredBy")}
      />
      <p>{errors.userRegisteredBy?.message}</p>

      <select
        placeholder="Defect registered by..."
        {...register("DepartmentRegisteredBy")}
        name="DepartmentRegisteredBy"
        id="DepartmentRegisteredBy"
      >
        <option>Defect registered by...</option>
        {roles.map((role) => (
          <option key={role._id} value={role._id}>
            {role.name}
          </option>
        ))}
      </select>
      <p>{errors.DepartmentRegisteredBy?.message}</p>

      <input placeholder="Defect title..." {...register("title")} />
      <p>{errors.title?.message}</p>

      <input placeholder="Defect location..." {...register("location")} />
      <p>{errors.location?.message}</p>

      <input placeholder="Defect description..." {...register("description")} />
      <p>{errors.description?.message}</p>

      <select
        placeholder="Defect assigned to..."
        {...register("DepartmentAssignedTo")}
        name="DepartmentAssignedTo"
        id="DepartmentAssignedTo"
      >
        <option>Defect assigned to...</option>
        {roles.map((role) => (
          <option key={role._id} value={role._id}>
            {role.name}
          </option>
        ))}
      </select>
      <p>{errors.DepartmentAssignedTo?.message}</p>
      <button type="submit">Add Defect</button>
    </form>
  );
}

export default AddDefectForm;
