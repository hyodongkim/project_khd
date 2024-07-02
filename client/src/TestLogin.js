import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function TestLogin(props) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("");
  const navigate = useNavigate();

  return (
    <>
      <h2>로그인</h2>

      <form>
        <p>
          <input
            className="login"
            type="text"
            name="username"
            placeholder="아이디"
            onChange={(event) => {
              setId(event.target.value);
            }}
          />
        </p>
        <p>
          <input
            className="login"
            type="password"
            name="password"
            placeholder="비밀번호"
            autoComplete="off"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </p>

        <p>
          <button
            onClick={() => {
              const userData = {
                userId: id,
                userPassword: password,
              };
              fetch("http://localhost:5000/test_login", {
                method: "post",
                headers: {
                  "content-type": "application/json",
                },
                body: JSON.stringify(userData),
              })
                .then((res) => res.json())
                .then((json) => {
                  if (json.isLogin === "True") {
                    setMode("WELCOME");
                  } else {
                    alert(json.isLogin);
                  }
                });
            }}
          >
            테스트용 로그인
          </button>
        </p>
      </form>

      <p>
        계정이 없으신가요?{" "}
        <button
          onClick={() => {
            setMode("SIGNIN");
          }}
        >
          회원가입
        </button>
      </p>
    </>
  );
}
