import { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Text() {
  const navigate = useNavigate();

  const [textFile, setTextFile] = useState([]);

  const handleChange = (e) => {
    const formData = new FormData();
    formData.append("file", e.target.value);
    console.log(e.target.value);
    const nextValue = e.target.value;
    setTextFile(nextValue);
  };

  const uploadText = async (e) => {
    const text = {
      textData: textFile,
    };

    fetch("http://localhost:5000/api/text", {
      method: "post",
      headers: {
        "content-type": "application/json",
        "cors-proxy-url": "http://localhost:5000/api/text",
      },
      body: JSON.stringify(text),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(text.textData);
        navigate("/api/text/send", { state: text.textData });
      });

    e.preventDefault();
  };

  return (
    <>
      <form onSubmit={uploadText} encType="multipart/form-data">
        <input name="datas" type="text" onChange={handleChange} />
        <button type="submit">업로드</button>
      </form>
    </>
  );
}
