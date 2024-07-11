import { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Image() {
  const inputRef = useRef();
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`http://localhost:5000/api/images`, {
        method: "POST",
      }).then((res) => {
        setImageFile(res);
        console.log(res);
      });
      fetchData();
    }
  }, []);

  async function imageUpload(formData) {
    await fetch(`http://localhost:5000/api/images`, {
      method: "POST",
      body: formData,
    }).then((res) => {
      setImageFile(res);
      console.log(res);
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
      <form
        action="/api/images"
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
        <img src={imageFile} />
        <button type="submit">업로드</button>
      </form>

      <button>불러오기</button>
    </>
  );
}
