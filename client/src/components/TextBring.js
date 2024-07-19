import React from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function TextBring(props) {
  const navigate = useNavigate();
  const { datas } = useParams();

  return (
    <div
      onClick={() => {
        navigate(`/api/text/send`, {
          state: {
            datas: datas,
          },
        });
      }}
    >
      <div>{props.datas}</div>
      <br />
    </div>
  );
}
