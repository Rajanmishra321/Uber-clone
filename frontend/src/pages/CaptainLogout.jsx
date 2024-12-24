import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CaptainLogout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        const logoutUser = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/captain-logout/logout`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.status === 200) {
                    localStorage.removeItem("token");
                    navigate("/captain-login");
                }
            } catch (error) {
                console.error("Error during logout:", error);
                // Optionally handle the error here
            }
        };

        logoutUser();
    }, [navigate]);

    return (
        <div>
            <h1>Logging out...</h1>
        </div>
    );
};

export default CaptainLogout;
