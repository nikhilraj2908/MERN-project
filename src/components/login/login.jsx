import { useState } from 'react';
import './login.css'
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

export function Loginadmin() {
    const [admindetails, setadmindetails] = useState({ adminName: "", adminPass: "" });
    const [error, setError] = useState(null);
    const [cookies, setcookies, removecookies] = useCookies("adminName")
    const Navigate = useNavigate();
    function adminSubmit(event) {
        event.preventDefault();
        axios.get("http://127.0.0.1:1115/admin")
        .then(response => {
            const adminDataArray = response.data;
            const admin = adminDataArray.find(
                admin => admin.adminName === admindetails.adminName && admin.adminPass === admindetails.adminPass
            );
            if (admin) {
                setcookies("adminName", admin.adminName);
                Navigate('/adminpage');
            } else {
                alert("Admin not found or password is incorrect");
            }
        })
        .catch(error => {
            console.error("Error fetching admin data:", error);
            alert("An error occurred while logging in. Please try again.");
        });
    }  
    function onhandlechange(event) {
        let name = event.target.name;
        let value = event.target.value;
        setadmindetails({ ...admindetails, [name]: value });
    }

    return (
        <div className="bg-secondary">
            <h3 className="bg-warning p-2 ">login page</h3>
            <div className=" d-flex  justify-content-center align-items-center" style={{ height: "100vh" }}>
                <form onSubmit={adminSubmit} className="bg-dark text-light w-25 rounded p-4 text-start">
                    <dl>
                        <dt>Username:</dt>
                        <dd>
                            <input onChange={onhandlechange} required className="form-control" type="text" name="adminName" placeholder="enter user name" />
                            <div>plz enter user name</div>
                        </dd>
                        <dt>Password</dt>
                        <dd>
                            <input onChange={onhandlechange} required type="password" className="form-control" placeholder="enter your password" name="adminPass" />
                            <div>plz enter the password</div>
                        </dd>
                    </dl>
                    {error && <div style={{ color: 'red' }}>{error}</div>}
                    <button type='submit' className="btn btn-success w-100">login-user</button>
                </form>
            </div>
        </div>
    )
}