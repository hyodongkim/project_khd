import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import TestLogin1 from "./components/TestLogin1";

export default function TestLogin(props) {
  const navigate = useNavigate();

  return (
    <>
      <h2>로그인</h2>

      <TestLogin1 />

      <p>
        계정이 없으신가요?{" "}
        <button
          onClick={() => {
            navigate("/test_signin");
          }}
        >
          회원가입
        </button>
      </p>
    </>
  );
}
