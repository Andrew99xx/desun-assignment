import React, { useEffect, useState } from 'react';
import './AuthForm.css';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [isLoggedIn, setsLoggedIn] = useState(true)
    const [profileImage, setProfileImage] = useState(null);
    const [registerData, setRegisterData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const toggleForm = () => {
        setIsLogin(!isLogin);
    };
    const navigate=useNavigate()

    useEffect(() => {
        setsLoggedIn(JSON.parse(localStorage.getItem('loggedIn')))
    }, [])
    const handleLoginSubmit = (e) => {
        e.preventDefault();

        const email = e.target.loginEmail.value;
        const password = e.target.loginPassword.value;

        // Retrieve the list of registered users from localStorage
        const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];

        // Search for a user with matching email and password
        const user = registeredUsers.find(user => user.email === email && user.password === password);

        if (user) {
            // If found, set the loggedIn status and store the UID
            localStorage.setItem('loggedIn', true);
            localStorage.setItem('loggedInUID', user.uid);
            setsLoggedIn(true)
            console.log('Login successful');
            alert("You are logged in successfully")
            
            // Redirect to a different page or update the UI as needed
        } else {
            // If not found, alert the user
            alert('Login failed: Incorrect email or password');
        }
    };


    const handleRegisterSubmit = async (e) => {
        e.preventDefault();

        // Generate a random UID
        const uid = `uid_${Math.random().toString(36).substr(2, 9)}`;

        // Convert image to base64
        const base64Image = await convertToBase64(profileImage);

        // Create the final data object
        const newUser = {
            uid: uid,
            name:registerData.name,
            email: registerData.email,
            password: registerData.password,
            image: base64Image,
        };

        // Store the data in localStorage
        // Retrieve the current list of registered users from localStorage
        let registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];

        // Append the new user to the array
        registeredUsers.push(newUser);

        // Save the updated array back to localStorage
        localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
        localStorage.setItem('loggedIn', true);
        localStorage.setItem('loggedInUID', newUser.uid);

        console.log('New user added to localStorage:', newUser);


        // Clear the form
        setRegisterData({
            name: '',
            email: '',
            password: '',
        });
        setProfileImage(null);
    };

    const handleChange = (e) => {
        setRegisterData({
            ...registerData,
            [e.target.id]: e.target.value,
        });
    };

    const handleImageChange = (e) => {
        setProfileImage(e.target.files[0]);
    };
    const handleLogout = (e) => {
        setsLoggedIn(false)
        localStorage.setItem('loggedIn', false);
        localStorage.setItem('loggedInUID', null);


    }

    


    return (
        <>
            {isLoggedIn ?
                <>
                    <button onClick={handleLogout} className="submit-button">Logout</button>

                </> :
                <div className="auth-form-container">
                    <div className="form-toggle">
                        <button onClick={toggleForm} className={isLogin ? "active" : ""}>Login</button>
                        <button onClick={toggleForm} className={!isLogin ? "active" : ""}>Register</button>
                    </div>
                    {isLogin ? (
                        <form onSubmit={handleLoginSubmit} className="login-form">
                            <h2>Login</h2>
                            <div className="form-group">
                                <label htmlFor="loginEmail">Email:</label>
                                <input type="email" id="loginEmail" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="loginPassword">Password:</label>
                                <input type="password" id="loginPassword" required />
                            </div>
                            <button type="submit" className="submit-button">Login</button>
                        </form>
                    ) : (
                        <form onSubmit={handleRegisterSubmit} className="register-form">
                            <h2>Register</h2>
                            <div className="form-group">
                                <label htmlFor="registerName">Name:</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={registerData.name}
                                    onChange={handleChange}
                                    required
                                />                    </div>
                            <div className="form-group">
                                <label htmlFor="registerEmail">Email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={registerData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="registerPassword">Password:</label>
                                <input
                                    type="password"
                                    id="password"
                                    value={registerData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="profileImage">Upload Profile Picture:</label>
                                <input type="file" id="profileImage" accept="image/*" onChange={handleImageChange} />
                            </div>
                            <button type="submit" className="submit-button">Register</button>
                        </form>
                    )}
                </div>}
        </>
    );
};

export default Auth;
export const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
};