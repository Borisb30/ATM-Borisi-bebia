let username,
	correct_pass = (/^[0-9]{4}$/),
	passTry = 3,
	currentBalance = 35000;
	
// Input -მომხმარებლის სახელი
function atmMachineUsername() {
	username = prompt("Enter your name");
	if (username !== "" && username !== null) {
		atmMachinePassword();
	} else {
		atmMachineUsername();
	}
}
// Input არასწორი პაროლი
function atmMachinePassword() {
	let pswEntry = parseInt(prompt("Dear " + username + ", enter your 4 digit PIN"));
	checkPassword(pswEntry);
}
// ვამოწმებთ პაროლის სისწორეს
function checkPassword(userInput) {
    if (correct_pass.test(userInput)){
        selectAccountType();
    } else {
        while (!(correct_pass.test(userInput))) {
            if (passTry === 1) {
				alert("Incorrect PIN.");
            	alert("Maximum tries exceeded! Your account has been locked. Contact your bank for support."); 
                exit();
                break;
            } else {
				passTry -= 1;
				alert("Incorrect PIN. Please try again.");
				alert("You have " + passTry + " chance/s to try");
            	atmMachinePassword();
			}
        }
    }
}
// ვამოწმებთ account_ის ტიპს
function selectAccountType() {
    let accountType = parseInt(prompt("Which type of account do you have? \n 1. Savings \n 2. Current \n 3. Credit"));
	if (accountType !== "" && accountType !== null && !isNaN(accountType)) {
		selectFunction();
	} else {
		alert("Please make a valid selection");
		selectAccountType();
	}
}
// ავარჩიოთ რა უნდა მომხმარებელს
function selectFunction() {
	let atmFunctions = parseInt(prompt("Hello " + username + ", what can we do for you today? \n 1. Inquiry \n 2. Withdrawal \n 3. Deposit \n 4. Exit"));
	if (atmFunctions !== "" && atmFunctions !== null && !isNaN(atmFunctions)) {
		switch (atmFunctions) {
			case 1:
				inquiry();
				break;
			case 2:
				withdrawal();
				break;
			case 3:
				deposit();
				break;
			case 4:
				exit();
				break;
			default:
				alert("Please make a valid selection");
				selectFunction();
		}
	} else {
		alert("Please make a valid selection");
		selectFunction();
	}
}
// ბალანსის შემოწმება
function inquiry() {
	alert("Your current balance is $" + currentBalance);
	toContinue();
}
// დეპოზიტი
function deposit() {
	let depositAmount = parseInt(prompt("How much do you want to deposit?"));
	if (depositAmount !== "" && depositAmount !== null && !isNaN(depositAmount)) {
		currentBalance += depositAmount;
		alert("You have successfully deposited $" + depositAmount + "\n" + "You now have $" + currentBalance);
		toContinue();
	} else {
		alert("Error: please enter a number!");
		deposit();
	}
}
// გამოტანა
function withdrawal() {
	let withdrawalAmount = parseInt(prompt("How much do you want to withdraw? \n" + "The minimum amount you can withdraw is $1000"));
	if (withdrawalAmount !== "" && withdrawalAmount !== null && !isNaN(withdrawalAmount)) {
		if (withdrawalAmount >= 1000) {
			if (withdrawalAmount <= currentBalance) {
				currentBalance -= withdrawalAmount;
				alert("Transaction successful!");
				alert("Your remaining balance is $" + currentBalance);
				toContinue();
			} else {
				alert("You do not have sufficient funds!");
				withdrawal();
			}
		} else {
			alert("You must withdraw at least $1000");
			withdrawal();
		}
	} else {
		alert("Error: please enter a number!");
		withdrawal();
	}
}	
// მომხმარებელს სურს თუ არა  ATM-ის გამოყენება
function toContinue(){
    let yesOrNo = parseInt(prompt("Do you want to perform another transaction? \n 1. Yes \n 2. No"));
	if (yesOrNo !== "" && yesOrNo !== null) {
    	if (yesOrNo === 2){
			exit();
    	}
		else {
			selectAccountType(); 
    	}
	} else {
		alert("Please make a valid selection");
		toContinue();
	}
}
// გამოსვლა ATM-დან
function exit() {
	alert("Thank you for patronising our ATM machine");
		atmMachineUsername();
}