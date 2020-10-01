chrome.runtime.sendMessage({want:"IfStop"},function(response) {

   let result_t = ducument.querySelector(''); //fill
   chrome.runtime.sendMessage({want: "wantSaveResult", result: result_t} );

    console.log(response.end);
    if (response.end === false) {
        chrome.runtime.sendMessage({want:"openNew"});
    }
});