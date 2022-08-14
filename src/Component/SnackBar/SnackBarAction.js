import { SET_CLOSE_SNACKBAR, SET_MESSAGE, SET_OPEN_SNACKBAR, SET_SEVERITY } from './SnackBarConst';


export const setOpenSnackBar = () => ({
    type: SET_OPEN_SNACKBAR, 
}) 
export const setCloseSnackBar = () => ({
    type: SET_CLOSE_SNACKBAR, 
}) 
export const setSeverity = payload => ({
    type: SET_SEVERITY,
    payload 
}) 
export const setMessage = payload => ({
    type: SET_MESSAGE,
    payload 
}) 