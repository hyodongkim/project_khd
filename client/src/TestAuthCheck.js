import { useState, useEffect } from "react";
import Login from "./TestLogin";
import Signin from "./TestSignin";
import { useNavigate, useParams } from "react-router-dom";

export default function TestAuthCheck() {
  const [mode, setMode] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/test_authCheck")
      .then((res) => res.json())
      .then((json) => {
        if (json.isLogin === "True") {
          setMode("WELCOME");
        } else {
          setMode("LOGIN");
        }
      });
  }, []);

  let content = null;

  if (mode === "LOGIN") {
    content = <Login setMode={setMode}></Login>;
  } else if (mode === "SIGNIN") {
    content = <Signin setMode={setMode}></Signin>;
  } else if (mode === "WELCOME") {
    content = (
      <>
        <h2>메인 페이지에 오신 것을 환영합니다</h2>
        <p>로그인에 성공하셨습니다.</p>
        <a href="/logout">로그아웃</a>
      </>
    );
  }

  return (
    <>
      <div className="background">{content}</div>
    </>
  );
}
