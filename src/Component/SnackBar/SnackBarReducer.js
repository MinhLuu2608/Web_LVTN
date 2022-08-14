// import * as React from 'react';

import { SET_CLOSE_SNACKBAR, SET_MESSAGE, SET_OPEN_SNACKBAR, SET_SEVERITY, } from "./SnackBarConst"

const initState = {
    open: false,
    severity: 'success',
    message: 'Test SnackBar'
}

function SnackBarReducer(state, action) {
    switch (action.type) {
        case SET_OPEN_SNACKBAR:
            return {
                ...state,
                open: true
            }
        case SET_CLOSE_SNACKBAR:
            return {
                ...state,
                open: false
            }
        case SET_SEVERITY:
            return {
                ...state,
                severity: action.payload
            }
        case SET_MESSAGE:
            return {
                ...state,
                message: action.payload
            }
        default:
            throw new Error('Invalid Action.')
    }
}

export { initState }
export default SnackBarReducer