/* Fox News headline generator script

 Author: Brittany Stafford
 Adapted from: Chris Applegate (qwghlm.co.uk/toys/dailymail/)
 Version: 1.0 March 17. 2015
 License: GNU GPL v2 or later
 


*/

// A more random random generator
function getRandom(a) {

    if (a.length == 1) {
        return a[0];
    }
    
	var n = new Array(50);

	for (var i=0; i<n.length; i++) {
		n[i] = Math.random();
	}

	var m = n[Math.floor(Math.random() * n.length)];
	var o = Math.floor(m * a.length);

	return a[o];

}

// Objects for nouns, modifier verbs and phrases
function Verb(plural, singular, tense) {
	this.singular = singular;
	this.plural = plural;
	this.tense = tense;
}

function Noun(word,person,number) {
	this.word = word;
	this.person = person;
	this.number = number;
}

function Phrase(present, past, active, object) {
	this.present = present;
	this.past = past;
	this.active = active;
	this.object = object;
}

// Auxiliary verbs (the first word in the sentence)
auxiliary_verbs = [
	new Verb("will", "will", "present"), 
	new Verb("could", "could", "present"),
	new Verb("are", "is", "active"),
	new Verb("have", "has", "past")
];


// Subjects (i.e. bad things)
//3,1 = has; 3,2 = have
subjects = [

	new Noun("liberals",3,2),
	new Noun("degenerates",3,2),
	new Noun("abortions",3,2),
	new Noun("homosexuals",3,2),
	new Noun("gays",3,2),
	new Noun("feminism",3,1),
	new Noun("the left",3,1),
	new Noun("marijuana",3,1),    
	new Noun("drugs",3,2),
	new Noun("the liberal media",3,1),


	new Noun("socialists",3,2),
	new Noun("communists",3,2),
	new Noun("Obama",3,1),
	new Noun("muslims",3,2),
	new Noun("welfare queens",3,2),
	new Noun("immigrants",3,2),        
	new Noun("healthcare",3,1),
	new Noun("the unemployed",3,2),
	new Noun("free education",3,1),
	new Noun("obamacare",3,1),
	new Noun("atheists",3,2),   
	new Noun("democrats",3,2),
	new Noun("minimum wage",3,1),
	new Noun("a living wage",3,1), 
	new Noun("the welfare state",3,1),

	
	new Noun("evolution",3,1),
	new Noun("lesbians",3,2),
	new Noun("single mothers",3,2),
	new Noun("facts",3,2),
	
	new Noun("working mothers",3,2),
	
	new Noun("teenage sex",3,1), 
	new Noun("dumbing-down",3,1),
	new Noun("the internet",3,1),
	new Noun("global warming",3,1),
	new Noun("the war on christmas",3,1),
	new Noun("sex education",3,1),
    
];

// Transitive phrases (i.e. bad thing they do)
transitive_phrases = [
	new Phrase("give", "given", "giving", "cancer"),
	new Phrase("infect", "infected", "infecting", "with AIDS"),
	new Phrase("make", "made", "making", "obese"),
	new Phrase("give", "given", "giving", "diabetes"),

	new Phrase("turn","turned","turning","gay"), 

	new Phrase("tax", "taxed", "taxing", ""),
	new Phrase("cheat", "cheated", "cheating", ""),
	new Phrase("defraud", "defrauded", "defrauding", ""),
	new Phrase("steal from","stolen from","stealing from",""),
	new Phrase("devalue","devalued","devaluing",""),
	new Phrase("rip off","ripped off","ripping off",""),
	
	new Phrase("molest","molested","molesting",""),
	new Phrase("have sex with","had sex with","having sex with",""),
	new Phrase("impregnate", "impregnated", "impregnating", ""),

	
	new Phrase("steal the identity of","stolen the identity of","stealing the identity of",""),	

	new Phrase("destroy","destroyed","destroying",""),
	new Phrase("kill","killed", "killing",""),
	new Phrase("ruin","ruined","ruining",""),
	new Phrase("hurt","hurt", "hurting","")
];

// Objects (i.e. saintly, saintly things)
objects = [
	"the american people",
	"the middle class",
	"america",

	"hard-working families",
	"homeowners",
	"taxpayers",
	"taxpayers' money",

	"house prices",
	"property prices",
	
	"america's farmers",
	"god",

	"christians",
	"common sense and decency",
	"the church",

	"you",
	"your mortgage",
	"your pension",
	"your daughters",
	"your children",
	"your house",
	"your pets",
];

// Matches an auxiliary verb with the subject
function match_verb_and_subject(subject, verb) {
	if (subject.number == 1 && subject.person == 3) {
		 return(verb.singular);
	}
	else {
		 return(verb.plural);
	}
}

// Matches the transitive verb's tense with that of the verb
function match_verb_and_tense(verb, phrase) {
	if (verb.tense == "present") {
		return phrase.present;
	}
	else if (verb.tense == "past") {
		return phrase.past;
	}
	else if (verb.tense  == "active") {
		return phrase.active;
	}
}

// Returns a Fox News Headline as a string
function getHeadline() {
	var sentence = [];

	var subject = getRandom(subjects);
		
	var phrase = getRandom(transitive_phrases);
	var verb = getRandom(auxiliary_verbs);
	var object = getRandom(objects);

	
	sentence[0] = subject.word;
	sentence[1] = match_verb_and_subject(subject, verb);
	sentence[2] = match_verb_and_tense(verb, phrase);
	sentence[3] = object;
	if (phrase.object != "") sentence[4] = phrase.object;

	var s = sentence.join(" ").toUpperCase();

	return s;
}

// Sets the content of div or paragraph element called "mail_headline"
function setHeadline() {
	document.getElementById("mail_headline").innerHTML = getHeadline();
}