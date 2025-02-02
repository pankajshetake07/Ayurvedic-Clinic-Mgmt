import "../styles/AddPatient.css"

export default function AddPatient()
{
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

return (
  <div>
      <h1 id="add">Add Patient</h1>
      <form id="add_p">
          <div className="mb-3">
              <label htmlFor="uid" className="form-label">Enter Username :</label>
              <input type="text" className="form-control" id="uname" name="uname" 
               />
          </div>
          <div className="mb-3">
              <label htmlFor="password" className="form-label">Enter Password :</label>
              <input type="password" className="form-control" id="password" name="password" 
                   />
          </div>

          <div className="mb-3">
              <label htmlFor="fname" className="form-label">Enter First Name :</label>
              <input type="text" className="form-control" id="fname" name="fname" 
                   />
          </div>


          <div className="mb-3">
              <label htmlFor="lname" className="form-label">Enter Last Name :</label>
              <input type="text" className="form-control" id="lname" name="lname" 
                   />
          </div>

          <div className="mb-3">
              <label htmlFor="dob" className="form-label">Enter Date of Birth :</label>
              <input type="date" className="form-control" id="dob" name="dob" 
                  />
          </div>

          <div className="mb-3">
              <label htmlFor="address" className="form-label">Enter Address :</label>
              <input type="text" className="form-control" id="address" name="address" 
                   />
          </div>

          <div className="mb-3">
              <label htmlFor="gender" className="form-label">Enter Gender :</label>
              <input type="text" className="form-control" id="gender" name="gender"
                   />
          </div>

           <div className="mb-3">
              <label htmlFor="status" className="form-label">Enter Mail Id :</label>
              <input type="text" className="form-control" id="email" name="mail id"
                  />
          </div> 

          <div className="mb-3">
              <label htmlFor="status" className="form-label">Enter Appointment Date :</label>
              <input type="text" className="form-control" id="app_date" name="App_Date"
                  />
          </div>
          <div className="mb-3">
              <label htmlFor="status" className="form-label">Enter Appointment Time :</label>
              <input type="time" className="form-control" id="app_time" name="App_Time"
                  />
          </div>

          <div className="mb-3">
  <label htmlFor="status" className="form-label d-block">Enter Previous History:</label>
  <textarea id="status" name="App_Time" className="form-control" cols={60} rows={10}></textarea>
</div>


          <button type="submit" className="btn btn-primary mb-3" id="btn">SUBMIT</button>
          <button type="reset" className="btn btn-primary mb-3" id="btn" style={{backgroundColor:"red"}}>CLEAR</button>
      </form>
     
  </div>

)
}