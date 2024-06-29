import TestList from "./TestList";
import TestInsert from "./TestInsert";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<>기모링</>} />
        <Route path="/test_list" element={<TestList />} />
        <Route path="/test_insert" element={<TestInsert />} />
      </Routes>
    </>
  );
}

export default App;
