import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <header> header </header>

      <div className="container"> </div>

      <footer>
        <h1> ola </h1>
      </footer>
    </>
  );
}

export default App;
