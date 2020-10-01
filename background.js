Try = {
	maxTry:0,
	stop: false,
	numer: 0,
	wait: 0,
	tst_id: 'undef',
	answers: [],
	ifend(){
		if (this.numer/this.maxTry < 1 && this.maxTry !== 0) return false;
		else return true;
	},
	thestop(){
		this.numer = 0;
		this.maxTry = 0;
	},
	add_result(result){
		answers.map(function(answer){
			answer["RATING"] = result;
		});
		console.log(answers);
	}

};



chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");				
	// console.log(sender.tab);
	  if (request.want === "wantSTOP"){
			Try.stop = true;
	  }

	if (sender.tab){
		
		if (request.want === "wantSaveResult"){
			Try.add_result(request.result);
		}
		else if(request.want === "sumbitAnswers"){
			Try.answers = request.answers_t
		}
		else if(request.want === "IfStop" ){
			let theend = Try.ifend();
			sendResponse({end: theend});
			if(theend) Try.thestop()

		}
		else if( request.want === "++numer" ){
			Try.numer +=1;
		}
		else if( request.want === "getWait" ){
			console.log(Try.wait);
			sendResponse({interval : Try.wait})

		}
		else if( request.want === "SaveTestId" ){
			Try.tst_id = request.tst_id;
			console.log(Try.tst_id); //debug
		}
		else if( request.want === "openNew" ){
			chrome.tabs.remove(sender.tab.id, function () {
				console.log(Try.tst_id);
				var newURL = 'https://dl.tntu.edu.ua/mods/_standard/tests/test_intro.php?tid=' + Try.tst_id;
				chrome.tabs.create({ url: newURL, active:false });
			});

		}


	} 
	else {
		if (request.want === "saveNumberMaxTry"){
			Try.maxTry = request.data;
			let wait = request.interval;
			if(wait !== undefined)
				Try.wait = +wait
		}
		if (request.want === "gettst_id"){
			sendResponse({tst_id: Try.tst_id})
		}


		
	}


  });



  
