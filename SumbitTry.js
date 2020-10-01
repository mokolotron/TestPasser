//save all chosen input
//and from it searching label and appropriate ask

answers  = [];

function isChecked(elems){
    let filtred_elems = [];
    for (i = 0; i < elems.length; i++) {
        if (elems[i].getAttribute('checked') === "checked")
            filtred_elems.push(elems[i]);
    }
    return filtred_elems;
}

const end_button1 = document.querySelector('body > div > div > div.row.page-container > div.page-container-page-when-sidemenu > div.page-contents > form > div > fieldset > div.row.buttons > input');


end_button1.addEventListener('click', function() {
    let answers_html = document.querySelectorAll('input');
    answers_html = isChecked(answers_html);

    for( let n_answer = 0; n_answer < answers_html.length - 1; n_answer ++) {
        let ask = answers_html[n_answer];

        while(ask.className !== "row")
            ask = ask.parentNode;

        answers.push(
            {
                "ASK" : ask.firstChild.textContent,
                "ANSWER" : answers_html[n_answer].parentNode.
                            querySelector('label').textContent,
                "RATING" : null
            });
    }

    chrome.runtime.sendMessage({want: "sumbitAnswers", answers_t: answers});
});