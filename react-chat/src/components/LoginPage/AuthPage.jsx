import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/api/auth/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Login successful:", data);
                localStorage.setItem("authToken", JSON.stringify(data));
                alert("Login successful!");
                navigate("/");
            } else {
                const errorData = await response.json();
                console.error("Login failed:", errorData);
                alert("Login failed: " + (errorData.detail || "Unknown error"));
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default AuthPage;
