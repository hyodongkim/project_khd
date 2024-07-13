import { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Image() {
  // const inputRef = useRef();
  const [imageFile, setImageFile] = useState([]);
  // const navigate = useNavigate();
  // async function imageUpload(formData) {
  //   const response = await fetch(`http://localhost:5000/api/images`, {
  //     method: "POST",
  //     body: formData,
  //   })
  //     .then((res) => res.text())
  //     .then((text) => {
  //       console.log(text);
  //       setImageFile(text);
  //     });
  // }
  // const handleChange = (e) => {
  //   const nextValue = e.target.files[0];
  //   setImageFile(nextValue);
  // };
  // const uploadImage = async () => {
  //   const formData = new FormData();
  //   formData.append("imageFile", imageFile);
  //   await imageUpload(formData);
  // };
  // return (
  //   <>
  //     <form
  //       action="/api/images/show"
  //       onSubmit={uploadImage}
  //       encType="multipart/form-data"
  //     >
  //       <input
  //         name="id"
  //         type="file"
  //         accept="image/*"
  //         onChange={handleChange}
  //         ref={inputRef}
  //         id="fileInput"
  //       />
  //       <button type="submit">업로드</button>
  //     </form>
  //   </>
  // );

  const handleChange = (e) => {
    console.log(e.target);
    console.log(e.target.value);
    const nextValue = e.target.value;
    setImageFile(nextValue);
  };
  useEffect(() => {
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
        console.log("json!!");
        console.log(json.imageData);
        setImageFile(json.imageData);
      });
  });

  const uploadImage = async (e) => {
    const image = {
      imageFile: imageFile,
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
        console.log("json!!");
        console.log(json.imageData);
        setImageFile(json.imageData);
      });
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
          onChange={handleChange}
          accept="image/*"
          id="fileInput"
        />
        <button type="submit">업로드</button>
      </form>
    </>
  );
}
