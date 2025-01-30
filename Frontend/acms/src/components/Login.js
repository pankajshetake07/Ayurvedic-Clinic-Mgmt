// import { useReducer, useState } from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { login } from "./slice";
// import '../components/Login.css'

// export default function Login() {
//   const init = {
//     uname: "",
//     password: ""
//   };

//   const reducer = (state, action) => {
//     switch (action.type) {
//       case "update":
//         return { ...state, [action.fld]: action.val };
//       case "reset":
//         return init;
//       default:
//         return state;
//     }
//   };

//   const [info, dispatch] = useReducer(reducer, init);
//   const [msg, setMsg] = useState("");
//   const navigate = useNavigate();
//   const reduxAction = useDispatch();

//   const sendData = (e) => {
//     e.preventDefault();
//     const reqOptions = {
//       method: "POST",
//       headers: { "content-type": "application/json" },
//       body: JSON.stringify(info)
//     };

//     fetch("http://localhost:8081/login", reqOptions)
//       .then((resp) => {
//         console.log("Response status:", resp.status);
//         return resp.text(); // Parse as text first
//       })
//       .then((text) => {
//         console.log("Raw response text:", text);
//         return text.length ? JSON.parse(text) : {};
//       })
//       .then((obj) => {
//         console.log("Parsed response object:", obj);
//         if (Object.keys(obj).length === 0) {
//           setMsg("Wrong username and password");
//         } else {
//           reduxAction(login());

//           if (obj.role.rid === 3) {
//             navigate("/admin_home");
//           } else if (obj.role.rid === 1) {
//             navigate("/doctor_home");
//           } else if (obj.role.rid === 2) {
//             navigate("/assistance_doctor_home");
//           } else if (obj.role.rid === 4) {
//             navigate("/receptionist_home");
//           } else {
//             navigate("/patient_home");
//           }
//         }
//       })
//       .catch((error) => console.error("Error:", error));
//   };

//   return (
//     <div className="login-container d-flex justify-content-center align-items-center">
//       <div className="card p-4 shadow-lg">
//         <h1 className="text-center mb-4">Login</h1>
//         <form>
//           <div className="mb-3">
//             <label htmlFor="uid" className="form-label">
//               Enter Username:
//             </label>
//             <input
//               type="text"
//               className="form-control"
//               id="uname"
//               name="uname"
//               value={info.uname}
//               onChange={(e) => {
//                 dispatch({ type: "update", fld: "uname", val: e.target.value });
//               }}
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="password" className="form-label">
//               Enter Password:
//             </label>
//             <input
//               type="password"
//               className="form-control"
//               id="password"
//               name="password"
//               value={info.password}
//               onChange={(e) => {
//                 dispatch({ type: "update", fld: "password", val: e.target.value });
//               }}
//             />
//           </div>
//           <div className="d-flex justify-content-between">
//             <button
//               type="submit"
//               className="btn btn-primary"
//               onClick={(e) => {
//                 sendData(e);
//               }}
//             >
//               LOGIN
//             </button>
//             <button
//               type="reset"
//               className="btn btn-secondary"
//               onClick={() => {
//                 dispatch({ type: "reset" });
//               }}
//             >
//               CLEAR
//             </button>
//           </div>
//         </form>
//         <p className="text-danger text-center mt-3">{msg}</p>
//       </div>
//     </div>
//   );
// }

import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import background from "./ayurvedic.jpg";

export default function Login() {
  const init = {
    uname: "",
    password: "",
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "update":
        return { ...state, [action.fld]: action.val };
      case "reset":
        return init;
      default:
        return state;
    }
  };

  const [info, dispatch] = useReducer(reducer, init);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const sendData = (e) => {
    e.preventDefault();
    const reqOptions = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(info),
    };

    fetch("http://localhost:8081/login", reqOptions)
      .then((resp) => {
        console.log("Response status:", resp.status);
        return resp.text();
      })
      .then((text) => {
        console.log("Raw response text:", text);
        return text.length ? JSON.parse(text) : {};
      })
      .then((obj) => {
        console.log("Parsed response object:", obj);
        if (Object.keys(obj).length === 0) {
          setMsg("Wrong username and password");
        } else {
          if (obj.role.rid === 3) {
            navigate("/admin_home");
          } else if (obj.role.rid === 1) {
            navigate("/doctor_home");
          } else if (obj.role.rid === 2) {
            navigate("/assistance_doctor_home");
          } else if (obj.role.rid === 4) {
            navigate("/receptionist_home");
          } else {
            navigate("/patient_home");
          }
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="card p-4 shadow" style={{ width: "400px", borderRadius: "15px" }}>
        <h1 className="card-title text-center mb-4">Login</h1>
        <form>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="uname"
              name="uname"
              placeholder="Enter Username"
              value={info.uname}
              onChange={(e) => {
                dispatch({ type: "update", fld: "uname", val: e.target.value });
              }}
            />
            <label htmlFor="uname">Username</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Enter Password"
              value={info.password}
              onChange={(e) => {
                dispatch({ type: "update", fld: "password", val: e.target.value });
              }}
            />
            <label htmlFor="password">Password</label>
          </div>
          <div className="d-grid gap-2">
            <button
              type="submit"
              className="btn btn-primary btn-lg"
              onClick={(e) => {
                sendData(e);
              }}
            >
              LOGIN
            </button>
            <button
              type="reset"
              className="btn btn-secondary btn-lg"
              onClick={() => {
                dispatch({ type: "reset" });
              }}
            >
              CLEAR
            </button>
          </div>
        </form>
        <p className="mt-3 text-center">{JSON.stringify(info)}</p>
        <p className="text-danger text-center">{msg}</p>
      </div>
    </div>
  );
}

