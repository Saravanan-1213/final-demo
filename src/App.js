import { useEffect, useState } from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <PhoneList />
    </div>
  );
}
function PhoneList() {
  const [mobiles, setMobiles] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/mobiles")
      .then((data) => data.json())
      .then((mbs) => setMobiles(mbs));
  }, []);

  return (
    <div className="phone-list-container">
      {mobiles.map((mb, index) => (
        <Phone key={index} mobile={mb} />
      ))}
    </div>
  );
}

// object destructring
function Phone({ mobile }) {
  // object destructring
  // const mobile = {
  //   model: "OnePlus 9 5G",
  //   img: "https://m.media-amazon.com/images/I/61fy+u9uqPL._SX679_.jpg",
  //   company: "Oneplus",
  // };
  return (
    <div className="phone-container">
      <img src={mobile.img} alt={mobile.model} className="phone-picture" />
      <h2 className="phone-name">{mobile.model}</h2>
      <p className="phone-company">{mobile.company}</p>
    </div>
  );
}
export default App;
