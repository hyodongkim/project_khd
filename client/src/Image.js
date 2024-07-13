import { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Image() {
  const inputRef = useRef();
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();

  // useEffect(() => {
  //   async function fetchData() {
  //     const response = await fetch(`http://localhost:5000/api/images`, {
  //       method: "POST",
  //     })
  //       .then((res) => res.json())
  //       .then((json) => {
  //         setImageFile(json);
  //       });
  //   }
  //   fetchData();
  // }, []);

  async function imageUpload(formData) {
    const response = await fetch(`http://localhost:5000/api/images`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((json) => {
        setImageFile(json);
      });
  }

  const handleChange = (e) => {
    const nextValue = e.target.files[0];
    setImageFile(nextValue);
  };
  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("imageFile", imageFile);
    await imageUpload(formData);
  };

  return (
    <>
      <form
        action="/api/images/show"
        onSubmit={uploadImage}
        encType="multipart/form-data"
      >
        <input
          name="id"
          type="file"
          accept="image/*"
          onChange={handleChange}
          ref={inputRef}
          id="fileInput"
        />
        <button type="submit">업로드</button>
      </form>
    </>
  );
}
