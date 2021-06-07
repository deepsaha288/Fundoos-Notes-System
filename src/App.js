import './App.css';
import Registration from './pages/registration/Registration';
import Login from './pages/login/Login';
import Dashboard from './components/dashboard/Dashboard'
import ForgetPassword from './pages/forgotpassword/ForgetPassword'
import ResetPassword from './pages/resetpassword/ResetPassword';


import { BrowserRouter as Router, Route,  Switch,} from 'react-router-dom';


function App() {
  return (
    <Router>
    <div>
      <Switch>
       <Route  exact path="/" component={Registration} ></Route>
        <Route path="/Login" component={Login} ></Route>
        <Route path="/ForgetPassword" component={ForgetPassword}></Route>
        <Route path="/ResetPassword:/token" component={ResetPassword}></Route>
         <Route path="/Dashboard" component={Dashboard}></Route>
       </Switch>
    </div>
  </Router>
  );
}

export default App;
