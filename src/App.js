import './App.css';
import Login from './pages/login/Login';
import { BrowserRouter, Switch,Route} from "react-router-dom";
import {ProtectedRoute} from '../src/services/auth/protectedRoutes';
import Registration from './pages/registration/Registration';
import Dashboard from './components/dashboard/Dashboard';
import ForgetPassword from './pages/ForgetPassword/ForgetPassword';
import ResetPassword from './pages/resetpassword/ResetPassword';



function App() {
  return (
    <BrowserRouter>
  
    <Switch>  
    <Route exact path="/" component={Login}/>
    <Route exact path="/Registration" component={Registration}/>
    <ProtectedRoute path={'/dashboard'} component={Dashboard} />
    <Route path="/ForgetPassword" component={ForgetPassword}></Route>
    <Route path="/resetpassword" component={ResetPassword}></Route>
    </Switch>
    
    </BrowserRouter>
  );
}

export default App;
