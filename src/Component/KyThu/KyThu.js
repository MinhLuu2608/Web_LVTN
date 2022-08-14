import SnackBarProvider from "../SnackBar/SnackBarProvider";
import KyThuMain from "./KyThuMain";

export default function KyThu(){
    return(
        <SnackBarProvider>
            <KyThuMain />
        </SnackBarProvider>
    )
        
}