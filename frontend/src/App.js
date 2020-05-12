import React from 'react';
import './css/App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Chatroom from './pages/Chatroom';
import Signup from './pages/Signup';
import Login from "./pages/Login";

const App = () => {
  const [appUser, setAppUser] = React.useState('');

<<<<<<< HEAD
  // logs out the [USER]
  const logout = (e) => {
    setAppUser(null);
  }

=======
  // Commenting out for now
  // logs out the [USER]
  // const logout = (e) => {
  //   setAppUser(null); 
  // }
>>>>>>> 563eb1dc158ee346b8ba558566d3a9c48bd35645

  return (
    <div>
      <BrowserRouter>
<<<<<<< HEAD
        <Switch>
          <Route path="/chatroom">
            <Chatroom appUser={appUser} setAppUser={setAppUser} />
          </Route>
          <Route path="/signup">
            <Signup appUser={appUser} setAppUser={setAppUser} />
          </Route>
          <Route path="/">
            <Login appUser={appUser} setAppUser={setAppUser} />
          </Route>
        </Switch>
=======
      <Switch>
        <Route path="/chatroom">
          <Chatroom appUser={appUser} setAppUser={setAppUser} />
        </Route>
        <Route path="/signup">
          <Signup appUser={appUser} setAppUser={setAppUser} />
        </Route>
        <Route path="/">
          <Login appUser={appUser} setAppUser={setAppUser} />
        </Route>
      </Switch>
>>>>>>> 563eb1dc158ee346b8ba558566d3a9c48bd35645
      </BrowserRouter>
    </div>
  );
};


export default App;
