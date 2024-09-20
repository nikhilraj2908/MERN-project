import { Home } from "../deshboard/home"
import { Header } from "../header/header"
import { Link } from "react-router-dom"
export function Adminpage() {
    return (
        <div className="bg-dark text-light">
            <Header></Header>
            <h1 >welcome to admin pannel</h1>
            <div className="d-flex justify-content-center align-items-center" style={{ height: "85vh" }}>
                <div>
                <Link to='/register'><button className="btn btn-success mx-4">Add employee</button></Link>
                <Link to='/employeeTable'><button className="btn btn-warning">view employees</button></Link>
                </div>
            </div>
        </div>
    )
}