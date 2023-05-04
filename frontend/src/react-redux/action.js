import axios from 'axios';
import { GET_DATA } from './types';


export const getData = () => dispatch => {
  axios.get('http://localhost:3003/admin/dashboard/employeedetails')
    .then(res =>

      dispatch({
        type: GET_DATA,
        payload: res.data,
      })
    )
    .catch(err => console.log(err));
};
