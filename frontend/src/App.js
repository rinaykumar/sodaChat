import React from 'react';
import './css/App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Chatroom from './pages/Chatroom';
import Signup from './pages/Signup';
import Login from "./pages/Login";

const App = () => {
  const [appUser, setAppUser] = React.useState('');

  // Commenting out for now
  // logs out the [USER]
  // const logout = (e) => {
  //   setAppUser(null); 
  // }

  return (
    <div>
      <BrowserRouter>
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
      </BrowserRouter>
    </div>
  );
};


export default App;
