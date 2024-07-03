import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function TestLogin(props) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("");
  const navigate = useNavigate();

  const idRef = useRef();
  const pwRef = useRef();

  return (
    <>
      <h2>로그인</h2>

      <form>
        <p>
          <input
            className="login"
            type="text"
            name="username"
            ref={idRef}
            placeholder="아이디"
            onChange={(event) => {
              setId(event.target.value);
              window.sessionStorage.setItem("id", id);
            }}
          />
        </p>
        <p>
          <input
            ref={pwRef}
            className="login"
            type="password"
            name="password"
            placeholder="비밀번호"
            autoComplete="off"
            onChange={(event) => {
              setPassword(event.target.value);
              window.sessionStorage.setItem("pw", password);
            }}
          />
        </p>

        <p>
          <button
            onClick={() => {
              const userSession = {
                id: idRef.current.value,
                pw: pwRef.current.value,
              };
              fetch("http://localhost:5000/test_login", {
                method: "post",
                headers: {
                  "content-type": "application/json",
                },
                body: JSON.stringify(userSession),
              }).then((res) => {});
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
            navigate("/");
          }}
        >
          회원가입
        </button>
      </p>
    </>
  );
}
