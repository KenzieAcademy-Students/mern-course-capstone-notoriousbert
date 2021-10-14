import React, { useReducer, useEffect, useContext, createContext } from "react";
import useRouter from "hooks/useRouter";
import axios from "../util/axiosConfig.js";
import { toast } from "react-toastify";

const initialState = {
  isAuthenticated: null,
  user: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case "LOGOUT":
      localStorage.removeItem("MernAppUser");
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    case "UPDATE_USERNAME":
      // console.log("actionPayload:", action.payload.data.username);
      // localStorage.setItem("MernAppUser", JSON.stringify(action.payload.data));
      const savedUser =
        JSON.parse(localStorage.getItem("MernAppUser")) || false;
      const newUserData = {
        ...savedUser,
        username: action.payload.data.username,
      };
      localStorage.setItem("MernAppUser", JSON.stringify(newUserData));
      return {
        ...state,
        isAuthenticated: true,
        user: {
          ...savedUser,
          username: action.payload.data.username,
        },
      };
    default:
      return state;
  }
};

const authContext = createContext();

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <authContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </authContext.Provider>
  );
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext);
};

// Provider hook that creates auth object and handles state
export function useProvideAuth() {
  const { state, dispatch } = useAuth();
  const router = useRouter();

  const signin = async (username, password) => {
    try {
      const response = await axios.post(`auth/signin`, {
        username: username,
        password: password,
      });
      localStorage.setItem("MernAppUser", JSON.stringify(response.data));
      dispatch({
        type: "LOGIN",
        payload: response.data,
      });
      return response;
    } catch (error) {
      console.log(error);
      if (error.response) {
        throw new Error(error.response.data.error);
      } else {
        throw error;
      }
    }
  };

  const updateUsername = (userData) => {
    const savedUser = JSON.parse(localStorage.getItem("MernAppUser")) || false;
    const newUserData = {
      ...savedUser,
      username: userData.data.username,
    };
    localStorage.setItem("MernAppUser", JSON.stringify(newUserData));
    dispatch({
      type: "UPDATE_USERNAME",
      payload: userData,
    });
    router.push(`/users/${userData.data.username}`);
  };

  const signup = async (username, password, email) => {
    try {
      await axios.post(`auth/signup`, {
        username: username,
        email: email,
        password: password,
      });
      return await signin(username, password);
    } catch (error) {
      toast.error(error.response);
      if (error.response) {
        console.log(error.response);
        toast.error(error.response.data.error);
        throw new Error(error.response.data.error);
      } else {
        throw error;
      }
    }
  };

  const signout = () => {
    dispatch({
      type: "LOGOUT",
    });
    router.push("/login");
  };

  const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("MernAppUser"));
  };

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("MernAppUser")) || false;
    if (savedUser) {
      dispatch({
        type: "LOGIN",
        payload: savedUser,
      });
    } else {
      dispatch({
        type: "LOGOUT",
      });
    }
  }, [dispatch]);

  // Return the user object and auth methods
  return {
    state,
    getCurrentUser,
    signin,
    signup,
    signout,
    updateUsername,
  };
}
