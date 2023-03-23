const URLs = "http://localhost:5500";
function Login() {
    const form = document.querySelector("#login-form");
    const emailInput = form.querySelector("#email");
    const passwordInput = form.querySelector("#password");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        console.log(emailInput, passwordInput)
        // const formData = new FormData(form);
        const response = await fetch(`${URLs}auth/login`, {
            method: "POST",
            body: { email: emailInput, password: passwordInput }
            ,
        });
        const data = await response.json();
        console.log(data);
    });
}

function signup() {
    const signUpForm = document.querySelector("#signup-form");
    const newNameInput = signUpForm.querySelector("#name");
    const newEmailInput = signUpForm.querySelector("#email1");
    const newPasswordInput = signUpForm.querySelector("#password1");

    signUpForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        console.log(newNameInput, newEmailInput, newPasswordInput)
        //   const formData = new FormData(form);
        const response = await fetch(`${URLs}/auth/register`, {
            method: "POST",
            body: { name: newNameInput, email: newEmailInput, password: newPasswordInput }
        });
        const data = await response.json();
        console.log(data);
    });
}