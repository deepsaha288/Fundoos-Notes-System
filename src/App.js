import './App.css';
import Login from './components/login/Login';
import { BrowserRouter, Switch,Route} from "react-router-dom";
import {ProtectedRoute} from '../src/services/auth/protectedRoutes';
import Registration from './components/registration/Registration';
import Dashboard from './components/dashboard/Dashboard';
import ForgetPassword from '../src/components/ForgetPassword/ForgetPassword';



function App() {
  return (
    <BrowserRouter>
  
    <Switch>  
    <Route exact path="/" component={Login}/>
    <Route exact path="/Registration" component={Registration}/>
    <ProtectedRoute path={'/dashboard'} component={Dashboard} />
    <Route path="/ForgetPassword" component={ForgetPassword}></Route>
    </Switch>
    
    </BrowserRouter>
  );
}

export default App;
