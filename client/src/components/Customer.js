import React from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Customer(props) {
  const navigate = useNavigate();
  const { id, name, birthday, gender, job } = useParams();

  return (
    <div
      onClick={() => {
        navigate(`/test_update/${props.id}`, {
          state: {
            id: props.id,
            name: props.name,
            birthday: props.birthday,
            gender: props.gender,
            job: props.job,
          },
        });
      }}
    >
      <div>{props.id}</div>
      <div>{props.name}</div>
      <div>{props.birthday}</div>
      <div>{props.gender}</div>
      <div>{props.job}</div>
    </div>
  );
}
