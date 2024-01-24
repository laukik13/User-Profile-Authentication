// Is logged In

export const isLoggedIn = ()=>{
    let token = localStorage.getItem("token");
    if(token !== null) return true;
    else return false
}

// Do Login

export const doLogin =(data)=>{
    localStorage.setItem("token",JSON.stringify(data));
}


//DoLogout

export const doLogout = ()=>{
    localStorage.removeItem("token");
}