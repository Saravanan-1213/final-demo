import Button from "@mui/material/Button";
import { checkAuth, logout } from "./App";

// object destructring

const ROLE_ID = {
  ADMIN: "0",
  USER: "1",
};
export function Phone({ mobile, getMobiles }) {
  const roleId = localStorage.getItem("roleId");

  const deleteMobile = (mobileId) => {
    fetch(`http://localhost:4000/mobiles/${mobileId}`, {
      method: "DELETE",
      headers: {
        "x-auth-token": localStorage.getItem("token"),
        roleId: roleId,
      },
    })
      .then((data) => checkAuth(data))
      .then(() => getMobiles())
      .catch((err) => logout());
  };

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

      {roleId == ROLE_ID.ADMIN ? (
        <Button
          onClick={() => deleteMobile(mobile._id)}
          sx={{ width: "100%" }}
          color={"error"}
          variant="contained"
        >
          Delete
        </Button>
      ) : null}
    </div>
  );
}
