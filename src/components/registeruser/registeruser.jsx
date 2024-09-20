import { useEffect, useState } from "react";
import axios from "axios";
import { Header } from "../header/header";
import { Link,Navigate, useNavigate } from "react-router-dom";
import "./registeruser.css"
export function Registeruser() {
    const [user, setUser] = useState({ Name: "", EmailID: "", Mobile: "", Designation: "", Course: "", Gender: "" });
    const [image, setImage] = useState(null);
    const Navigate=useNavigate()

    useEffect(() => {}, []);

    function handleChange(e) {
        let name = e.target.name;
        let value = e.target.value;
        setUser({ ...user, [name]: value });
    }

    function handleFileChange(e) {
        setImage(e.target.files[0]);  
    }

    function submitClick(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("Name", user.Name);
        formData.append("EmailID", user.EmailID);
        formData.append("Mobile", user.Mobile);
        formData.append("Designation", user.Designation);
        formData.append("Course", user.Course);
        formData.append("Gender", user.Gender);
        formData.append("Image", image);  

        axios.post("http://127.0.0.1:1115/create-emp", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(() => {
            alert("employee entered succefully");
        }).catch(err => {
            console.error("Error during form submission", err);
        });
    }
   
    function backbtnClick(){
        Navigate("/")
    }
    return (
        <div >
            <Header/>
            <div className="container-fluid bg-dark text-light d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
            <form method='post' onSubmit={submitClick} className="bg-light text-dark p-2 rounded w-25 d-flex justify-content-center" encType="multipart/form-data">
                <dl className="text-start">
                    <h3>Add Student Details</h3>
                    <dt>Name</dt>
                    <dd>
                        <input className="form-control" onChange={handleChange} name='Name' required placeholder="Enter your name" type="text" value={user.Name} />
                    </dd>
                    <dt>Email ID</dt>
                    <dd>
                        <input className="form-control" onChange={handleChange} name="EmailID" required placeholder="Enter email ID" type="email" value={user.EmailID} />
                    </dd>
                    <dt>Mobile</dt>
                    <dd>
                        <input className="form-control" onChange={handleChange} name='Mobile' required pattern="\+91\d{10}" placeholder="+91 and 10 digits" value={user.Mobile} />
                    </dd>  
                    <dt>Designation</dt>
                    <dd>
                        <input className="form-control" onChange={handleChange} name='Designation' required type="text" placeholder="Role you're applying for" value={user.Designation} />
                    </dd>  
                    <dt>Gender</dt>
                    <dd className="fw-bold text-dark" >
                        <input  type="radio" onChange={handleChange} name="Gender" value="male" /> <span className="me-4 ">Male</span>
                        <input type="radio" onChange={handleChange} name="Gender" value="female" /> <span >Female</span>
                    </dd>  
                    <dt>Course</dt>
                    <dd>
                        <input className="form-control" name='Course' onChange={handleChange} type="text" placeholder="Any course you've done" value={user.Course} />
                    </dd>    
                    <dt>Image</dt>
                    <dd>
                        <input className="form-control" name='Image' onChange={handleFileChange} required type="file" accept="image/*" />
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
