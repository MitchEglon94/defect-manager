import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { completeDefect } from "../features/defects/defectSlice";

const schema = yup
  .object({
    workDescription: yup.string().required(),
    completedBy: yup.string().required(),
  })
  .required();

function CompleteDefectForm(props) {
  const currentDefect = props.defect;
  console.log(currentDefect);
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
    console.log(currentDefect);
    dispatch(completeDefect({ ...data, ...currentDefect }));
    console.log(data);
  };

  return (
    <>
      <div>
        <h3>Defect Information</h3>
        <p>Assigned by: {currentDefect.userRegisteredBy.name}</p>
        <p>Registered by: {currentDefect.DepartmentRegisteredBy.name}</p>
        <p>Defect title: {currentDefect.title}</p>
        <p>Defect location: {currentDefect.location}</p>
        <p>Defect description: {currentDefect.description}</p>
        <p>Assigned to: {currentDefect.DepartmentAssignedTo.name}</p>
      </div>
      <h3>Complete Defect</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="complete-defect-form">
        <select
          placeholder="Defect completed by..."
          {...register("completedBy")}
          name="completedBy"
          id="completedBy"
        >
          <option>Defect completed by...</option>
          {roles.map((role) => (
            <option key={role._id} value={role._id}>
              {role.name}
            </option>
          ))}
        </select>
        <p>{errors.completedBy?.message}</p>
        <textarea
          placeholder="Describe work carried out..."
          {...register("workDescription")}
        ></textarea>
        <p>{errors.workDescription?.message}</p>

        <button type="submit">Complete Defect</button>
      </form>
    </>
  );
}

export default CompleteDefectForm;
