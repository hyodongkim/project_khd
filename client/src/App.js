import TestList from "./TestList";
import TestInsert from "./TestInsert";
import TestUpdate from "./TestUpdate";
import TestDelete from "./TestDelete";
import TestLogin from "./TestLogin";
import TestSignin from "./TestSignin";
import Text from "./Text";
import TextSend from "./TextSend";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<>기모링</>} />
        <Route path="/test_list" element={<TestList />} />
        <Route path="/test_insert" element={<TestInsert />} />
        <Route path="/test_update/:id" element={<TestUpdate />} />
        <Route path="/test_delete/:id" element={<TestDelete />} />
        <Route path="/test_login" element={<TestLogin />} />
        <Route path="/test_signin" element={<TestSignin />} />
        <Route path="/api/text" element={<Text />} />
        <Route path="/api/text/send" element={<TextSend />} />
      </Routes>
    </>
  );
}

export default App;
