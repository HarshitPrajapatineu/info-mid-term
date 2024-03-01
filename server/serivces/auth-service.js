function checkLogin (username, password) {
    if(checkSession()) {
        validateCreds(username, password)
    }
    
}

function validateCreds(username, password) {
    
}
function checkSession() {
    return true;
}