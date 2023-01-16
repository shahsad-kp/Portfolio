

var form = document.getElementById("contact-form");
var nameField = document.getElementById("name");
var email = document.getElementById("email");
var subject = document.getElementById("subject")
var message = document.getElementById("message")

function checkFormEmpty(data) {
  var flag = true;
  for (const pair of data.entries()) {
    if(pair[1] == ''){
      var element = document.getElementById(pair[0]);
      var errorElement = document.getElementById('error-message-' + pair[0]);
      errorElement.style.display = 'block';
      errorElement.innerHTML = "Area should't be empty.."
      element.style.borderColor = "red";
      flag = false;
    }
  }
  return flag
}


async function handleSubmit(event) {
  event.preventDefault();
  var loading = document.getElementById("loading")
  var errorMessage = document.getElementById("error-message")
  var success = document.getElementById("sent-message")
  var data = new FormData(event.target);

  if (!checkFormEmpty(data)){
    alert("Fill all fields to send message..!")
    return
  }

  success.style.display = "none"
  loading.style.display = "block"
  errorMessage.style.display = "none"

  
  fetch(
    event.target.action, 
    {
      method: form.method,  body: data,  headers: {'Accept': 'application/json'}
    }
  ).then(
    response => {
      if (response.ok)
      {    
        success.style.display = "block"
        loading.style.display = "none"
        errorMessage.style.display = "none"
        form.reset()
      }
      else
      {    
        response.json().then(
          data => {
            var errorText;
            if (Object.hasOwn(data, 'errors')) 
            {
              errorText = data["errors"].map(error => error["message"]).join(", ")
            } else {
              errorText = "Oops! There was a problem submitting your form"
            }  
            success.style.display = "none"
            loading.style.display = "none"
            errorMessage.style.display = "block"
            errorMessage.innerHTML = errorText
          }
        )
      }
    }
  ).catch(
    error => {
      success.style.display = "none"
      loading.style.display = "none"
      errorMessage.style.display = "block"
      errorMessage.innerHTML = "Oops! There was a problem submitting your form"
    }
  );
}

function checkEmpty(event) {
  if(event.target.value == ""){
    switch (event.target.id) {
      case 'name':
        var errorElement = document.getElementById("error-message-name")
        var type = 'Name'
        break;
      case 'email':
        var errorElement = document.getElementById("error-message-email")
        var type = 'Email'
        break;
      case 'subject':
        var errorElement = document.getElementById("error-message-subject")
        var type = 'Subject'
        break;
      case 'message':
        var errorElement = document.getElementById("error-message-message")
        var type = 'Message'
        break;
      default:
        break;
    }
    errorElement.style.display = 'block';
    errorElement.innerHTML = type + " can't be empty.."
    event.target.style.borderColor = "red";
  }
  else{
    event.target.style.borderColor = "#ced4da";
  }
}

function restoreError(event) {
  switch (event.target.id) {
    case 'name':
      var errorElement = document.getElementById("error-message-name")
      break;
    case 'email':
      var errorElement = document.getElementById("error-message-email")
      break;
    case 'subject':
      var errorElement = document.getElementById("error-message-subject")
      break;
    case 'message':
      var errorElement = document.getElementById("error-message-message")
      break;
    default:
      break;
  }
  errorElement.style.display = 'none';
  event.target.style.borderColor = "#86b7fe";
}



function ValidateEmail(event) {
  var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!(event.target.value.match(validRegex))) {
    var errorElement = document.getElementById("error-message-email");
    errorElement.style.display = 'block'
    errorElement.innerHTML = 'Email is not in format..!'
  }
}

email.addEventListener("focusout", ValidateEmail)
form.addEventListener("submit", handleSubmit)
nameField.addEventListener("focusout", checkEmpty)
email.addEventListener("focusout", checkEmpty)
subject.addEventListener("focusout", checkEmpty)
message.addEventListener("focusout", checkEmpty)

nameField.addEventListener("focusin", restoreError)
email.addEventListener("focusin", restoreError)
subject.addEventListener("focusin", restoreError)
message.addEventListener("focusin", restoreError)