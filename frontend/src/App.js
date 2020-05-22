import React from 'react';
import './css/App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Chatroom from './pages/Chatroom';
import Signup from './pages/Signup';
import Login from "./pages/Login";
import Profile from "./pages/Profile";

const App = () => {
  const [appUser, setAppUser] = React.useState('');
  const [totalUsers, setTotalUsers] = React.useState(0);

  // logs out the [USER]
  const logout = (e) => {
    setAppUser(null);
  }

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/profile">
            <Profile appUser={appUser} setAppUser={setAppUser} />
          </Route>
          <Route path="/chatroom">
            <Chatroom appUser={appUser} setAppUser={setAppUser} totalUsers={totalUsers} setTotalUsers={setTotalUsers} />
          </Route>
          <Route path="/signup">
            <Signup appUser={appUser} setAppUser={setAppUser} />
          </Route>
          <Route path="/">
            <Login appUser={appUser} setAppUser={setAppUser} totalUsers={totalUsers} setTotalUsers={setTotalUsers} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};


export default App;
