const yesBtn = document.querySelector(".yes");
const noBtn = document.querySelector(".nah");
const termsModalContainer = document.querySelector(".terms-modal-container");


isAgree = localStorage.getItem("isAgree")
if(isAgree){
	
}else{
	termsModalContainer.style.opacity = 1;
	termsModalContainer.style.pointerEvents = "auto";
}

noBtn.addEventListener("click", ()=>{
	location = window.location.href
	// alert(location)
})

yesBtn.addEventListener("click", ()=>{
	localStorage.setItem("isAgree",true)
	termsModalContainer.style.opacity = 0;
	termsModalContainer.style.pointerEvents = "none";
})
