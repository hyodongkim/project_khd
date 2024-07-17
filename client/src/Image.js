import { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Image() {
  const navigate = useNavigate();

  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    console.log(e.target.value);
    const nextValue = e.target.value;
    setImageFile(nextValue);
  };

  const uploadImage = async (e) => {
    const image = {
      imageData: imageFile,
    };

    fetch("http://localhost:5000/api/images", {
      method: "post",
      headers: {
        "content-type": "application/json",
        "cors-proxy-url": "http://localhost:5000/api/images",
      },
      body: JSON.stringify(image),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(image);
        navigate("/api/images/show", { state: image });
      });

    e.preventDefault();
  };

  return (
    <>
      <form onSubmit={uploadImage} encType="multipart/form-data">
        <input
          name="id"
          type="file"
          onChange={handleChange}
          accept="image/*"
          id="fileInput"
        />
        <button type="submit">업로드</button>
      </form>
    </>
  );
}
