
 var cookie;
    

    if(document.cookie === '') {

    }

    var myTimeout ;

    const CreateCookie = (user) => {
        document.cookie = 'StaffId=' + user + ';  max-age=60000;';

        myTimeout  = setTimeout(Timeout,900000)
    }

    const BreakCookie = (user) => {      
        document.cookie = 'StaffId=' + user + '; expires=Thu,01 Jan 1970 00:00:00 UTC;'
    }



    const Timeout = (cookie)=>{
        BreakCookie(cookie)
        window.location.reload();
    }

    const resetCookie = (user , date) => {
 
        clearTimeout(myTimeout);
        myTimeout = setTimeout(Timeout,900000)
        
        
    }

    const GetCookie = (user) => {    
        cookie  = user.slice(8)
    }   


    


export {CreateCookie,BreakCookie,GetCookie,resetCookie,cookie} 