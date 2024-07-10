import { useRef, useState } from "react";

export default function Image() {
  const inputRef = useRef();
  const [imageFile, setImageFile] = useState(null);

  async function imageUpload(formData) {
    await fetch(`http://localhost:5000/api/images`, {
      method: "POST",
      body: formData,
    });
  }

  const handleChange = (e) => {
    const nextValue = e.target.files[0];
    setImageFile(nextValue);
  };
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
        <button type="submit">업로드</button>
      </form>
    </>
  );
}
