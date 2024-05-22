// Form validation
(() => {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }

            form.classList.add('was-validated')
        }, false)
    })
})()


async function logIn({email, password, api}){

    const request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    };

    // send email and password to server
    const response = await fetch(api, request);
    const status = response.status;
    const data = await response.json();

    // Return the result only if the status is 200 (OK), else return false
    return status === 200 ? data : false;

}

function showToast({toastElement, toastBodyElement, bgColor, msg}){
    // Run BootStrap5's toast to show the activity is complete.
    const toastEl = toastElement;
    const toastBody = toastBodyElement;
    toastEl.classList.remove("bg-success"); //remove all known and used colors here first
    toastEl.classList.remove("bg-danger");  //remove all known and used colors here first
    toastEl.classList.add(`bg-${bgColor}`);
    toastEl.classList.add("text-white");
    toastBody.textContent = msg;
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
}