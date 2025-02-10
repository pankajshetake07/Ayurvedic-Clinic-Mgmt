
// import "../styles/View_Appointment.css"
// import { useState, useEffect } from "react";

// function View_Appointment() {
//   const [appointments, setAppointments] = useState([]);

//   useEffect(() => {
//     // Fetch appointments from API or database
//     fetch("https://api.example.com/appointments") // Replace with your actual API endpoint
//       .then((response) => response.json())
//       .then((data) => setAppointments(data))
//       .catch((error) => console.error("Error fetching appointments:", error));
//   }, []);

//   return (
//     <div className="container">
//       <br></br>
//             <h2>Appointment Details</h2>
//       <table className="table">
//         <thead>
//           <tr>
//             <th id="vi_ap">ID</th>
//             <th id="vi_ap">Patient Name</th>
//             <th id="vi_ap">Date</th>
//             <th id="vi_ap">Time</th>
//             <th id="vi_ap">Doctor</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//           <td>1</td>
//               <td>Vishakha Joshi</td>
//               <td>10/02/2025</td>
//               <td>5:30:80</td>
//               <td>Sakshi Babar</td>
//             </tr>
//             <tr>
//               <td>2</td>
//             <td>Om Deshmukh</td>
//               <td>10/02/2025</td>
//               <td>5:30:80</td>
//               <td>Sakshi Babar</td>
//             </tr>
//           {/* {appointments.map((appointment) => (
//             <tr key={appointment.id}>
            
//               <td>{appointment.id}</td>
//               <td>{appointment.patientName}</td>
//               <td>{appointment.date}</td>
//               <td>{appointment.time}</td>
//               <td>{appointment.doctor}</td>
              
//             </tr>
//           ))} */}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default View_Appointment;
