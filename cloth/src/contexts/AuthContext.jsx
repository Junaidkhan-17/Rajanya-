import { createContext, useContext, useReducer, useEffect } from "react";
import {
  registerUser,
  loginUser,
  getProfile,
  logoutUser,
} from "../services/authService";
/* ==================================================
   CONTEXT
================================================== */

export const AuthContext = createContext();

/* ==================================================
   INITIAL STATE
================================================== */

const initialState = {
  user: null,

  isAuthenticated: false,

  loading: false,

  error: null,

  showCreateAccountModal: false,

  showLoginModal: false,

  showBookForRentModal: false,

  bookForRentPayload: null,

  showVirtualTryOnDrawer: false,

  virtualTryOnPayload: null,

showVirtualTryOnStudioDrawer: false,
virtualTryOnStudioPayload: null,
};

/* ==================================================
   ACTIONS
================================================== */

export const AUTH_ACTIONS = {
  REGISTER_SUCCESS: "REGISTER_SUCCESS",

  LOGIN_SUCCESS: "LOGIN_SUCCESS",

  LOGOUT: "LOGOUT",

  SET_LOADING: "SET_LOADING",

  SET_ERROR: "SET_ERROR",

  OPEN_BOOK_FOR_RENT_MODAL: "OPEN_BOOK_FOR_RENT_MODAL",

  CLOSE_BOOK_FOR_RENT_MODAL: "CLOSE_BOOK_FOR_RENT_MODAL",

  OPEN_CREATE_ACCOUNT_MODAL: "OPEN_CREATE_ACCOUNT_MODAL",

  CLOSE_CREATE_ACCOUNT_MODAL: "CLOSE_CREATE_ACCOUNT_MODAL",

  SET_BOOK_FOR_RENT_PAYLOAD: "SET_BOOK_FOR_RENT_PAYLOAD",

  OPEN_LOGIN_MODAL: "OPEN_LOGIN_MODAL",

  CLOSE_LOGIN_MODAL: "CLOSE_LOGIN_MODAL",

  OPEN_VIRTUAL_TRY_ON_DRAWER: "OPEN_VIRTUAL_TRY_ON_DRAWER",

  CLOSE_VIRTUAL_TRY_ON_DRAWER: "CLOSE_VIRTUAL_TRY_ON_DRAWER",

  SET_VIRTUAL_TRY_ON_PAYLOAD: "SET_VIRTUAL_TRY_ON_PAYLOAD",

OPEN_VIRTUAL_TRY_ON_STUDIO_DRAWER:
  "OPEN_VIRTUAL_TRY_ON_STUDIO_DRAWER",

CLOSE_VIRTUAL_TRY_ON_STUDIO_DRAWER:
  "CLOSE_VIRTUAL_TRY_ON_STUDIO_DRAWER",

SET_VIRTUAL_TRY_ON_STUDIO_PAYLOAD:
  "SET_VIRTUAL_TRY_ON_STUDIO_PAYLOAD",
};

/* ==================================================
   REDUCER
================================================== */

const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.REGISTER_SUCCESS:
      return {
        ...state,

        user: action.payload,

        isAuthenticated: true,

        loading: false,

        error: null,

        showCreateAccountModal: false,

        showBookForRentModal: false,
      };

    case AUTH_ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,

        user: action.payload,

        isAuthenticated: true,

        loading: false,

        error: null,

        showLoginModal: false,

        showBookForRentModal: false,
      };

    case AUTH_ACTIONS.SET_BOOK_FOR_RENT_PAYLOAD:
      return {
        ...state,

        bookForRentPayload: action.payload,
      };

    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,

        user: null,

        isAuthenticated: false,
      };

    case AUTH_ACTIONS.SET_LOADING:
      return {
        ...state,

        loading: action.payload,
      };

    case AUTH_ACTIONS.SET_ERROR:
      return {
        ...state,

        error: action.payload,
      };

    case AUTH_ACTIONS.OPEN_CREATE_ACCOUNT_MODAL:
      return {
        ...state,

        showCreateAccountModal: true,
      };

    case AUTH_ACTIONS.CLOSE_CREATE_ACCOUNT_MODAL:
      return {
        ...state,

        showCreateAccountModal: false,
      };

    case AUTH_ACTIONS.OPEN_LOGIN_MODAL:
      return {
        ...state,

        showLoginModal: true,
      };

    case AUTH_ACTIONS.CLOSE_LOGIN_MODAL:
      return {
        ...state,

        showLoginModal: false,
      };

    case AUTH_ACTIONS.OPEN_BOOK_FOR_RENT_MODAL:
      return {
        ...state,

        showBookForRentModal: true,
      };

    case AUTH_ACTIONS.CLOSE_BOOK_FOR_RENT_MODAL:
      return {
        ...state,

        showBookForRentModal: false,

        bookForRentPayload: null,
      };

    case AUTH_ACTIONS.OPEN_VIRTUAL_TRY_ON_DRAWER:
      return {
        ...state,
        showVirtualTryOnDrawer: true,
      };

case AUTH_ACTIONS.CLOSE_VIRTUAL_TRY_ON_DRAWER:
  return {
    ...state,
    showVirtualTryOnDrawer: false,
  };

    case AUTH_ACTIONS.SET_VIRTUAL_TRY_ON_PAYLOAD:
      return {
        ...state,
        virtualTryOnPayload: action.payload,
      };

    case AUTH_ACTIONS.OPEN_VIRTUAL_TRY_ON_STUDIO_DRAWER:
  return {
    ...state,
    showVirtualTryOnStudioDrawer: true,
  };

case AUTH_ACTIONS.CLOSE_VIRTUAL_TRY_ON_STUDIO_DRAWER:
  return {
    ...state,
    showVirtualTryOnStudioDrawer: false,
    virtualTryOnStudioPayload: null,
  };

case AUTH_ACTIONS.SET_VIRTUAL_TRY_ON_STUDIO_PAYLOAD:
  return {
    ...state,
    virtualTryOnStudioPayload:
      action.payload,
  };

    default:
      return state;
  }
};

/* ==================================================
   PROVIDER
================================================== */

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  /* ==========================================
     LOAD USER FROM LOCAL STORAGE
  ========================================== */

  /* ==========================================
   LOAD USER FROM LOCAL STORAGE
========================================== */

useEffect(() => {
  const loadUser = async () => {
    try {
      const token = localStorage.getItem("rajanya_token");

      if (!token) return;

      dispatch({
        type: AUTH_ACTIONS.SET_LOADING,
        payload: true,
      });

      const response = await getProfile();

      localStorage.setItem(
        "rajanya_user",
        JSON.stringify(response.user)
      );

      dispatch({
        type: AUTH_ACTIONS.LOGIN_SUCCESS,
        payload: response.user,
      });
    } catch (error) {
      localStorage.removeItem("rajanya_token");
      localStorage.removeItem("rajanya_user");

      dispatch({
        type: AUTH_ACTIONS.LOGOUT,
      });
    } finally {
      dispatch({
        type: AUTH_ACTIONS.SET_LOADING,
        payload: false,
      });
    }
  };

  loadUser();
}, []);

  /* ==========================================
     REGISTER
  ========================================== */

  const register = async (userData) => {
  try {
    dispatch({
      type: AUTH_ACTIONS.SET_LOADING,
      payload: true,
    });

    const response = await registerUser(userData);

    dispatch({
  type: AUTH_ACTIONS.CLOSE_CREATE_ACCOUNT_MODAL,
});

dispatch({
  type: AUTH_ACTIONS.OPEN_LOGIN_MODAL,
});

return response;

  } catch (error) {
    throw error;
  } finally {
    dispatch({
      type: AUTH_ACTIONS.SET_LOADING,
      payload: false,
    });
  }
};
  /* ==========================================
     LOGIN
  ========================================== */

  const login = async (loginData) => {
  try {
    dispatch({
      type: AUTH_ACTIONS.SET_LOADING,
      payload: true,
    });

    const response = await loginUser(loginData);

    localStorage.setItem(
      "rajanya_token",
      response.token
    );

    localStorage.setItem(
      "rajanya_user",
      JSON.stringify(response.user)
    );

    dispatch({
      type: AUTH_ACTIONS.LOGIN_SUCCESS,
      payload: response.user,
    });

    return response;
  } catch (error) {
    throw error;
  } finally {
    dispatch({
      type: AUTH_ACTIONS.SET_LOADING,
      payload: false,
    });
  }
};

  /* ==========================================
     LOGOUT
  ========================================== */

  const logout = () => {
  logoutUser();

  dispatch({
    type: AUTH_ACTIONS.LOGOUT,
  });
};

  /* ==========================================
     USER INITIALS
  ========================================== */

  const getUserInitials = () => {
    if (!state.user) return "";

    const first = state.user.firstName?.charAt(0) || "";

    const last = state.user.lastName?.charAt(0) || "";

    return (first + last).toUpperCase();
  };

  /* ==========================================
     CONTEXT VALUE
  ========================================== */

  const value = {
    state,

    dispatch,

    register,

    login,

    logout,

    getUserInitials,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/* ==================================================
   CUSTOM HOOK
================================================== */

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
