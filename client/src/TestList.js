import { useEffect, useState } from "react";
import Customer from "./components/Customer.js";
import axios from "axios";

export default function TestList() {
  const [state, setState] = useState([]);

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

  return (
    <div>
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

      <div>{window.localStorage.getItem("id")}</div>
    </div>
  );
}
