class Validator{
	constructor(config){
		this.elmConfig = config;
		this.errors={}
		this.genErrorsObj();
		this.inputListener();
	}
	genErrorsObj(){
		for(let i in this.elmConfig){
			this.errors[i] = []
		}
	}
	inputListener(){
		let inpSel = this.elmConfig;

		for(let i in inpSel){
			let selector = `input[name = ${i}]`;
			let el = document.querySelector(selector);
			el.addEventListener('input', this.validate.bind(this));
		}	
	}

	validate(e){
		let elFild = this.elmConfig;
		let fil = e.target;
		let filName = fil.getAttribute('name');
		let filVal = fil.value;

		this.errors[filName] = [];
		if(elFild[filName].required){
			if(filVal === ''){
				this.errors[filName].push("This field can't be empty");
			}
		}
		if(elFild[filName].email){
			if(!this.validateEmail(filVal)){
				this.errors[filName].push('The e-mail address you enter is not valid. Enter valid e-mail addres')
			}
		}
		if(filVal.length < elFild[filName].minlen || filVal.length > elFild[filName].maxlen){
			this.errors[filName].push(`The field need to be min:${elFild[filName].minlen} characters & max: ${elFild[filName].maxlen} characters`);
		}
		if(elFild[filName].match){
			let matchEl = document.querySelector(`input[name="${elFild[filName].match}"]`);

			if(filVal !== matchEl.value){
				this.errors[filName].push("Passwords dont match");
			}
			if(this.errors[filName].length === 0){
				this.errors[filName] = [];
				this.errors[elFild[filName].match] =[];
			}
		}
		this.populateErrors(this.errors);
	}
	populateErrors(errors){
		for(const elem of document.querySelectorAll('ul')){
			elem.remove();
		}
		for(let key of Object.keys(errors)){
			let parElement = document.querySelector(`input[name="${key}"]`).parentElement;
			let errElem = document.createElement('ul');
			parElement.appendChild(errElem);


			errors[key].forEach(error =>{
				let li = document.createElement('li');
				li.innerText = error;
				li.style.color = "red"
				errElem.appendChild(li);
			})


		}
	}
	validateEmail(email){
		if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
		{
			return true;
		}
		return false;
	}
}

