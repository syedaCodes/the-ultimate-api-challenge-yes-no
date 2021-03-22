// API
const API_ENDPOINT = 'https://yesno.wtf/api';


/**
 * STEPS:
 *
 * 1. Create a fetchAnswer function and call the API
 * 2. Output the API's response
 * 3. Attach fetchAnswer to an event listener
 * 4. Clear output after 3 seconds
 * 5. Optional: add loading/error states
 *
 */
//DOM elements
const elements = {
    ballSelector: document.querySelector('#ball'),
    input: document.querySelector('.input'),
    answer: document.querySelector('#answer'),
    button: document.querySelector('#button'),
    error: document.querySelector('#error')
}

//Flags
let enableButton = true;
let inProcess = false;

const fetchAnswer = () => {

    if(elements.input.value){

        if(enableButton && !inProcess){
            elements.answer.innerHTML = '<p class="loading">(</p>';

            fetch(API_ENDPOINT)
            .then(data => data.json())
            .then(data => showAnswer(data.answer));

            
            elements.ballSelector.classList.add('shake__ball');
            enableButton = false;
            inProcess = true;
        }
    }
    else{
        elements.error.innerHTML = 'You need to type your question';
    }
};

const showAnswer = answer => {

    setTimeout(() => {
        elements.answer.innerHTML = `<p>${answer}</p>`;
        elements.ballSelector.classList.remove('shake__ball');
        elements.button.setAttribute('disabled', 'disabled');
        cleanup();
    }, 1000);

}

const cleanup = () => {
    
    setTimeout(() => {
        elements.answer.innerHTML='';
        elements.input.value = '';
        elements.button.removeAttribute('disabled');

        //reset
        if(!enableButton && inProcess) {
            enableButton = true;
            inProcess = false;
        }
    }, 3000);
}

const handleKeyEnter = (e) => {
    if(e.keyCode === 13){
        fetchAnswer();
    }
}

elements.button.addEventListener('click', fetchAnswer);
