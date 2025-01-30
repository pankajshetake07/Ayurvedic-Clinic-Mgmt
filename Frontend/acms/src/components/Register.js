import { useReducer, useState } from "react"
import { Navigate } from "react-router-dom"
// import { useDispatch } from "react-redux"
// import { useNavigate } from "react-router-dom"
// import { login } from "./slice"

export default function Register() {

    const init = {
        uname: "",
        password: "",
        fname: "",
        lname: "",
        dob: "",
        address: "",
        gender: "",
    }

    const reducer = (state, action) => {
        switch (action.type) {
            case 'update':
                return { ...state, [action.fld]: action.val }
            case 'reset':
                return init
        }
    }

    const [info, dispatch] = useReducer(reducer, init);
    const [msg, setMsg] = useState("");
    // const navigate = useNavigate();
    // const reduxAction = useDispatch();

    const sendData = (e) => {
        e.preventDefault();
        const reqOptions = {
            method: "POST",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(info)
        }
        fetch("http://localhost:8081/register", reqOptions)
            .then(resp => {
                if (resp.ok)
                    return resp.json();
                else
                    throw new Error("Server error");
            })
            .then(obj => {
                alert("Registration successfu. Try Login")
                Navigate('/')
            })
        //.catch((error) => alert("server error. Try later"))

    }

    return (
        <div>
            <h1>Register</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="uid" className="form-label">Enter Username :</label>
                    <input type="text" className="form-control" id="uname" name="uname" value={info.uname}
                        onChange={(e) => { dispatch({ type: 'update', fld: 'uname', val: e.target.value }) }} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Enter Password :</label>
                    <input type="password" className="form-control" id="password" name="password" value={info.password}
                        onChange={(e) => { dispatch({ type: 'update', fld: 'password', val: e.target.value }) }} />
                </div>

                <div className="mb-3">
                    <label htmlFor="fname" className="form-label">Enter First Name :</label>
                    <input type="text" className="form-control" id="fname" name="fname" value={info.fname}
                        onChange={(e) => { dispatch({ type: 'update', fld: 'fname', val: e.target.value }) }} />
                </div>


                <div className="mb-3">
                    <label htmlFor="lname" className="form-label">Enter Last Name :</label>
                    <input type="text" className="form-control" id="lname" name="lname" value={info.lname}
                        onChange={(e) => { dispatch({ type: 'update', fld: 'lname', val: e.target.value }) }} />
                </div>

                <div className="mb-3">
                    <label htmlFor="dob" className="form-label">Enter Date of Birth :</label>
                    <input type="date" className="form-control" id="dob" name="dob" value={info.dob}
                        onChange={(e) => { dispatch({ type: 'update', fld: 'dob', val: e.target.value }) }} />
                </div>

                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Enter Address :</label>
                    <input type="text" className="form-control" id="address" name="address" value={info.address}
                        onChange={(e) => { dispatch({ type: 'update', fld: 'address', val: e.target.value }) }} />
                </div>

                <div className="mb-3">
                    <label htmlFor="gender" className="form-label">Enter Gender :</label>
                    <input type="text" className="form-control" id="gender" name="gender" value={info.gender}
                        onChange={(e) => { dispatch({ type: 'update', fld: 'gender', val: e.target.value }) }} />
                </div>

                {/* <div className="mb-3">
                    <label htmlFor="status" className="form-label">Enter status :</label>
                    <input type="text" className="form-control" id="status" name="status" value={info.status}
                        onChange={(e) => { dispatch({ type: 'update', fld: 'status', val: e.target.value }) }} />
                </div> */}

                <button type="submit" className="btn btn-primary mb-3" onClick={(e) => { sendData(e) }}>LOGIN</button>
                <button type="reset" className="btn btn-primary mb-3" onClick={() => { dispatch({ type: 'reset' }) }}>CLEAR</button>
            </form>
            <p>{JSON.stringify(info)}</p>
            <p>{msg}</p>
        </div>

    )
}
