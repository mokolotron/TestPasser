chrome.runtime.sendMessage({want:"SaveTestId", tst_id:extract_tst_id()});
chrome.runtime.sendMessage({want:"IfStop"},function(response) {

    console.log(response.end);
    if(response.end === false){

        let event = new MouseEvent('click', {
            'view': window,
            'bubbles': true,
            'cancelable': true
        });

        document.querySelector('body > div > div > div.row.page-container > div.page-container-page-when-sidemenu > div.page-contents > form > div > fieldset > div.row.buttons > input.button.btn.btn-primary').dispatchEvent(event);
    }
});

function extract_tst_id() {
    let href = window.location.href;
    href = href.split('=');
    //console.log(href); //debug
    return href[href.length - 1];
}