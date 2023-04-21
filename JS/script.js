document.addEventListener('DOMContentLoaded', function () {
    const button1 = document.getElementById("loginFormOpen");
    const button2 = document.getElementById("listform");
    const button3 = document.getElementById("logout");
    const cookies = document.cookie.split(";");
    const myCookie = cookies.find(cookie => cookie.trim().startsWith("token="));
    const myCookieValue = myCookie ? myCookie.trim().substring("token=".length) : null;
    const authToken = myCookieValue
    if (authToken) {
        button1.style.display = "none";
        button2.style.display = "block";
        button3.style.display = "block";
    }
});

function openForm() {
    document.getElementById("myForm").style.display = "block";
}
function logoutVendor() {
    document.cookie.split(";").forEach(function (c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
    window.location.reload();
}

async function closeForm() {
    try {
        const button1 = document.getElementById("loginFormOpen");
        const button2 = document.getElementById("listform");
        document.getElementById("myForm").style.display = "none";
        const form = document.getElementById("login-form");
        async function sendData() {
            const email = await document.getElementById("email").value;
            const password = await document.getElementById("password").value;
            const response = await fetch(`http://localhost:6600/auth/login`, {
                method: "POST",
                body: JSON.stringify({ email, password }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
            const data = await response.json();
            if (response.status === 200) {
                alert('You have login successfully');
                document.cookie = `token=${data.token}`;
                const authToken = document.cookie
            } else {
                alert(`${data.message}`);
            }
            if (authToken) {
                button1.style.display = "none";
                button2.style.display = "block";
            }
        }

        form.addEventListener("submit", (event) => {
            event.preventDefault();
            sendData();
        });
    } catch (error) {
        console.log(error)
    }
}

function openSignUpForm() {
    document.getElementById("myForm").style.display = "none";
    document.getElementById("SignUpForm").style.display = "block";
}

async function closeSignUpForm() {
    // event.preventDefault();
    try {
        document.getElementById("SignUpForm").style.display = "none";
        const form = document.getElementById("signup-form");
        async function sendData() {
            const name = await document.getElementById("name").value;
            const email = await document.getElementById("email1").value;
            const password = await document.getElementById("password1").value;
            const response = await fetch(`http://localhost:6600/auth/register`, {
                method: "POST",
                body: JSON.stringify({ name, email, password }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
            const data = await response.json();
            if (response.status === 200) {
                alert('You have registered successfully');
            } else {
                alert(`${data.message}`);
            }
        }
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            sendData();
        });
    } catch (error) {
        console.log(error)
    }
}

function closeSignUpOpenLogin() {
    document.getElementById("myForm").style.display = "block";
    document.getElementById("SignUpForm").style.display = "none";
}

function closeBoth() {
    closeSignUpForm();
    closeForm();
}

// Listing Form Functionalitis
function openListingForm() {
    document.getElementById("listingForm").style.display = "block";
}
function closeListing() {
    document.getElementById("listingForm").style.display = "none";
}

function closeListingForm() {
    try {
        document.getElementById("listingForm").style.display = "none";
        const form = document.getElementById("listingForm1");
        const cookies = document.cookie.split(";");
        const myCookie = cookies.find(cookie => cookie.trim().startsWith("token="));
        const myCookieValue = myCookie ? myCookie.trim().substring("token=".length) : null;
        const authToken = myCookieValue
        async function sendData() {
            const fullName = await document.getElementById("placeName").value;
            const Bathroom = await document.getElementById("Bathrooms").value;
            const Bedroom = await document.getElementById("Bedrooms").value;
            const file1 = document.getElementById("image");
            const dimension = await document.getElementById("dimensions").value;
            const Prize = await document.getElementById("price").value;
            var ele = document.getElementsByName('category');


            let formData = new FormData();
            formData.append('fullName', fullName);
            formData.append('Bathroom', Bathroom);
            formData.append('Bedroom', Bedroom);
            formData.append('file', file1.files[0]);
            formData.append('dimension', dimension);
            formData.append('Prize', Prize);
            for (i = 0; i < ele.length; i++) {
                if (ele[i].checked)
                    formData.append('Category', ele[i].value);
            }
            // const file = file1.files[0]
            const response = await fetch(`http://localhost:6600/product/products`, {
                method: "POST",
                body: formData,
                headers: {
                    "authorization": `${authToken}`
                }
            });
            if (response.status == 201) {
                await response.json();
                alert('The Product registered successfully');
            }
        }
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            // console.log(authToken)
            sendData();
        });
    } catch (error) {
        alert(error);

        // console.log(error)
    }
}


// form.addEventListener("keyup", (event) => {
//     if (event.keyCode === 13) {
//         event.preventDefault();
//         return false;
//     }
// })
// const inputField = document.getElementById("amenities");

// document.addEventListener("click", function (e) {
//     const target = e.target.closest("#amenityCross"); // Or any other selector.

//     if (target) {
//         document.getElementById("amenityCross").parentNode.remove();
//     }
// });

// inputField.addEventListener("keyup", (event) => {
//     if (event.keyCode === 13) {
//         event.preventDefault();
//         const inputValues = inputField.value.split(",");
//         document.getElementById("amenityBox").innerHTML += "<div class= amenityBoxes>" + inputValues + "<span id=amenityCross class=amenityCross> X </span>" + "</div>";
//         console.log(inputValues);
//         inputField.value = "";
//     }

// });