import './App.css';
import Sidebar from './components/sidebar';
import History from './pages/history/history';
import RoomManagement from './pages/room management/roomManagement';
import ReservationManagement from './pages/reservation management/reservationManagement';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { useState } from 'react';
import ChangePassword from './pages/change password/changePassword';
import MoreInfo from './pages/history/moreInfo';
import Login from './pages/login/login';
import logOutModal from './components/logOutModal';
import MoreInfoForReservationList from './components/moreInfoForReservationList';
import AdminManagement from './pages/admin management/adminManagement'
import ModifyAccount from './pages/admin management/admin managment components/modifyAccount';
 
function App() {

  // ต้องใช้อันนี้
  const [isActive, setActive] = useState("false");

  sessionStorage.removeItem("startTime")
  sessionStorage.removeItem("endTime")
  sessionStorage.removeItem("maxDuration")
  sessionStorage.removeItem("minDuration")
  sessionStorage.removeItem("building")
  sessionStorage.removeItem("floor")

  return (
    <Router>
        <Switch >
          <Route path ="/history" exact={true} component={History}>
            <History 
            onCollapse={(isActive) => {
            setActive(!isActive);
            }}
            />
            <Sidebar />
          </Route>
          <Route path="/roomManagement">
            <RoomManagement 
            onCollapse={(isActive) => {
            setActive(!isActive);
            }}
            />
            <Sidebar />
          </Route>
          <Route path="/reservationManagement">
            <ReservationManagement 
            onCollapse={(isActive) => {
            setActive(!isActive);
            }}
            />
            <Sidebar />
          </Route>
          <Route path="/changePassword">
            <ChangePassword />
          </Route>
          <Route path="/moreInfo">
            <MoreInfo />
            <Sidebar />
          </Route>
          <Route path="/moreInfoForReservationList">
            <MoreInfoForReservationList />
            <Sidebar />
          </Route>
          <Route path="/adminManagement">
            <AdminManagement />
            <Sidebar />
          </Route>
          <Route path="/">
            <div>
              <Login />
            </div>
          </Route>
          
        </Switch>
    </Router>
  );
}
 
export default App;
