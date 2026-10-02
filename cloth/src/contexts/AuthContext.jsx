import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";

import {
  registerUser,
  loginUser,
  googleLoginUser,
  exchangeGoogleRedirectToken,
  getProfile,
  logoutUser,
} from "../services/authService";

/* =========================================================
   INITIAL STATE
========================================================= */

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null,

  pendingAction: null,

  showCreateAccountModal: false,
  showLoginModal: false,

  showBookForRentModal: false,
  bookForRentPayload: null,

  showVirtualTryOnDrawer: false,
  virtualTryOnPayload: null,

  showVirtualTryOnStudioDrawer: false,
  virtualTryOnStudioPayload: null,
};

/* =========================================================
   ACTION TYPES
========================================================= */

export const AUTH_ACTIONS = {
  REGISTER_SUCCESS: "REGISTER_SUCCESS",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGOUT: "LOGOUT",

  SET_LOADING: "SET_LOADING",
  SET_ERROR: "SET_ERROR",

  SET_PENDING_ACTION: "SET_PENDING_ACTION",
  CLEAR_PENDING_ACTION: "CLEAR_PENDING_ACTION",

  OPEN_BOOK_FOR_RENT_MODAL:
    "OPEN_BOOK_FOR_RENT_MODAL",

  CLOSE_BOOK_FOR_RENT_MODAL:
    "CLOSE_BOOK_FOR_RENT_MODAL",

  SET_BOOK_FOR_RENT_PAYLOAD:
    "SET_BOOK_FOR_RENT_PAYLOAD",

  OPEN_CREATE_ACCOUNT_MODAL:
    "OPEN_CREATE_ACCOUNT_MODAL",

  CLOSE_CREATE_ACCOUNT_MODAL:
    "CLOSE_CREATE_ACCOUNT_MODAL",

  OPEN_LOGIN_MODAL:
    "OPEN_LOGIN_MODAL",

  CLOSE_LOGIN_MODAL:
    "CLOSE_LOGIN_MODAL",

  OPEN_VIRTUAL_TRY_ON_DRAWER:
    "OPEN_VIRTUAL_TRY_ON_DRAWER",

  CLOSE_VIRTUAL_TRY_ON_DRAWER:
    "CLOSE_VIRTUAL_TRY_ON_DRAWER",

  SET_VIRTUAL_TRY_ON_PAYLOAD:
    "SET_VIRTUAL_TRY_ON_PAYLOAD",

  OPEN_VIRTUAL_TRY_ON_STUDIO_DRAWER:
    "OPEN_VIRTUAL_TRY_ON_STUDIO_DRAWER",

  CLOSE_VIRTUAL_TRY_ON_STUDIO_DRAWER:
    "CLOSE_VIRTUAL_TRY_ON_STUDIO_DRAWER",

  SET_VIRTUAL_TRY_ON_STUDIO_PAYLOAD:
    "SET_VIRTUAL_TRY_ON_STUDIO_PAYLOAD",
};

/* =========================================================
   REDUCER
========================================================= */

const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.REGISTER_SUCCESS:
    case AUTH_ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,

        user: action.payload.user,

        isAuthenticated: true,

        loading: false,

        error: null,
      };

    case AUTH_ACTIONS.LOGOUT:
      return {
        ...initialState,

        loading: false,
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

        loading: false,
      };

    case AUTH_ACTIONS.SET_PENDING_ACTION:
      return {
        ...state,

        pendingAction: action.payload,
      };

    case AUTH_ACTIONS.CLEAR_PENDING_ACTION:
      return {
        ...state,

        pendingAction: null,
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

    case AUTH_ACTIONS.SET_BOOK_FOR_RENT_PAYLOAD:
      return {
        ...state,

        bookForRentPayload: action.payload,
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

    case AUTH_ACTIONS.OPEN_VIRTUAL_TRY_ON_DRAWER:
      return {
        ...state,

        showVirtualTryOnDrawer: true,
      };

    case AUTH_ACTIONS.CLOSE_VIRTUAL_TRY_ON_DRAWER:
      return {
        ...state,

        showVirtualTryOnDrawer: false,

        virtualTryOnPayload: null,
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

        virtualTryOnStudioPayload: action.payload,
      };

    default:
      return state;
  }
};

/* =========================================================
   CONTEXT
========================================================= */

const AuthContext = createContext(null);

/* =========================================================
   PROVIDER
========================================================= */

export const AuthProvider = ({
  children,
}) => {
  const [state, dispatch] = useReducer(
    authReducer,
    initialState
  );

  /* =======================================================
     NORMAL USER LOGIN
  ======================================================= */

  const login = useCallback(
    async (credentials) => {
      try {
        dispatch({
          type: AUTH_ACTIONS.SET_LOADING,
          payload: true,
        });

        const response =
          await loginUser(credentials);

        if (
          response?.success &&
          response?.token &&
          response?.user
        ) {
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
            payload: {
              user: response.user,
            },
          });

          return {
            success: true,
            user: response.user,
          };
        }

        throw new Error(
          response?.message ||
            "Login failed"
        );
      } catch (error) {
        const message =
          error?.response?.data?.message ||
          error?.message ||
          "Login failed";

        dispatch({
          type: AUTH_ACTIONS.SET_ERROR,
          payload: message,
        });

        return {
          success: false,
          message,
        };
      }
    },
    []
  );

  /* =======================================================
     REGISTER
  ======================================================= */

  const register = useCallback(
    async (userData) => {
      try {
        dispatch({
          type: AUTH_ACTIONS.SET_LOADING,
          payload: true,
        });

        const response =
          await registerUser(userData);

        if (
          response?.success &&
          response?.token &&
          response?.user
        ) {
          localStorage.setItem(
            "rajanya_token",
            response.token
          );

          localStorage.setItem(
            "rajanya_user",
            JSON.stringify(response.user)
          );

          dispatch({
            type: AUTH_ACTIONS.REGISTER_SUCCESS,
            payload: {
              user: response.user,
            },
          });

          return {
            success: true,
            user: response.user,
          };
        }

        throw new Error(
          response?.message ||
            "Registration failed"
        );
      } catch (error) {
        const message =
          error?.response?.data?.message ||
          error?.message ||
          "Registration failed";

        dispatch({
          type: AUTH_ACTIONS.SET_ERROR,
          payload: message,
        });

        return {
          success: false,
          message,
        };
      }
    },
    []
  );

  /* =======================================================
     GOOGLE LOGIN - EXISTING POPUP FLOW
  ======================================================= */

  const loginWithGoogle = useCallback(
    async (credential) => {
      try {
        dispatch({
          type: AUTH_ACTIONS.SET_LOADING,
          payload: true,
        });

        const response =
          await googleLoginUser(
            credential
          );

        if (
          response?.success &&
          response?.token &&
          response?.user
        ) {
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
            payload: {
              user: response.user,
            },
          });

          return {
            success: true,
            user: response.user,
          };
        }

        throw new Error(
          response?.message ||
            "Google login failed"
        );
      } catch (error) {
        const message =
          error?.response?.data?.message ||
          error?.message ||
          "Google login failed";

        dispatch({
          type: AUTH_ACTIONS.SET_ERROR,
          payload: message,
        });

        return {
          success: false,
          message,
        };
      }
    },
    []
  );

  /* =======================================================
     GOOGLE REDIRECT HANDOFF
  ======================================================= */

  const completeGoogleRedirectLogin =
    useCallback(async () => {
      const hash =
        window.location.hash;

      if (
        !hash ||
        !hash.includes(
          "google_handoff="
        )
      ) {
        return false;
      }

      const params =
        new URLSearchParams(
          hash.substring(1)
        );

      const handoffToken =
        params.get(
          "google_handoff"
        );

      if (!handoffToken) {
        return false;
      }

      try {
        dispatch({
          type: AUTH_ACTIONS.SET_LOADING,
          payload: true,
        });

        /*
         * Exchange the short-lived Google
         * redirect handoff for the normal
         * Rajanya authentication token.
         */

        const response =
          await exchangeGoogleRedirectToken(
            handoffToken
          );

        if (
          response?.success &&
          response?.token &&
          response?.user
        ) {
          localStorage.setItem(
            "rajanya_token",
            response.token
          );

          localStorage.setItem(
            "rajanya_user",
            JSON.stringify(response.user)
          );

          /*
           * Remove the temporary handoff
           * token from the browser URL.
           */

          window.history.replaceState(
            null,
            document.title,
            window.location.pathname +
              window.location.search
          );

          dispatch({
            type: AUTH_ACTIONS.LOGIN_SUCCESS,
            payload: {
              user: response.user,
            },
          });

          return true;
        }

        throw new Error(
          response?.message ||
            "Google login could not be completed"
        );
      } catch (error) {
        console.error(
          "Google Redirect Login Error:",
          error
        );

        /*
         * Remove the failed handoff
         * from the URL as well.
         */

        window.history.replaceState(
          null,
          document.title,
          window.location.pathname +
            window.location.search
        );

        const message =
          error?.response?.data?.message ||
          error?.message ||
          "Google login failed";

        dispatch({
          type: AUTH_ACTIONS.SET_ERROR,
          payload: message,
        });

        return false;
      }
    }, []);

  /* =======================================================
     LOAD EXISTING USER / GOOGLE REDIRECT
  ======================================================= */

  useEffect(() => {
    let mounted = true;

    const initializeAuthentication =
      async () => {
        /*
         * First check whether Google has just
         * redirected the user back to Rajanya.
         */

        const hash =
          window.location.hash;

        if (
          hash.includes(
            "google_handoff="
          )
        ) {
          await completeGoogleRedirectLogin();

          return;
        }

        /*
         * Handle Google redirect errors.
         */

        if (
          hash.includes(
            "google_error="
          )
        ) {
          const params =
            new URLSearchParams(
              hash.substring(1)
            );

          const googleError =
            params.get(
              "google_error"
            );

          window.history.replaceState(
            null,
            document.title,
            window.location.pathname +
              window.location.search
          );

          if (mounted) {
            dispatch({
              type: AUTH_ACTIONS.SET_ERROR,
              payload:
                googleError ||
                "Google login failed",
            });
          }

          return;
        }

        /*
         * Normal existing-token flow.
         */

        const token =
          localStorage.getItem(
            "rajanya_token"
          );

        if (!token) {
          if (mounted) {
            dispatch({
              type: AUTH_ACTIONS.SET_LOADING,
              payload: false,
            });
          }

          return;
        }

        try {
          const response =
            await getProfile();

          if (
            response?.success &&
            response?.user
          ) {
            localStorage.setItem(
              "rajanya_user",
              JSON.stringify(
                response.user
              )
            );

            if (mounted) {
              dispatch({
                type:
                  AUTH_ACTIONS.LOGIN_SUCCESS,
                payload: {
                  user:
                    response.user,
                },
              });
            }
          } else {
            throw new Error(
              "Invalid user session"
            );
          }
        } catch (error) {
          console.error(
            "Authentication initialization error:",
            error
          );

          logoutUser();

          if (mounted) {
            dispatch({
              type: AUTH_ACTIONS.LOGOUT,
            });
          }
        }
      };

    initializeAuthentication();

    return () => {
      mounted = false;
    };
  }, [
    completeGoogleRedirectLogin,
  ]);

  /* =======================================================
     LOGOUT
  ======================================================= */

  /* =======================================================
   LOGOUT
======================================================= */

const logout = useCallback(() => {
  /*
   * Clear customer authentication data
   * from browser storage.
   *
   * This is important because AuthContext
   * restores the session from rajanya_token
   * whenever the page is refreshed.
   */
  localStorage.removeItem("rajanya_token");
  localStorage.removeItem("rajanya_user");

  /*
   * Clear any authentication-related
   * session data if present.
   */
  sessionStorage.removeItem("rajanya_token");
  sessionStorage.removeItem("rajanya_user");

  /*
   * Reset React authentication state.
   */
  dispatch({
    type: AUTH_ACTIONS.LOGOUT,
  });
}, []);

  /* =======================================================
     MODAL HELPERS
  ======================================================= */

  const openCreateAccountModal =
    useCallback(() => {
      dispatch({
        type:
          AUTH_ACTIONS.OPEN_CREATE_ACCOUNT_MODAL,
      });
    }, []);

  const closeCreateAccountModal =
    useCallback(() => {
      dispatch({
        type:
          AUTH_ACTIONS.CLOSE_CREATE_ACCOUNT_MODAL,
      });
    }, []);

  const openLoginModal =
    useCallback(() => {
      dispatch({
        type:
          AUTH_ACTIONS.OPEN_LOGIN_MODAL,
      });
    }, []);

  const closeLoginModal =
    useCallback(() => {
      dispatch({
        type:
          AUTH_ACTIONS.CLOSE_LOGIN_MODAL,
      });
    }, []);

  const openBookForRentModal =
    useCallback((payload = null) => {
      if (payload) {
        dispatch({
          type:
            AUTH_ACTIONS.SET_BOOK_FOR_RENT_PAYLOAD,
          payload,
        });
      }

      dispatch({
        type:
          AUTH_ACTIONS.OPEN_BOOK_FOR_RENT_MODAL,
      });
    }, []);

  const closeBookForRentModal =
    useCallback(() => {
      dispatch({
        type:
          AUTH_ACTIONS.CLOSE_BOOK_FOR_RENT_MODAL,
      });
    }, []);

  const openVirtualTryOnDrawer =
    useCallback((payload = null) => {
      if (payload) {
        dispatch({
          type:
            AUTH_ACTIONS.SET_VIRTUAL_TRY_ON_PAYLOAD,
          payload,
        });
      }

      dispatch({
        type:
          AUTH_ACTIONS.OPEN_VIRTUAL_TRY_ON_DRAWER,
      });
    }, []);

  const closeVirtualTryOnDrawer =
    useCallback(() => {
      dispatch({
        type:
          AUTH_ACTIONS.CLOSE_VIRTUAL_TRY_ON_DRAWER,
      });
    }, []);

  const openVirtualTryOnStudioDrawer =
    useCallback((payload = null) => {
      if (payload) {
        dispatch({
          type:
            AUTH_ACTIONS.SET_VIRTUAL_TRY_ON_STUDIO_PAYLOAD,
          payload,
        });
      }

      dispatch({
        type:
          AUTH_ACTIONS.OPEN_VIRTUAL_TRY_ON_STUDIO_DRAWER,
      });
    }, []);

  const closeVirtualTryOnStudioDrawer =
    useCallback(() => {
      dispatch({
        type:
          AUTH_ACTIONS.CLOSE_VIRTUAL_TRY_ON_STUDIO_DRAWER,
      });
    }, []);

  /* =======================================================
     CONTEXT VALUE
  ======================================================= */

  const value = {
    state,

    dispatch,

    register,

    login,

    loginWithGoogle,

    completeGoogleRedirectLogin,

    logout,

    openCreateAccountModal,
    closeCreateAccountModal,

    openLoginModal,
    closeLoginModal,

    openBookForRentModal,
    closeBookForRentModal,

    openVirtualTryOnDrawer,
    closeVirtualTryOnDrawer,

    openVirtualTryOnStudioDrawer,
    closeVirtualTryOnStudioDrawer,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

/* =========================================================
   HOOK
========================================================= */

export const useAuth = () => {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};