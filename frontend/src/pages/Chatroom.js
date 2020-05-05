import React from 'react';
import '../css/stylesheet.css';
import Selfie from '../svg/selfie.jpg';
import LikeBtn from '../svg/like-bttn.svg';

const Chatroom = () => {    
    //const [appUser, setAppUser] = React.useState('');

    return (
    <div>
        <div class="flexbox">
            <div id="sidebar">
                <div id="dismiss">
                    <i class="fas fa-arrow-left"></i>
                </div>
                <div class="left-menu-bar">
                    <div class="menu-profile-info">
                        <img id="user-profile-image" src={Selfie} alt=""/>
                        <h5 id="username">Username</h5>
                    </div>
                    <div class="bottom-buttons">
                        <button class="menu-buttons" id="profile-bttn" type="button" name="profile">PROFILE</button>
                        <button class="menu-buttons" id="logout-bttn" type="button" name="logout">LOGOUT</button>
                    </div>
                </div>
            </div>
            <div id="content">
                <button type="button" id="sidebarCollapse" class="btn btn-info">
                    <i class="fas fa-align-left"></i>
                </button>
                <div class="right-chatroom">
                    <div class="messages-box">
                        <div class="submitted-message">
                            <div class="submitted-message-box-1">
                            <img class="submitted-message-image" src={Selfie} alt=""/>
                            </div>
                            <div class="submitted-message-box-2">
                                <div class="message-content-header">
                                    <h5 id="username-content">User Name</h5>
                                    <p id="date-content">07/05/2019</p>
                                </div>
                                <div class="message-content-text">
                                    <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                    ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                    laboris nisi ut aliquip ex ea commodo consequat.
                                    </p>
                                    <button id="like-button" type="button" name="like-button">
                                    <img id="thumbs-up" src={LikeBtn} alt=""/> 
                                    <p id="thumbs-up-count">0</p>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="send-messages-box">
                        <input id="send-message-input" placeholder="Message #general" name="message"></input>
                        <button id="send-message-button" type="button" name="send-message">SEND</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="overlay"></div>
    </div>
    );
  }
  
  export default Chatroom;