import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function TextSend(props) {
  const [imageShow, setImageShow] = useState("");

  const { state } = useLocation();

  const sendRequest = async () => {
    const response = await axios.post("http://localhost:5000/api/text");
    setImageShow(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    callApi()
      .then((res) => setImageShow(state))
      .catch((err) => console.log(err));
    sendRequest();
  }, []);

  async function callApi() {
    const image = {
      imageData: state,
    };
    await fetch("http://localhost:5000/api/text/send", {
      method: "post",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        "cors-proxy-url": "http://localhost:5000/api/text/send",
      },
      body: JSON.stringify(image),
    })
      .then((res) => res.json())
      .then((json) => {
        setImageShow(json.sendFile);
        console.log(json.sendFile);
      });
  }

  return (
    <>
      <input type="text" value={imageShow} readOnly />
      <button onClick={callApi}>불러오기</button>
    </>
  );
}
