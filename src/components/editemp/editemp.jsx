import axios from "axios";
// import { response } from "express";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { Header } from "../header/header";
import { Link } from "react-router-dom";
export function EditEmployee(){
    const { id } = useParams();
    console.log(id);
    // const [employee, setEmployee] = useState({});
    const [user, setUser] = useState({ Name: "", EmailID: "", Mobile: "", Designation: "", Course: "", Gender: "" });
    const [image, setImage] = useState(null);
    const navigate=useNavigate();
    useEffect(() => {
        if (id) {
            axios.get(`http://127.0.0.1:1115/get-emp/${id}`)
                .then(response => {
                    if (response.data) {
                        // setEmployee(response.data);
                        setUser(response.data);
                    } else {
                        console.error("No employee data found for ID:", id);
                    }
                })
                .catch(error => {
                    console.error("Error fetching employee data:", error);
                });
        } else {
            console.error("ID is undefined");
        }
    }, [id]);

    function handleChange(e){
        let name=e.target.name;
        let value=e.target.value;
        setUser({ ...user, [name]: value });
    }

    function handleFileChange(e){
        setImage(e.target.files[0]);
    }

    function backbtnClick(){
        navigate("/employeeTable");
    }

    function submitClick(e){
        e.preventDefault();
        const formData = new FormData();
        
        // Append all form fields
        formData.append("Name", user.Name);
        formData.append("EmailID", user.EmailID);
        formData.append("Mobile", user.Mobile);
        formData.append("Designation", user.Designation);
        formData.append("Course", user.Course);
        formData.append("Gender", user.Gender);
    
        // Only append a new image if one was selected
        if (image) {
            formData.append("Image", image);
        } else {
            formData.append("Image", user.Image); // Retain existing image
        }
    
        axios.put(`http://127.0.0.1:1115/update-emp/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(() => {
            alert("Employee details updated successfully");
            navigate("/employeeTable");
        })
        .catch(err => {
            console.error("Error updating employee details", err);
        });
    }
    return (
        <div >
            <Header/>
            <div className="container-fluid bg-dark text-light d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
            <form method='get' onSubmit={submitClick} className="bg-light text-dark p-2 rounded w-25 d-flex justify-content-center" encType="multipart/form-data">
                <dl className="text-start">
                    <h3>Edit Employee Details</h3>
                    <dt>Name</dt>
                    <dd>
                        <input className="form-control" onChange={handleChange} name='Name'  type="text" value={user.Name} />
                    </dd>
                    <dt>Email ID</dt>
                    <dd>
                        <input className="form-control" onChange={handleChange} name="EmailID"   type="email" value={user.EmailID} />
                    </dd>
                    <dt>Mobile</dt>
                    <dd>
                        <input className="form-control" onChange={handleChange} name='Mobile'  pattern="\+91\d{10}" value={user.Mobile} />
                    </dd>  
                    <dt>Designation</dt>
                    <dd>
                        <input className="form-control" onChange={handleChange} name='Designation'  type="text"  value={user.Designation} />
                    </dd>  
                    <dt>Gender</dt>
                    <dd className="fw-bold text-dark" >
                        <input  type="radio" onChange={handleChange} name="Gender" value="male" /> <span className="me-4 ">Male</span>
                        <input type="radio" onChange={handleChange} name="Gender" value="female" /> <span >Female</span>
                    </dd>  
                    <dt>Course</dt>
                    <dd>
                        <input className="form-control" name='Course' onChange={handleChange} type="text"  value={user.Course} />
                    </dd>    
                    <dt>Image</dt>
                    <dd>
                        <input className="form-control" name='Image' onChange={handleFileChange}  type="file" accept="image/*" />
                    </dd>         
                   <div className="d-flex btn-group justify-content-between">
                   <button  className='btn btn-primary '>Submit</button>
                   <button onClick={backbtnClick} className="btn btn-danger">back</button>
                   </div>  
                </dl>
                
            </form>
            </div>
        </div>
    );
}