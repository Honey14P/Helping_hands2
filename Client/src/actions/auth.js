import axios from 'axios';
import {setAlert} from './alert';
import {REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, CLEAR_PROFILE} from './types';
import setAuthToken from '../utils/setAuthToken';

// Load User
export const loadUser = () => async dispatch => {
    // if there is a token in local storage
    if (localStorage.token) {
        // put into global header
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get('/api/auth');

        dispatch({
            type: USER_LOADED, 
            payload: res.data
        });
    } catch (err) {
        dispatch({type: AUTH_ERROR});
    }
};


// Load Volunteer User
export const loadVolunteerUser = () => async dispatch => {
  // if there is a token in local storage
  if (localStorage.token) {
      // put into global header
      setAuthToken(localStorage.token);
  }

  try {
      const res = await axios.get('/api/volunteerAuth');

      dispatch({
          type: USER_LOADED, 
          payload: res.data
      });
  } catch (err) {
      dispatch({type: AUTH_ERROR});
  }
};


// Register User
export const register = ({firstName, lastName, email, password}) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({firstName, lastName, email, password});

    try {
        const res = await axios.post('/api/users', body, config);

        dispatch({
            type: REGISTER_SUCCESS, 
            payload: res.data
        });

        dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: REGISTER_FAIL
        });
    }
};

// Register Volunteer User
export const registerVolunteer = ({firstName, lastName, email, password, service_type}) => async dispatch => {
  console.log("reg")
  const config = {
      headers: {
          'Content-Type': 'application/json'
      }
  };

  const body = JSON.stringify({firstName, lastName, email, password,service_type});

  try {
      const res = await axios.post('/api/volunteerUsers', body, config);

      dispatch({
          type: REGISTER_SUCCESS, 
          payload: res.data
      });

      dispatch(loadVolunteerUser());
  } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
          errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      }

      dispatch({
          type: REGISTER_FAIL
      });
  }
};

// Login User
export const login = (email, password) => async dispatch => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
  
    const body = JSON.stringify({ email, password });
  
    try {
      const res = await axios.post('/api/auth', body, config);
  
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
  
      dispatch(loadUser());
    } catch (err) {
      const errors = err.response.data.errors;
  
      if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      }
  
      dispatch({
        type: LOGIN_FAIL
      });
    }
  };


  // Login Volunteer User
export const loginVolunteer = (email, password) => async dispatch => {
  console.log("log")
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ email, password });
  console.log("hello");

  try {
    const res = await axios.post('/api/volunteerAuth', body, config);


    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadVolunteerUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};


  // Logout / Clear Profile
export const logout = () => dispatch => {
    dispatch({ type: CLEAR_PROFILE });
    dispatch({ type: LOGOUT });
  };