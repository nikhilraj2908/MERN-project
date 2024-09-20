import { Link } from "react-router-dom";
import { Header } from "../header/header";
export function Home(){
    return (
        <div className="container-fluid  bg-secondary align-items-center d-flex justify-content-center" style={{height:"100vh"}}>
            <Link to="/register"><button className="btn btn-success">register employee</button></Link>
            <Link to="/admin"><button className="btn btn-success ms-4">login admin</button></Link>
 
        </div>
    )
}