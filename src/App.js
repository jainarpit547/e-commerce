import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './scss/style.scss';
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import PrivateRoute from "./views/private-route/PrivateRoute";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
//const Technologies = React.lazy(() => import('./views/technologies/Index'));
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Logout = React.lazy(() => import('./views/pages/login/Logout'));
const Forgot = React.lazy(() => import('./views/pages/forgot/Forgot'));
const Reset = React.lazy(() => import('./views/pages/reset/Reset'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  
  if (decoded.expires < currentTime) {
      store.dispatch(logoutUser());
      window.location.href = "/";
  }
}

class App extends Component {

  render() {
    return (
      <HashRouter>
          <React.Suspense fallback={loading}>
            <Switch>
              
              <Route exact path="/" name="Login" render={props => <Login {...props}/>} />
              <Route exact path="/login" name="Login" render={props => <Login {...props}/>} />
              <Route exact path="/forgot" name="Forgot" render={props => <Forgot {...props}/>} />
              <Route exact path="/reset/:id/:otp" name="Reset" render={props => <Reset {...props}/>} />
              <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
              <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
              <Route exact path="/logout" name="Logout" render={props => <Logout {...props}/>} />
              {/* <Route exact path="/technologies" name="Technologies" render={props => <Technologies {...props}/>} /> */}
              <Switch>
                  <PrivateRoute path="/dashboard" name="Dashboard" component={props => <TheLayout {...props}/>} />
                  <PrivateRoute path="/changepassword" name="Change Password" component={props => <TheLayout {...props}/>} />

                  {/* Technologies */}
                  <PrivateRoute path="/technologies" name="Technologies" component={props => <TheLayout {...props}/>} />
                  <PrivateRoute path="/technologies/add" name="Add Technologies" component={props => <TheLayout {...props}/>} />
                  <PrivateRoute path="/technologies/edit/:id" name="Edit Technologies" component={props => <TheLayout {...props}/>} />
                  
                  {/* Department */}
                  <PrivateRoute path="/department" name="Department" component={props => <TheLayout {...props}/>} />
                  <PrivateRoute path="/department/add" name="Add Department" component={props => <TheLayout {...props}/>} />
                  <PrivateRoute path="/department/edit/:id" name="Edit Department" component={props => <TheLayout {...props}/>} />

                  {/* Skill */}
                  <PrivateRoute path="/skill" name="Skill" component={props => <TheLayout {...props}/>} />
                  <PrivateRoute path="/skill/add" name="Add Skill" component={props => <TheLayout {...props}/>} />
                  <PrivateRoute path="/skill/edit/:id" name="Edit Skill" component={props => <TheLayout {...props}/>} />

                  {/* Designation */}
                  <PrivateRoute path="/designation" name="Designation" component={props => <TheLayout {...props}/>} />
                  <PrivateRoute path="/designation/add" name="Add Designation" component={props => <TheLayout {...props}/>} />
                  <PrivateRoute path="/designation/edit/:id" name="Edit Designation" component={props => <TheLayout {...props}/>} />

                  {/* Client */}
                  <PrivateRoute path="/clients" name="Clients" component={props => <TheLayout {...props}/>} />
                  <PrivateRoute path="/clients/add" name="Add Clients" component={props => <TheLayout {...props}/>} />
                  <PrivateRoute path="/clients/edit/:id" name="Edit Clients" component={props => <TheLayout {...props}/>} />

                  {/* Project */}
                  <PrivateRoute path="/projects" name="Projects" component={props => <TheLayout {...props}/>} />
                  <PrivateRoute path="/projects/technologies" name="Assign Technology" component={props => <TheLayout {...props}/>} />
                  <PrivateRoute path="/projects/user" name="Assign Project" component={props => <TheLayout {...props}/>} />
                  <PrivateRoute path="/projects/milestones" name="Create Project Milestone" component={props => <TheLayout {...props}/>} />
                  <PrivateRoute path="/project/detail/:id" name="Projects detail" component={props => <TheLayout {...props}/>} />
                  <PrivateRoute path="/projects/clientdetail/:id" name="Client detail" component={props => <TheLayout {...props}/>} />
                  <PrivateRoute path="/projects/add" name="Add Projects" component={props => <TheLayout {...props}/>} />
                  <PrivateRoute path="/projects/edit/:id" name="Edit Projects" component={props => <TheLayout {...props}/>} />

                  {/* Email */}
                  <PrivateRoute path="/email" name="Email Templates" component={props => <TheLayout {...props}/>} />
                  <PrivateRoute path="/editemail/:id" name="Email Templates Edit" component={props => <TheLayout {...props}/>} />

                  {/* Users */}
                  <PrivateRoute path="/users" name="Users" component={props => <TheLayout {...props}/>} />
                  <PrivateRoute path="/users/skill" name="Add Skill" component={props => <TheLayout {...props}/>} />
                  <PrivateRoute path="/users/project" name="Assign Project" component={props => <TheLayout {...props}/>} />
                  <PrivateRoute path="/users/detail/:id" name="Users detail" component={props => <TheLayout {...props}/>} />
                  <PrivateRoute path="/users/add" name="Add Users" component={props => <TheLayout {...props}/>} />
                  <PrivateRoute path="/users/edit/:id" name="Edit Users" component={props => <TheLayout {...props}/>} />
                 

              </Switch>
              <Route exact path="*" name="Page 404" render={props => <Page404 {...props}/>} />
            </Switch>
          </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
