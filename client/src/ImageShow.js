import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function ImageShow(props) {
  const [imageShow, setImageShow] = useState("");

  const { state } = useLocation();

  const sendRequest = async () => {
    const response = await axios.post("http://localhost:5000/api/images");
    setImageShow(response.data);
  };

  useEffect(() => {
    callApi()
      .then((res) => setImageShow(state))
      .catch((err) => console.log(err));
    sendRequest();
  }, []);

  async function callApi() {
    const image = {
      imageData: imageShow,
    };
    await fetch("http://localhost:5000/api/images/show", {
      method: "post",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(image),
    }).then((res) => {
      setImageShow(state.imageData);
      console.log(state.imageData);
    });
  }

  return (
    <>
      <img src={imageShow} alt="이미지를 불러와야 합니다" />
      <button onClick={callApi}>불러오기</button>
    </>
  );
}
