import React, { useState } from "react";

const RegistrationPage = () => {
    const [formData, setFormData] = useState({
        username: "",
        first_name: "",
        last_name: "",
        bio: null,
        avatar: null,
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        const { name } = e.target;
        const file = e.target.files[0] || null;
        setFormData({
            ...formData,
            [name]: file,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        Object.keys(formData).forEach((key) => {
            if (formData[key] !== null) {
                formDataToSend.append(key, formData[key]);
            }
        });

        try {
            const response = await fetch("http://localhost:8080/api/register/", {
                method: "POST",
                body: formDataToSend,
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Registration successful:", data);
                alert("Registration successful!");
            } else {
                const errorData = await response.json();
                console.error("Registration failed:", errorData);
                alert("Registration failed: " + errorData.detail);
            }
        } catch (error) {
            console.error("Error during registration:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
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
                    <label>First Name:</label>
                    <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Bio:</label>
                    <textarea
                        name="bio"
                        value={formData.bio || ""}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div>
                    <label>Avatar:</label>
                    <input
                        type="file"
                        name="avatar"
                        onChange={handleFileChange}
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
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegistrationPage;
