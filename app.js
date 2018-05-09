console.log("app running");

// calculator UI controller

const calcUI = (() => {
	const DOMstrings = {
		opDisplay: ".operation_display",
		buttons: ".buttons",
		resDisplay: ".result_display"
	};
	let currentDisplay = "";
	let htmlDisplay = "";
	return {
		updateOpDisplay(newHtml) {
			let symbols = ["*", "/", "+", "-"];
			
            
			console.log(currentDisplay);
			if (symbols.includes(newHtml)) {
				document.querySelector(DOMstrings.opDisplay).innerHTML = "";
				htmlDisplay = "";
				currentDisplay = currentDisplay + newHtml;
			} else {if (newHtml === "+/-"){
				htmlDisplay = (Number(htmlDisplay)*-1).toString();
				document.querySelector(DOMstrings.opDisplay).innerHTML = htmlDisplay;
				currentDisplay = (Number(currentDisplay)*-1).toString(); 
			}
				else {
				htmlDisplay = htmlDisplay + newHtml;
				document.querySelector(DOMstrings.opDisplay).innerHTML = htmlDisplay;
				currentDisplay = currentDisplay + newHtml;
			}
			}
            
            
		},
		calculateTotal() {
			let total = +eval(currentDisplay).toFixed(2);
			currentDisplay = total.toString();
			htmlDisplay=total.toString();
			// document.querySelector(DOMstrings.resDisplay).innerHTML = total;
			document.querySelector(DOMstrings.opDisplay).innerHTML = total;

		},
		delete() {
			calculator.init();
			currentDisplay = "";
			htmlDisplay = "";
		},
		percentage(){
			let percentage = Number(htmlDisplay)/100;
			htmlDisplay = percentage.toString();
			currentDisplay = percentage.toString();
			document.querySelector(DOMstrings.opDisplay).innerHTML = percentage;
		},
		domStrings() {
			return DOMstrings;
		}
	};

})();

// main calculator controller

const calculator = ((calcUI, calcController) => {
	let DOMstrings;
	DOMstrings = calcUI.domStrings();
	//event listner for all buttons
	document.querySelector(DOMstrings.buttons), addEventListener("click", (e) => {
		let number = e.target.id;
		//when = is pressed 
		if (e.target.classList.contains("result")) {
			console.log("calculate total");
			calcUI.calculateTotal();
		}
		// for any other button
		if (e.target.className !== "result" && e.target.id !== "%" ) {
			calcUI.updateOpDisplay(number);
		}
		//delete button
		if (e.target.id === "c") {
			calcUI.delete();
		}
		// % calculate percentage
		if (e.target.id === "%") {
			calcUI.percentage();
		}


	});
	return {
		// init funciton
		init() {
			document.querySelector(DOMstrings.opDisplay).textContent = "0";	
		}
	};


})(calcUI);
calculator.init();