global = {
    rnd:5000 * 60,
    j:0,

};

alt_sel_arr = [
    'p input',
    'ul input'
];
chrome.runtime.sendMessage({want:"IfStop"},function(response) {
    console.log(response.end);
    if(response.end === false) {
        var rows = document.getElementsByClassName('row');
        console.log(rows);
        for (let i = 2; i < rows.length - 2; i++) {
            console.log(i);

            try {
                rows[i].querySelector('ul input').checked = true;
            }catch (e) {
                let t = alt_selectors(0,rows[i]);
                if(t === 'cant find') continue;


            }

        }

        chrome.runtime.sendMessage({want: "++numer"});
        chrome.runtime.sendMessage({want: "getWait"}, function set_rnd_wait (response) {
            console.log(response.interval);
            global.rnd = getRandomInt(+response.interval * 0.9 * 1000 * 60 , +response.interval* 1.1 * 1000 * 60)

        } );
        console.log(global);

        setTimeout( endClick,  global.rnd );


}});

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Включно з мінімальним та виключаючи максимальне значення

}

function endClick () {
    let end_button = document.querySelector('body > div > div > div.row.page-container > div.page-container-page-when-sidemenu > div.page-contents > form > div > fieldset > div.row.buttons > input');
    let event = new MouseEvent('click', {
        'view': window,
        'bubbles': true,
        'cancelable': true
    });
    end_button.dispatchEvent(event);


}

function alt_selectors(is, row) {
    try {
        row.querySelector(alt_sel_arr[is]).checked = true;
    }catch (e) {
        if(is === alt_sel_arr.length ) return 'cant find';
        alt_selectors(is + 1,row )
    }
}


