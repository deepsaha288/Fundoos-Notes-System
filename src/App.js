
import './App.css';
import Registration from './pages/registration/Registration';
import Login from './pages/login/Login';
import { BrowserRouter as Router, Route, Link, Switch, BrowserRouter } from 'react-router-dom';


function App() {
  return (
    <Router>
    <div>
      <Switch>
       <Route  exact path="/" component={Registration} ></Route>
       <Route path="/Login" component={Login} ></Route> 
       </Switch>
    </div>
  </Router>
  );
}

export default App;
