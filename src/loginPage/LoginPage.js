import React, { useState } from "react";

export default function LoginPage() {
    // states
    const [username, setUsernameState] = useState("");
    const [password, setPasswordState] = useState("");
    const [isSubmitted, setIsSubmittedState] = useState(false);
    const [errorType, setErrorTypeState] = useState("");

    // User Login info
    const database = [
        {
            username: "user1",
            password: "pass1"
        },
        {
            username: "user2",
            password: "pass2"
        }
    ];

    // handlers
    const handleUnameChange = (event) => {
        setUsernameState(event.target.value);
    }

    const handlePassChange = (event) => {
        setPasswordState(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        var {uname , pass} = document.forms[0];

        // find user info
        const userInfo = database.find(x => x.username == uname.value);
        if (userInfo) {
            if (userInfo.password == pass.value) {
                setIsSubmittedState(true);
            } else {
                setErrorTypeState("wrong password");
            }
        } else {
            setErrorTypeState("wrong username");
        }
    }

    // render error message
    function renderErrorMessage(name) {
        if (name == errorType) {
            return name == "wrong username"
                   ? <div>Invalid Username</div>
                   : <div>Wrong Password</div>;
        }
    }

    // render form ui
    const renderForm = (
        <form onSubmit={handleSubmit}>
            <div className="usernameInput">
                <label> Username:  </label>
                <input 
                    type = "text"
                    name = "uname"
                    value = {username}
                    onChange = {handleUnameChange}></input>
                {renderErrorMessage("wrong username")}
            </div>
            <div className="passwordInput">
                <label> Password: </label>
                <input
                    type = "password"
                    name = "pass"
                    value = {password}
                    onChange = {handlePassChange}></input>
                {renderErrorMessage("wrong password")}
            </div>
            <div className="submitButton">
                <button onClick={handleSubmit}> login </button>
            </div>
        </form>
    )


    return (
        <header>
            {isSubmitted 
             ? <h1>Signed in</h1> // route to home page 
             : <>
               <h1>Welcome to our page!</h1>
               <h2>Sign In</h2>
                {renderForm}
               </>
             }
        </header>
    )
}