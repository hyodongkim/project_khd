import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ImageShow() {
  const [imageShow, setImageShow] = useState([]);

  const sendRequest = async () => {
    const response = await axios.get("http://localhost:5000/api/images/show");
    console.log(response.data);
    setImageShow(response.data);
  };

  useEffect(() => {
    callApi()
      .then((res) => setImageShow({ customers: res }))
      .catch((err) => console.log(err));
    sendRequest();
  }, []);

  async function callApi() {
    const response = await fetch("/api/images/show", {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "text/plain",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    });
    const body = await response.json();
    return body;
  }

  return (
    <>
      <img src={imageShow} alt="이미지를 불러와야 합니다" />
      <button>불러오기</button>
    </>
  );
}
