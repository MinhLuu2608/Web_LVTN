import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import MuiAlert from '@mui/material/Alert';
import SnackBarContext from '../SnackBar/SnackBarContext';
import { setCloseSnackBar } from '../SnackBar/SnackBarAction';
// import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
})
function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
}

export default function SnackBar( {children}) {
    const transition = TransitionUp

    const [state, dispatch] = React.useContext(SnackBarContext)

    const {open, severity, message} = state

    const handleClose = () => {
        dispatch(setCloseSnackBar())
    }
    
    return (
        <div>
            {/* <Snackbar
                open={open}
                onClose={handleClose}
                severity={severity}
                TransitionComponent={transition}
                message="I love snacks"
                key={transition ? transition.name : ''}
            /> */}
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                TransitionComponent={transition}
                key={transition ? transition.name : ''}
            >
                <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
            {children}
        </div>
    )
}
