const hiddenPassword = document.querySelector(".fa-eye-slash");

hiddenPassword.onclick = () => {
  const password = document.querySelector("#userPassword");
  if (password.type === "password") {
    password.type = "text";
    hiddenPassword.classList.remove("fa-eye-slash");
    hiddenPassword.classList.add("fa-eye");
  } else {
    password.type = "password";
    hiddenPassword.classList.add("fa-eye-slash");
    hiddenPassword.classList.remove("fa-eye");
  }
};

const step1 = document.querySelector('.first-input');
const step2 = document.querySelector('.second-input');
function nextStepRegister(){

  step1.style.display = 'none';
  step2.style.display = 'flex';
}

function previewImage(input) {
  const file = input.files[0];
  const reader = new FileReader();
  const imgElement = document.getElementById('selectedImage');

  reader.onload = function(e) {
      imgElement.style.display = 'block';
      imgElement.src = e.target.result;
  };

  reader.readAsDataURL(file);
}



