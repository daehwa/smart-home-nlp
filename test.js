const ON = "TurnOn";
const OFF = "TurnOff";
const SET_BRI = "SetBrightness";
const IN_BRI = "IncreaseBrightness";
const DE_BRI = "DecreaseBrightness";
const SET_CT =  "SetColortemp";
const IN_CT =  "IncreaseColortemp";
const DE_CT =  "DecreaseColortemp";

var namespaces = [ON,OFF,SET_BRI,IN_BRI,DE_BRI,SET_CT,IN_CT,DE_CT];

var PythonShell = require('python-shell');
var hashmap = require('hashmap');

var args = process.argv.slice(2);
var sentence = args[0];
var options = {
	args: sentence
};

const CASES = 8;

var action = null;
var name = "";
var device = "light";
var num = null;
var value = null;

PythonShell.run('./ex.py', options, function (err, results) {
	if (err) throw err;
	
	var sen = Array();
	for(var i=0; i<results.length; i++){
		var word = results[i].split("(");
		word = word[1].split(")");
		console.log(word[0]);
		word = word[0].split(" ");
		var hash = new hashmap();
		hash.set("class",word[0]);
		for(var j=1;j<word.length;j++){
			var w = word[j].split("/");
			hash.set(w[0],w[1]);
		}
		sen.push(hash);
		//comprehend(word[0],hash);
		//comprehend(word[0],word.slice(1,word.length));
	}
	comprehendAction(sen);
  var json = {
      action: action,
      device: device,
      num: num,
			value: value,
			friendlyName: name
    };
	console.log(JSON.stringify(json));
});

function comprehendAction(sen){
	var oneHot = [0,0,0,0,0,0,0,0];
	for(i in sen){
		sen[i].forEach(function(value,key){
			if(key != "class"){
				var word_tb = require('./word_list/'+value+'.json');
				var hot = word_tb[key];
				if(hot != undefined){
					for(var h=0;h<hot.length;h++){
						if(hot[h]=="1") oneHot[h]++;
					}
				}
			}
		})
	}
	var index = oneHot.indexOf(Math.max.apply(null, oneHot)); // find highest possibility one.
	action = namespaces[index];
	console.log(action);
}

function comprehend(word_class,lang){
	switch(word_class){
		case "NP":
			handleNP(lang);
			break;
		case "VP":
			handleVP(lang);
			break;
		case "AP":
			handleAP(lang);
			break;
	}
}

function handleNP(lang){
	var key = lang.search("Number");
	if(key!=null){
		if(lang.has("조명"))
			num = key;
		else{
			value = key;
		}
	}
}
function handleVP(lang){
	var has = lang.has("켜");
	if(has) action = "TurnOn";
}
function handleAP(lang){
	
}
