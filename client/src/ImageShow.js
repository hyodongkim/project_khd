import { useState } from "react";

export default function ImageShow() {
  const [imageShow, setImageShow] = useState(null);

  const loadImage = async () => {
    const imageInfo = await getImage(2);
    //처음 넣은 이미지의 아이디 1번

    setImageShow(imageInfo.imageFile);
  };

  async function getImage(id) {
    const res = await fetch(`http://localhost:5000/api/images/${id}`);
    const body = await res.json();

    return body;
  }

  return (
    <>
      <img src={imageShow} alt="이미지를 불러와야 합니다" />
      <button onClick={loadImage}>불러오기</button>
    </>
  );
}
