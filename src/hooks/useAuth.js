import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false)

  const getToken = () => {
    const token = localStorage.getItem("authTokens");
    return token ? JSON.parse(token) : null;
  };

  const [authTokens, setAuthTokens] = useState(getToken());

  useEffect(() => {
    if (authTokens) fetchUserProfile();
  }, [authTokens]);

  const handleAPIError = (
    error,
    defaultMessage = "Something Went Wrong! Try Again"
  ) => {
    console.log(error);

    if (error.response && error.response.data) {
      const errorMessage = Object.values(error.response.data).flat().join("\n");
      setErrorMsg(errorMessage);
      return { success: false, message: errorMessage };
    }
    setErrorMsg(defaultMessage);
    return {
      success: false,
      message: defaultMessage,
    };
  };

  // Fetch user Profile
  const fetchUserProfile = async () => {
    try {
      const response = await apiClient.get("/auth/users/me", {
        headers: { Authorization: `Bearer ${authTokens?.access}` },
      });
      setUser(response.data);
    } catch (error) {
      console.log("Error Fetching user", error);
    }
  };

  // Update User Profile
  const updateUserProfile = async (data) => {
    setErrorMsg("");
    try {
      await apiClient.put("/auth/users/me/", data, {
        headers: {
          Authorization: `Bearer ${authTokens?.access}`,
        },
      });
    } catch (error) {
      return handleAPIError(error);
    }
  };

  // Password Change
  const changePassword = async (data) => {
    setErrorMsg("");
    try {
      await apiClient.post("/auth/users/set_password/", data, {
        headers: {
          Authorization: `Bearer ${authTokens?.access}`,
        },
      });
    } catch (error) {
      return handleAPIError(error);
    }
  };

  // forgot password
  const resetPassword=async (data)=>{
     try {
          const response = await apiClient.post("/auth/users/reset_password/", data);
          if(response.status === 204){
            setErrorMsg(null)
            setSuccess(true)
          }
          console.log(response)
        } catch (error) {
          setErrorMsg(JSON.stringify(error.response.data))
          console.log(error.response.data)
        }
  }
  const resetPasswordConfirm=async (data)=>{
    try {
      const response = await apiClient.post("/auth/users/reset_password_confirm/", data);
      console.log(response)
      if(response.status === 204){
        setErrorMsg(null)
        setSuccess(true)
      }
    } catch (error) { 
      console.log(error.response.data);
      setErrorMsg(JSON.stringify(error.response.data));
    }
  }  
  

  // Login User
  const loginUser = async (userData) => {
    setErrorMsg("");
    try {
      const response = await apiClient.post("/auth/jwt/create/", userData);
      setAuthTokens(response.data);
      localStorage.setItem("authTokens", JSON.stringify(response.data));

      // After login set user
      await fetchUserProfile();
    } catch (error) {
      setErrorMsg(error.response.data?.detail);
    }
  };

  // Register User
  const registerUser = async (userData) => {
    setErrorMsg("");
    try {
      await apiClient.post("/auth/users/", userData);
      return {
        success: true,
        message:
          "Registration successfull. Check your email to activate your account.",
      };
    } catch (error) {
      return handleAPIError(error, "Registration Failed! Try Again");
    }
  };

  // activate user 
  const activateUser= async (data)=>{
    setErrorMsg("")
    try {
      await apiClient.post("/auth/users/activation/", data);
      setSuccess(true)
      return {
        success: true,
        message: "User activated successfully.",
      };
    } catch (error) {
      setErrorMsg(JSON.stringify(error.response.data));
      setSuccess(false)
    }
  }

  // Logout User
  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
  };

  return {
    user,
    errorMsg,
    loginUser,
    registerUser,
    logoutUser,
    updateUserProfile,
    changePassword,
    resetPassword,
    resetPasswordConfirm,
    activateUser,
    success,
  };
};

export default useAuth;