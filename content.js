class InputReader {
    watchedEls = [];
    keyStrokeTimeOut = 1000;
    elTypes =[{querySelector: 'input[type="password"]', name: 'password'},
            {querySelector: 'input[type="text"]', name: 'possibleUserId'}];

    checkForInputs() {
        this._readUserInput(document);
    }

    readUserInput(node) {
        this.elTypes.forEach(type => {
            const foundEls = node.querySelectorAll(type.querySelector);        
            if (foundEls) {
                foundEls.forEach(el => {
                    if (!this.watchedEls.find(watchedEl => watchedEl == el)) {
                        console.log("adding el");
                        this.watchedEls.push(el);
                        this._inputLogger(el, type.name, this.keyStrokeTimeOut, this._onDoneTyping);
                    }
                });
            }   
        })
    }

    _onDoneTyping(input, elName) {
        console.log(elName + ": " + input);
    }

    _inputLogger(inputEl, elName, typingInterval, onDoneTyping, observer){
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
}

const waitLoad = (waitTimeSeconds) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("done waiting");
            resolve();
        })
    }, waitTimeSeconds * 1000);
};

const listenForMutation = (onMutation) => {
    const mutationObserver = new MutationObserver(mutations => {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes?.length) {
                onMutation();
            }
        });
    });

    mutationObserver.observe(document.documentElement, {
        childList: true,
        subtree: true,
      })
};

const replaceWords = (targetWordReplacementPairList) => {
    [...document.body.children]
        .filter(child => child.innerText && child.innerText.length)
        .forEach(child => {
            targetWordReplacementPairList.
                forEach(pair => {
                    const regEx = new RegExp(pair[0],"gi");
                    child.innerHTML = child.innerHTML.replaceAll(regEx, pair[1]);
            })
        });
};

window.onload = () => {
    waitLoad(1)
        .then(() => {
            console.log("readingInput");
            const inputReader = new InputReader();
            inputReader.readUserInput(document);
            listenForMutation(() => {inputReader.checkForInputs});
        })
    replaceWords([["Your", "Gandalf's"], ["Personal", "My Precious"], ["Facebook", "Eye of Sauron"] ]);
};