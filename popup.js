document.addEventListener("DOMContentLoaded", function(event) {


var elem = document.getElementById("try_button");

/*chrome.runtime.sendMessage({want:"gettst_id"}, function (response) {
	console.log(response.tst_id);
	document.getElementById('try_tst_id').textContent = (response.tst_id);
});
*/


elem.addEventListener( "click" ,  function() {
	let maxtry;
		maxtry = document.getElementById('try_pole').value;
		maxtry = check_onint(maxtry);
	let wait = 	document.getElementById('wait').value;
		chrome.runtime.sendMessage({want:"saveNumberMaxTry", data:maxtry , interval: wait});


	});

});

function check_onint(data){
	data = data.trim();
	data = Number(data);
	if(data === undefined){ alert('Enert only number!'); return null}
	return data;
}



