// import { useState, useRef, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// export default function TestLogin1() {
//   const [id, setId] = useState("");
//   const [password, setPassword] = useState("");
//   const [mode, setMode] = useState(0);
//   const navigate = useNavigate();

//   const idRef = useRef();
//   const pwRef = useRef();

//   // const idValue_insert = useCallback(
//   //   (e) => {
//   //     setId(e.target.value);
//   //     window.localStorage.setItem("id", id);
//   //   },
//   //   [id]
//   // );

//   // const pwValue_insert = useCallback(
//   //   (e) => {
//   //     setPassword(e.target.value);
//   //     window.localStorage.setItem("pw", password);
//   //     console.log("호로롤로테스트");
//   //   },
//   //   [password]
//   // );
//   function idValue_insert(e) {
//     setId(e.target.value);
//     window.localStorage.setItem("id", id);
//   }
//   function pwValue_insert(e) {
//     setPassword(e.target.value);
//     window.localStorage.setItem("pw", password);
//   }
//   useEffect(() => {
//     window.localStorage.setItem("pw", password);
//     window.localStorage.setItem("id", id);
//   });
//   const submitValue = (e) => {
//     const userSession = {
//       // id: idRef.current.value,
//       // pw: pwRef.current.value,
//       id: id,
//       pw: password,
//     };

//     fetch("http://localhost:5000/test_login", {
//       method: "post",
//       headers: {
//         "content-type": "application/json",
//       },
//       body: JSON.stringify(userSession),
//     }).then((res) => {
//       setMode(res.body.data);
//     });
//   };
//   return (
//     <form onSubmit={submitValue}>
//       <p>
//         <input
//           className="login"
//           type="text"
//           name="username"
//           ref={idRef}
//           placeholder="아이디"
//           onChange={idValue_insert}
//         />
//       </p>
//       <p>
//         <input
//           ref={pwRef}
//           className="login"
//           type="password"
//           name="password"
//           placeholder="비밀번호"
//           autoComplete="off"
//           onChange={pwValue_insert}
//         />
//       </p>

//       <p>
//         <button
//           onClick={() => {
//             // if (mode !== 1) {
//             navigate("/test_login");
//             // } else {
//             //   navigate("/test_list");
//             // }
//           }}
//         >
//           테스트용 로그인
//         </button>
//       </p>
//     </form>
//   );
// }
