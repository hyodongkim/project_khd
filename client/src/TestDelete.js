import { useEffect, useState } from "react";
import Customer1 from "./components/Customer1.js";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function TestDelete(props) {
  const [state, setState] = useState([]);
  const [list, setList] = useState({
    id: 0,
  });

  // const [name, setName] = useState("");
  // const [birthday, setBirthday] = useState(0);
  // const [gender, setGender] = useState("");
  // const [job, setJob] = useState("");

  const { id } = useParams();

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

  async function deleteCustomer() {
    const url = `http://localhost:5000/test_delete/${id}`;
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
    // formData.append("name", list.name);
    // formData.append("birthday", list.birthday);
    // formData.append("gender", list.gender);
    // formData.append("job", list.job);

    return axios.post(url, formData, config);
  }
  const sendRequest1 = async () => {
    const response = await axios.post(`/test_delete/${id}`);
    console.log(response.data);
    setState(response.data);
  };

  function handleFormSubmit(e) {
    deleteCustomer()
      .then((res) =>
        setList({
          id: res.data,
        })
      )
      .catch((err) => console.log(err));
    sendRequest1();
  }

  function handleIdChange(e) {
    setList(e.target.value);
  }

  return (
    <>
      {state
        ? state
            .filter((f) => f.id == id)
            .map((c) => {
              return (
                <Customer1
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
        <div>번호 :</div>
        <input
          type="text"
          name="id"
          value={id}
          onChange={handleIdChange}
        ></input>
        <br />

        <button type="submit">삭제</button>
      </form>
    </>
  );
}
