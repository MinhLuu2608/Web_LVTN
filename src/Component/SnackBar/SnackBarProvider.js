import * as React from 'react';
import SnackBar from './SnackBar';
import SnackbarContext from "./SnackBarContext";
import SnackBarReducer, { initState } from "./SnackBarReducer";


function SnackBarProvider({ children }) {
    const [state, dispatch] = React.useReducer(SnackBarReducer, initState)
    return (
        <SnackbarContext.Provider value={[state, dispatch]}>
            <SnackBar>
                {children}
            </SnackBar>
        </SnackbarContext.Provider>
    )
}

export default SnackBarProvider