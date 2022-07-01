
const openModal = document.querySelector("#modalOpen").addEventListener('click',  e => {
	e.preventDefault();
	let open = document.querySelector("#modalbox01").style.display="block";
});

let config = {
	'ime_prezime':{
		required:true,
		minlen:3,
		maxlen:50
	},

	'korisnicko_ime':{
		required:true,
		minlen:5,
		maxlen:50
	},
	
	'e-mail':{
		required:true,
		email:true,
		minlen:5,
		maxlen:50
	},

	'lozinka':{
		required:true,
		minlen:7,
		maxlen:25,
		match:'pon_lozinka'
	},
	'pon_lozinka':{
		required:true,
		minlen:7,
		maxlen:25,
		match:'lozinka'
	}
};
let val = new Validator(config);
console.log(val);