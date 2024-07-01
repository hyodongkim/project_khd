import { useEffect, useState } from "react";
import Customer from "./components/Customer.js";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function TestUpdate(props) {
  const [state, setState] = useState([]);
  const [list, setList] = useState({
    id: 0,
    name: "",
    birthday: "",
    gender: "",
    job: "",
  });

  // const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [job, setJob] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

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

  async function updateCustomer() {
    const url = "http://localhost:5000/test_update";
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
    formData.append("id", id);
    formData.append("name", name);
    formData.append("birthday", birthday);
    formData.append("gender", gender);
    formData.append("job", job);

    console.log("테스트:" + id);
    return axios.post(url, formData, config);
  }

  function handleFormSubmit() {
    updateCustomer()
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
    setName(e.target.value);
  }

  function handleBirthdayChange(e) {
    setBirthday(e.target.value);
  }

  function handleGenderChange(e) {
    setGender(e.target.value);
  }

  function handleJobChange(e) {
    setJob(e.target.value);
  }

  return (
    <>
      {state
        ? state
            .filter((update) => update.id == id)
            .map((c) => {
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

      <form onSubmit={handleFormSubmit}>
        <div>번호 :</div>
        <input
          type="text"
          name="id"
          value={id}
          onChange={handleIdChange}
        ></input>
        <br />

        <div>이름 :</div>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleNameChange}
        ></input>
        <br />
        <div>생일 :</div>
        <input
          type="text"
          name="birthday"
          value={birthday}
          onChange={handleBirthdayChange}
        ></input>
        <br />
        <div>성별 :</div>
        <input
          type="text"
          name="gender"
          value={gender}
          onChange={handleGenderChange}
        ></input>
        <br />
        <div>직업 :</div>
        <input
          type="text"
          name="job"
          value={job}
          onChange={handleJobChange}
        ></input>
        <br />
        <button type="submit">갱신</button>
      </form>

      <button onClick={() => navigate(`/test_delete/${id}`)}>삭제</button>

      <br />
    </>
  );
}
