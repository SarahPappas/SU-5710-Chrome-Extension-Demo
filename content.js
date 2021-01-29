window.onload = function() {
    const passwordEl = document.querySelectorAll('input[type="password"]')[0];
    const possibleUserIdEls = document.querySelectorAll('input[type="text"]');
    
    if (passwordEl) {
        console.log("password", passwordEl);
    }

    if (possibleUserIdEls) {
        if (possibleUserIdEls) {
            possibleUserIdEls?.forEach(idEl => {
                console.log("idEl?", idEl);
            });
        }
    }

}

