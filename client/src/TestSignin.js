import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function TestSignin(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [mode, setMode] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userData = {
      username: username,
      password: password,
      password2: password2,
    };
    fetch("http://localhost:5000/test_signin", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json[0].isSignin);
        if (json[0].isSignin === "True") {
          setMode("SIGNIN");
        } else {
          setMode("Sorry");
        }
      });
  });

  const submitValue = async (e) => {
    const userData = {
      username: username,
      password: password,
      password2: password2,
    };
    fetch("http://localhost:5000/test_signin", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userData),
    });
  };

  return (
    <>
      <h2>회원가입</h2>

      <form onSubmit={submitValue}>
        <p>
          <input
            name="username"
            type="text"
            autoComplete="off"
            placeholder="아이디"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
        </p>
        <p>
          <input
            autoComplete="off"
            name="password"
            type="password"
            placeholder="비밀번호"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </p>
        <p>
          <input
            name="password2"
            type="password"
            autoComplete="off"
            placeholder="비밀번호 확인"
            onChange={(event) => {
              setPassword2(event.target.value);
            }}
          />
        </p>

        <p>
          <button
            type="submit"
            onClick={() => {
              if (mode == "SIGNIN") {
                navigate("/test_login");
              } else {
                navigate("/test_signin");
              }
            }}
          >
            회원가입
          </button>
        </p>
      </form>

      <p>
        첫화면으로 돌아가기{" "}
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          로그인
        </button>
      </p>
    </>
  );
}
