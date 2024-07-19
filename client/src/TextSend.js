import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import TextBring from "./components/TextBring";
import axios from "axios";

export default function TextSend(props) {
  const [textShow, setTextShow] = useState("");

  const { state } = useLocation();

  // const sendRequest = async () => {
  //   const response = await axios.post("http://localhost:5000/api/text");
  //   setTextShow(response.data);
  //   console.log(response.data);
  // };

  useEffect(() => {
    const text = {
      textData: state,
    };
    fetch("http://localhost:5000/api/text/send", {
      method: "post",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        "cors-proxy-url": "http://localhost:5000/api/text/send",
      },
      body: JSON.stringify(text),
    })
      .then((res) => res.json())
      .then((json) => {
        setTextShow(json.textData);
        console.log(json.textData);
      });
  }, []);

  useEffect(() => {
    callApi()
      .then((res) => setTextShow(state))
      .catch((err) => console.log(err));
    // sendRequest();
  }, []);

  async function callApi() {
    const text = {
      textData: state,
    };
    await fetch("http://localhost:5000/api/text/send", {
      method: "post",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        "cors-proxy-url": "http://localhost:5000/api/text/send",
      },
      body: JSON.stringify(text),
    })
      .then((res) => res.json())
      .then((json) => {
        setTextShow(json.textData);
        console.log(json.textData);
      });
  }

  return (
    <div>
      <div>{textShow}</div>
      <input type="text" value={textShow} readOnly />
      <button onClick={callApi}>(혹시나 못부를까봐 만든)불러오기</button>
    </div>
  );
}
