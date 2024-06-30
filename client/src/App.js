import TestList from "./TestList";
import TestInsert from "./TestInsert";
import TestUpdate from "./TestUpdate";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<>기모링</>} />
        <Route path="/test_list" element={<TestList />} />
        <Route path="/test_insert" element={<TestInsert />} />
        <Route path="/test_update/:id" element={<TestUpdate />} />
      </Routes>
    </>
  );
}

export default App;
