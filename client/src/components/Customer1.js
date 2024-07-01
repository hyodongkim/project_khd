import React from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Customer1(props) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate(`/test_delete/${props.id}`, {
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
