import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ImageShow() {
  const [imageShow, setImageShow] = useState("");

  const { id } = useParams();

  function imageFunction() {
    fetch(`http://localhost:5000/api/images/${id}`, {
      method: "get",
      headers: {
        "content-type": "application/json",
      },
    }).then(function (res) {
      setImageShow(res);
    });
  }

  return (
    <>
      <img src={imageFunction} alt="이미지를 불러와야 합니다" />
      <button>불러오기</button>
    </>
  );
}
