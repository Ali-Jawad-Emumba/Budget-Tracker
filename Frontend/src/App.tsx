import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  const postData = () => {
    fetch("http://localhost:3000/api/addUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set the correct content type
      },
      body: JSON.stringify({ username: "John Doe" }), // Stringify the object
    });
  };
  const deleteAll = () => {
    fetch("http://localhost:3000/api/deleteAll");
  };
  const getData = async () => {
    const fetchFn = await fetch("http://localhost:3000/api/getAll");
    const response = await fetchFn.json();
    const data = response;
    console.log(data);
  };

  return (
    <>
      <button onClick={postData}>Post</button>
      <button onClick={getData}>Get</button>
      <button onClick={deleteAll}>Clear</button>
    </>
  );
}

export default App;
