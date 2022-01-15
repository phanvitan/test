import React, { useState } from "react";
import { Prompt } from "react-router-dom";

export default function Login(props) {
    const [userLogin, setUserLogin] = useState({ userName: "", passWord: "", status: false });

    console.log(userLogin);

    const handleChange = (event) => {
        const { name, value } = event.target;

        const newUserLogin = {
            ...userLogin,
            [name]: value
        };

        let valid = true;
        for (let key in newUserLogin) {
            if (key !== 'status') {
                if (newUserLogin[key].trim() === '') {
                    valid = false;
                }
            }
        }
        if (!valid) {
            newUserLogin.status = true;
        } else {
            newUserLogin.status = false;
        }
        setUserLogin(newUserLogin);
    };

    const handleLogin = (event) => {
        event.preventDefault();
        if (userLogin.userName === 'cyberlearn' && userLogin.passWord === 'cyberlearn') {
            //thanh cong thi chuyen ve trang truoc do
            // props.history.goBack();

            //hoac chuyen ve 1 trang duoc chi dinh
            // props.history.push('/home')

            //hoac thay doi noi dung path tuong ung 
            props.history.replace('/home');

            props.history.goBack();

            localStorage.setItem('userLogin', JSON.stringify(userLogin))


        } else {
            alert('Login fail')
            return;
        }
    }

    return (
        <form className="container" onSubmit={handleLogin}>
            <h3>LOGIN</h3>
            <div className="form-group">
                <p>User name</p>
                <input
                    name="userName"
                    className="form-control"
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <p>Password</p>
                <input
                    name="passWord"
                    className="form-control"
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <button className="btn btn-success">Sign In</button>
            </div>
            <Prompt when={true} message={(location) => {
                // console.log(location)
                return 'Bạn có chắc muốn rời khỏi trang này?!'
            }} />
        </form>
    );
}
