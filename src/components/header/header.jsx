import { useCookies } from "react-cookie"

export function Header() {
    const [cookies, setcookies, removecookies] = useCookies()
    function logoutClick() {
        removecookies('adminName');
    }
    return (
        // Home								Hukum Gupta -	Logout
        <div className="bg-info p-2 fs-5 fw-bold px-4 d-flex justify-content-between">
            <div>Home</div>
            <div>Employee List</div>
            <div className="d-flex align-items-center">
                <div>{cookies.adminName} :- </div>
                <div>
                    <button onClick={logoutClick} className="btn btn-danger ms-2">Logout</button>
                </div>
            </div>
        </div>
    )
}