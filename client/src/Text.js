import { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Text() {
  const navigate = useNavigate();

  const [imageFile, setImageFile] = useState([]);

  const handleChange = (e) => {
    const formData = new FormData();
    formData.append("file", e.target.value);
    console.log(e.target.value);
    const nextValue = e.target.value;
    setImageFile(nextValue);
  };

  const uploadImage = async (e) => {
    const image = {
      imageData: imageFile,
    };

    fetch("http://localhost:5000/api/text", {
      method: "post",
      headers: {
        "content-type": "application/json",
        "cors-proxy-url": "http://localhost:5000/api/text",
      },
      body: JSON.stringify(image),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(image.imageData);
        navigate("/api/text/send", { state: image.imageData });
      });

    e.preventDefault();
  };

  return (
    <>
      <form onSubmit={uploadImage} encType="multipart/form-data">
        <input name="id" type="text" onChange={handleChange} />
        <button type="submit">업로드</button>
      </form>
    </>
  );
}
