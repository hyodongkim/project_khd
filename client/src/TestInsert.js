import { useEffect, useState } from "react";
import Customer from "./components/Customer.js";
import axios from "axios";

export default function TestInsert() {
  const [state, setState] = useState([]);
  const [list, setList] = useState({
    id: 0,
    name: "",
    birthday: "",
    gender: "",
    job: "",
  });

  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState(0);
  const [gender, setGender] = useState("");
  const [job, setJob] = useState("");

  const sendRequest = async () => {
    const response = await axios.get("http://localhost:5000/test_list");
    console.log(response.data);
    setState(response.data);
  };

  useEffect(() => {
    callApi()
      .then((res) => setState({ customers: res }))
      .catch((err) => console.log(err));
    sendRequest();
  }, []);

  async function callApi() {
    const response = await fetch("/test_list", {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    });
    const body = await response.json();
    return body;
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////

  async function addCustomer() {
    const url = "http://localhost:5000/test_insert";
    const config = {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    };
    const formData = new FormData();
    formData.append("id", list.id);
    formData.append("name", list.name);
    formData.append("birthday", list.birthday);
    formData.append("gender", list.gender);
    formData.append("job", list.job);

    console.log("테스트:" + id);
    return axios.post(url, formData, config);
  }

  function handleFormSubmit() {
    addCustomer()
      .then((res) =>
        setList({
          id: list.id,
          name: list.name,
          birthday: list.birthday,
          gender: list.gender,
          job: list.job,
        })
      )
      .catch((err) => console.log(err));
  }

  function handleIdChange(e) {
    setList({
      ...list,
      [e.target.name]: e.target.value,
    });
  }

  function handleNameChange(e) {
    setList({
      ...list,
      [e.target.name]: e.target.value,
    });
  }

  function handleBirthdayChange(e) {
    setList({
      ...list,
      [e.target.name]: e.target.value,
    });
  }

  function handleGenderChange(e) {
    setList({
      ...list,
      [e.target.name]: e.target.value,
    });
  }

  function handleJobChange(e) {
    setList({
      ...list,
      [e.target.name]: e.target.value,
    });
  }

  function handleTotalChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    nextState[e.target.birthday] = e.target.value;
    nextState[e.target.gender] = e.target.value;
    nextState[e.target.job] = e.target.value;

    setList(nextState);
  }

  return (
    <>
      {state
        ? state.map((c) => {
            return (
              <Customer
                key={c.id}
                id={c.id}
                name={c.name}
                birthday={c.birthday}
                gender={c.gender}
                job={c.job}
              />
            );
          })
        : ""}

      <br />

      <form onSubmit={handleFormSubmit}>
        {/* <div>번호 :</div>
        <input
          type="text"
          name="id"
          value={list.id}
          onChange={handleIdChange}
        ></input>
        <br /> */}
        <div>이름 :</div>
        <input
          type="text"
          name="name"
          value={list.name}
          onChange={handleNameChange}
        ></input>
        <br />
        <div>생일 :</div>
        <input
          type="text"
          name="birthday"
          value={list.birthday}
          onChange={handleBirthdayChange}
        ></input>
        <br />
        <div>성별 :</div>
        <input
          type="text"
          name="gender"
          value={list.gender}
          onChange={handleGenderChange}
        ></input>
        <br />
        <div>직업 :</div>
        <input
          type="text"
          name="job"
          value={list.job}
          onChange={handleJobChange}
        ></input>
        <br />
        <button type="submit">삽입</button>
      </form>
    </>
  );
}
