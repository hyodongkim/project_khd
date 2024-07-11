import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ImageShow(props) {
  const [imageShow, setImageShow] = useState("");

  useEffect(() => {
    async function fetchData() {
      await fetch("http://localhost:5000/api/images/show", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        // body: JSON.stringify(userData),
      })
        .then((res) => res.json())
        .then((json) => {
          setImageShow(json);
        });
    }
  }, []);

  function fetchData() {
    fetch("http://localhost:5000/api/images/show", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      //sadfasdfasdf
    })
      .then((res) => res.json())
      .then((json) => {
        setImageShow(json);
      });
  }

  return (
    <>
      <img src={fetchData} alt="이미지를 불러와야 합니다" />
      <button>불러오기</button>
    </>
  );
}
