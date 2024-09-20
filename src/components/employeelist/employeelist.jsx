import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Header } from '../header/header';
import { Link } from 'react-router-dom';
function EmployeeTable() {
    const [employees, setEmployees] = useState([]);
    const[count,setcount]=useState([]);
    //   const date = employees.Date.slice(0, 10);
    
    const fetchcount=()=>{
        axios.get("http://127.0.0.1:1115/count-emp")
        .then(res=>{
            setcount(res.data);
        })
    }
    const fetchEmployees = () => {
        axios.get('http://localhost:1115/get-emp')
            .then(response => {

                setEmployees(response.data);
            })
            .catch(error => {
                console.error('Error fetching employee data:', error);
            });
    };
    useEffect(() => {
        fetchEmployees();
        fetchcount();
    }, [fetchcount]);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this employee?")) {
            axios.delete(`http://localhost:1115/delete-emp/${id}`)
                .then(response => {
                    alert("Employee deleted successfully");
                    fetchEmployees();
                })
                .catch(error => {
                    console.error("Error deleting employee:", error);
                });
        }
    };
   
    return (
        <div className="employee-table-container ">
            <Header />
            <div className='d-flex bg-warning align-items-center justify-content-between'>
                <h5 className='px-4  p-2 text-start'>Employee List </h5>
                <h5>total emp - {count}</h5>
                <input type='text'  placeholder='Enter text to search' className='form-control w-50 p-2 me-2' ></input>
            </div>
            <table className="employee-table table table-hover">
                <thead >
                    <tr >
                        <th>Unique Id</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile No</th>
                        <th>Designation</th>
                        <th>Gender</th>
                        <th>Course</th>
                        <th>Create Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody >
                    {employees.map((emp) => (

                        <tr key={emp._id}>
                            <td>{emp._id}</td>
                            <td><img src={`uploads/images/${emp.Image}`} alt="Profile" style={{ width: "40px", height: "40px", borderRadius: "50%" }} /></td>
                            <td>{emp.Name}</td>
                            <td><a href={`mailto:${emp.EmailID}`}>{emp.EmailID}</a></td>
                            <td>{emp.Mobile}</td>
                            <td>{emp.Designation}</td>
                            <td>{emp.Gender}</td>
                            <td>{emp.Course}</td>
                            <td>{emp.Date ? emp.Date.slice(0, 10) : "N/A"}</td>
                            <td className='btn-group'>
                                <td className='btn-group'>
                                    <Link to={`/editemployee/${emp._id}`}>
                                        <button className="edit-btn btn btn-warning">Edit</button>
                                    </Link>

                                    {/* <Link to={`/editemployee/${emp._id}`}><button className="edit-btn btn btn-warning" >Edit</button></Link> */}
                                    <button className="delete-btn btn btn-danger" onClick={() => handleDelete(emp._id)}>Delete</button>
                                </td>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default EmployeeTable;
