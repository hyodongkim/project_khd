import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ImageShow() {
  const [imageShow, setImageShow] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const userData = {
      id: id,
    };
    async function fetchData() {
      const response = await fetch("http://localhost:5000/api/images/show", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(userData),
      }).then((res) => {
        setImageShow(res);
        console.log(res);
        console.log(imageShow);
      });
      fetchData();
    }
  }, []);

  return (
    <>
      <img src={imageShow} alt="이미지를 불러와야 합니다" />
      <button>불러오기</button>
    </>
  );
}
