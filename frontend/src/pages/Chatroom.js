import React, { Component } from "react";
import { Redirect, Link } from 'react-router-dom';
import '../css/chatroom.css';
import Selfie from '../svg/selfie.jpg';
import Profile1 from '../svg/profile1.png';
import Profile2 from '../svg/profile2.png';
import Profile3 from '../svg/profile3.png';
import Profile4 from '../svg/profile4.png';
import LikeBtn from '../svg/like-bttn.svg';
import axios from 'axios';
import $ from 'jquery';

const webSocket = new WebSocket('ws://localhost:4001'); // localhost needs to change to AWS IP

const Chatroom = ({ appUser, setAppUser, totalUsers, setTotalUsers }) => {
    // const [totalUsers, setTotalUsers] = React.useState(0);
    const [message, setMessage] = React.useState('');
    const [messages, setMessages] = React.useState([]);
    const [profileNum, setProfileNum] = React.useState('');
    const [thumbsUp, setThumbsUp] = React.useState('');

    const fetchMessages = () => {
        axios.get('/api/getAllMessages')
            .then((res) => {
                console.log(res);
                setMessages(res.data.messages);
            })
            .catch(console.log);
    };


    const likeMessage = (message) => {
        // let currentLikes = parseLikes(message) + 1;
        let currentLikes = parseLikes(message) + 1;
        console.log(parseText(message) + "was just liked. Likes are now " + parseLikes(message))
        const body = {
            text: parseText(message), //this needs to change to actual message
            thumbsUp: currentLikes
        };
        axios.post('/api/updateLikes', body)
            .then(() => setThumbsUp(currentLikes))
            .then(() => fetchMessages())
            .catch(console.log)
    }

    const ScrollMessages = ({ messages }) => {
        const lastMessageRef = React.useRef(null);
        const scrolltoBottom = () => {
            lastMessageRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start', duration: 500 });
        }
        React.useEffect(scrolltoBottom, [messages]);
        return (
            <div ref={lastMessageRef} />
        );
    }

    // const addMessage = (stringMessage) => {
    //     console.log(stringMessage.data); // incoming from server
    //     setMessages((messages) => {
    //         const newMessages = messages.slice(); // copy from item 0
    //         newMessages.push(stringMessage.data);
    //         console.log(newMessages);
    //         return newMessages;
    //     });
    // };

    // React.useEffect(() => {
    //     console.log('Got the message');
    //     // do something when component mounts
    //     ws.addEventListener('message', addMessage);
    //     return () => ws.removeEventListener('message', addMessage);
    // }, []);

    // This grabs the current user's profile pic number for the sidebar
    const profilePic = () => {
        axios.post('/api/profilePic', appUser)
            .then((res) => {
                // console.log(res.data);
                setProfileNum(res.data);
            })
            .catch(console.log);

        switch (profileNum) {
            case 0:
                return Profile1
            case 1:
                return Profile2
            case 2:
                return Profile3
            default:
                return Profile4
        }
    }

    const submitMessage = () => {
        console.log("From submitMessage");
        console.log(message);
        console.log(appUser);
        
        const body = {
            text: message,
            user: appUser,
            likes: thumbsUp,
            actionType: 'sendChatMessage',
        };
 
        webSocket.send("message");   

        axios.post('/api/addMessage', body)
            .then(() => setMessage(''))
            .then(() => setThumbsUp(0))
            .then(() => fetchMessages())
            .catch(console.log);
    };


    const parseText = (message) => {
        let obj = JSON.parse(message);
        return obj.text;
    }
    const parseUser = (message) => {
        let obj = JSON.parse(message);
        return obj.user;
    }

    const parseLikes = (message) => {
        let obj = JSON.parse(message);
        return obj.thumbsUp;
    }

    const parseDate = (message) => {
        let obj = JSON.parse(message);
        return obj.date;
    }

    // This sets the profile pic for loaded messages and new messages
    const parsePic = (message) => {
        let obj = JSON.parse(message);
        switch (obj.picNum) {
            case "0":
                return Profile1
            case "1":
                return Profile2
            case "2":
                return Profile3
            default:
                return Profile4
        }
    }

    const logoutUser = () => {
        if (appUser) {
            setAppUser(null)
            //setTotalUsers(totalUsers - 1)
        }
        return <Redirect to="/" />
    }

    // jQuery for sidebar
    $(document).ready(function () {
        $('#dismiss, .overlay').on('click', function () {
            $('#sidebar').removeClass('active');
            $('.overlay').removeClass('active');
        });

        $('#sidebarCollapse').on('click', function () {
            $('#sidebar').addClass('active');
            $('.overlay').addClass('active');
            $('.collapse.in').toggleClass('in');
            $('a[aria-expanded=true]').attr('aria-expanded', 'false');
        });
    });

    React.useEffect(() => {
        fetchMessages();
        webSocket.addEventListener('message', fetchMessages); 
    }, []);

    if (!appUser) {
        return <Redirect to="/" />;
    }

    return (
        <div>
            <div class="flexbox">
                {/* Sidebar */}
                <div id="sidebar">
                    <div id="dismiss">
                        <i class="fas fa-arrow-left"></i>
                    </div>
                    <div class="left-menu-bar">
                        <div class="menu-profile-info">
                            <h3 id="header-signIn-signup" class="centerText"><em>sodaChat</em></h3>
                            <img id="user-profile-image" src={profilePic()} alt="" />
                            {appUser && <h5 id="username">{appUser}</h5>}
                        </div>
                        {/* <div>
                            <header class="user-counter"> Total Users LoggedIn: {totalUsers}</header>
                        </div> */}
                        <div class="bottom-buttons">
                            {/* <Link to="/profile"><button class="menu-buttons" id="profile-bttn" type="button" name="profile">PROFILE</button></Link> */}
                            <button class="menu-buttons" id="logout-bttn" type="button" name="logout" onClick={logoutUser}>LOGOUT</button>
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
                                    <img class="submitted-message-image" src={Selfie} alt="" />
                                </div>
                                <div class="submitted-message-box-2">
                                    <div class="message-content-header">
                                        <h5 id="username-content">User Name 1</h5>
                                        <p id="date-content">May 5, 2020, 9:25:23 PM</p>
                                    </div>
                                    <div class="message-content-text">
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                            laboris nisi ut aliquip ex ea commodo consequat.
                                    </p>
                                        <button id="like-button" type="button" name="like-button">
                                            <img id="thumbs-up" src={LikeBtn} alt="" />
                                            <p id="thumbs-up-count">0</p>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {messages.map((message) => {
                                return (
                                    <div class="submitted-message">
                                        <div class="submitted-message-box-1">
                                            <img class="submitted-message-image" src={parsePic(message)} alt="" />
                                        </div>
                                        <div class="submitted-message-box-2">
                                            <div class="message-content-header">
                                                <h5 id="username-content">{parseUser(message)}</h5>
                                                <p id="date-content">{parseDate(message)}</p>
                                            </div>
                                            <div class="message-content-text">
                                                <p>{parseText(message)}</p>
                                                <button id="like-button" type="button" name="like-button" onClick={() => likeMessage(message)}>
                                                    <img id="thumbs-up" src={LikeBtn} alt="" />
                                                    <p id="thumbs-up-count">{parseLikes(message)}</p>
                                                </button>
                                            </div>
                                        </div>
                                        {<ScrollMessages messages={messages} />}
                                    </div>
                                );
                            })}
                        </div>

                        <div class="send-messages-box">
                            <input id="send-message-input" placeholder="Message #general" name="message" value={message} onChange={e => setMessage(e.target.value)}></input>
                            <button id="send-message-button" type="button" name="send-message" onClick={submitMessage}>SEND</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="overlay"></div>
        </div>
    );
}

export default Chatroom;
