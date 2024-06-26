import { useEffect, useState } from "react";
import Customer from "./components/Customer.js";
import axios from "axios";

export default function App() {
  const [state, setState] = useState([]);

  const sendRequest = async () => {
    const response = await axios.get("http://localhost:5000/api/customers");
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
    const response = await fetch("/api/customers", {
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

  // useEffect(() => {
  //   fetch("/api/customers", {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //     },
  //   })
  //     .then((response) => response.json())
  //     .catch((error) => console.error("fetch error! ::: ", error));
  // }, []);
  return (
    <div>
      {state
        ? state.map((c) => {
            return (
              <Customer
                id={c.id}
                name={c.name}
                birthday={c.birthday}
                gender={c.gender}
                job={c.job}
              />
            );
          })
        : ""}
    </div>
  );
}
