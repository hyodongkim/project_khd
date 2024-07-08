import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function TestLogin(props) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("");
  const navigate = useNavigate();

  const idRef = useRef();
  const pwRef = useRef();

  function idValue_insert(e) {
    setId(e.target.value);
    window.localStorage.setItem("id", id);
  }
  function pwValue_insert(e) {
    setPassword(e.target.value);
    window.localStorage.setItem("pw", password);
  }
  useEffect(() => {
    window.localStorage.setItem("pw", password);
    window.localStorage.setItem("id", id);
  });

  useEffect(() => {
    const userSession = {
      // id: idRef.current.value,
      // pw: pwRef.current.value,
      id: id,
      pw: password,
    };

    fetch("http://localhost:5000/test_login", {
      method: "post",
      headers: {
        "content-type": "application/json",
        "cors-proxy-url": "http://localhost:5000/test_login",
      },
      body: JSON.stringify(userSession),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json[0].isLogin === "True") {
          setMode("LOGIN");
        } else {
          setMode("WELCOME");
        }
      });
  });

  const submitValue = async (e) => {
    const userSession = {
      // id: idRef.current.value,
      // pw: pwRef.current.value,
      id: id,
      pw: password,
    };

    fetch("http://localhost:5000/test_login", {
      method: "post",
      headers: {
        "content-type": "application/json",
        "cors-proxy-url": "http://localhost:5000/test_login",
      },
      body: JSON.stringify(userSession),
    });
    // .then((res) => res.json())
    // .then((json) => {
    //   if (json[0].isLogin === "True") {
    //     setMode("LOGIN");
    //   } else {
    //     setMode("WELCOME");
    //   }
    // });
  };

  return (
    <>
      <h2>로그인</h2>

      <form onSubmit={submitValue}>
        <p>
          <input
            className="login"
            type="text"
            name="username"
            ref={idRef}
            placeholder="아이디"
            onChange={idValue_insert}
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
            onChange={pwValue_insert}
          />
        </p>

        <p>
          <button
            type="submit"
            onClick={() => {
              if (mode != "LOGIN") {
                navigate("/test_login");
              } else {
                navigate("/test_list");
              }
            }}
          >
            테스트용 로그인
          </button>
        </p>
      </form>
      <p>
        계정이 없으신가요? <button>회원가입</button>
      </p>
    </>
  );
}
