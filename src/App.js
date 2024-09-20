import './App.css';
import { Registeruser } from './components/registeruser/registeruser';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Home } from './components/deshboard/home';
import { Loginadmin } from './components/login/login';
import { Adminpage } from './components/adminpage/adminpage';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import EmployeeTable from './components/employeelist/employeelist';
import { EditEmployee } from './components/editemp/editemp';

function App() {
  const navigate=useNavigate()
  const [cookies, setCookie, removeCookie] = useCookies(["adminName"]);
  useEffect(()=>{
    if(!cookies.adminName){
      navigate('/');
    }
  },[cookies.adminName,navigate])

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={cookies.adminName ? <Adminpage /> : <Loginadmin />} />
        <Route path='/admin' element={cookies.adminName ? <Adminpage /> : <Loginadmin />} />
        <Route path='/register' element={<Registeruser />} />
        <Route path='/adminpage' element={<Adminpage />} />
        <Route path='/employeeTable' element={<EmployeeTable />}/>
        <Route path="/editemployee/:id" element={<EditEmployee />} />
      </Routes>
    </div>
  );
}

export default App;
