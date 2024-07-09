import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Image() {
  const inputRef = useRef();
  const [imageFile, setImageFile] = useState(null);
  console.log(imageFile);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const nextValue = e.target.files[0];
    setImageFile(nextValue);
  };

  async function imageUpload(formData) {
    await fetch(`http://localhost:5000/api/images`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json[0].filename);
        setImageFile(json[0].filename);
      });
  }

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("imageFile", imageFile);
    //이미지 파일을 formData로 json 형태로 만들어 전송하자
    await imageUpload(formData);
    //api
  };

  return (
    <>
      <form onSubmit={uploadImage} encType="multipart/form-data">
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          ref={inputRef}
          id="fileInput"
        />
        <button
          onClick={() => navigate(`/api/images/` + imageFile)}
          type="submit"
        >
          업로드
        </button>
      </form>
    </>
  );
}
