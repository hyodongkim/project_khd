import React from "react";
import { useNavigate } from "react-router-dom";

export default function Customer1(props) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate(`/test_delete/${props.id}`, {
          state: {
            id: props.id,
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
