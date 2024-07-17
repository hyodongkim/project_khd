import { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Image() {
  const navigate = useNavigate();

  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0].name);
    console.log(e.target.files[0].name);
    const nextValue = e.target.files[0].name;
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
        console.log(image.imageData);
        navigate("/api/images/show", { state: image.imageData });
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
