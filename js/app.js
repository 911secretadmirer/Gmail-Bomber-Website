/*
* Author: Fazle Rabbi
* Date: 4 Feb, 2023
*/

const modBtn = document.querySelector(".mod-btn");
const form = document.querySelector("form");
const allLabel = document.querySelectorAll("label");
const allInput = document.querySelectorAll("input");

// Toggle dark mode
const toggleDarkMode = () => {
		modBtn.classList.replace("fa-moon","fa-sun");
		form.style.background = "#162958";
		
		allLabel.forEach((label)=>{
			label.style.color = "white";
		});
		
		allInput.forEach((input)=>{
		   input.style.background = "#162958";
		   input.style.color = "white";
		});	
};

// Toggle light mode
const toggleLightMode = () => {
		modBtn.classList.replace("fa-sun","fa-moon");
		form.style.background = "#ededed";
		
		allLabel.forEach((label)=>{
			label.style.color = "teal";
		});
		
		allInput.forEach((input)=>{
			input.style.background = "white";
			input.style.color = "#222";
		});
};

// Check [Light/Dark] mode by getting status from localStorage
mode = localStorage.getItem("mode_status");
if(mode != null){
	if(mode == "dark"){
		toggleDarkMode();
	}
	else{
		toggleLightMode();
	}
}

modBtn.addEventListener("click", function(e){
	class_name = e.target.className;
	// Turning On Dark Mode
	if(class_name.includes("moon")){
		// Set mode status in localStorage
		localStorage.setItem("mode_status", "dark");
		toggleDarkMode();
	}
	
	// Turning On Light Mode
	else{
		// Set mode status in localStorage
		localStorage.setItem("mode_status", "light");
		toggleLightMode();
	}
});


// Change Label Color When Click On The Input & Enabled Dark Mode!
if(mode == "dark"){
	allInput.forEach((input)=>{
		input.addEventListener("click",function(){
			current_label = input.previousElementSibling;
			current_label.style.color = "#52e8c0";
		});
		
		input.addEventListener("focusout", ()=>{
			allLabel.forEach((label)=>{
				label.style.color = "white";
			});
		});
	});
}
