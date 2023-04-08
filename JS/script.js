document.addEventListener('DOMContentLoaded', function () {
    const button1 = document.getElementById("loginFormOpen");
    const button2 = document.getElementById("listform");
    const cookies = document.cookie.split(";");
    const myCookie = cookies.find(cookie => cookie.trim().startsWith("token="));
    const myCookieValue = myCookie ? myCookie.trim().substring("token=".length) : null;
    const authToken = myCookieValue
    if (authToken) {
        button1.style.display = "none";
        button2.style.display = "block";
    }
    async function getData() {
        const response = await fetch(`http://localhost:6600/product/`, {
            method: "GET",
        });
        if (response.status == 200) {
            const data = await response.json()
            if (data) {
                console.log(data)
                const cardContainer = document.getElementById('card-item');
                data.forEach((elem) => {
                    // Create a card element
                    const row = document.createElement('div');
                    row.classList.add('row')

                    const card = document.createElement('div');
                    card.classList.add('col-lg-12')
                    row.appendChild(card)

                    const lisitng = document.createElement('div');
                    lisitng.classList.add('listing-item')
                    card.appendChild(lisitng)

                    const leftImg = document.createElement('div');
                    leftImg.classList.add('left-image')
                    lisitng.appendChild(leftImg)



                    const anchorleft = document.createElement('a');
                    const img = document.createElement('img');
                    img.src = `http://localhost:6600/product/fileinfo/${elem.imageUrl}`
                    img.alt = elem.fullName
                    anchorleft.appendChild(img)
                    leftImg.appendChild(anchorleft)

                    const rightContent = document.createElement('div');
                    rightContent.className = 'right-content align-self-center'

                    const anchorright = document.createElement('a');
                    rightContent.appendChild(anchorright)

                    const h4 = document.createElement("h4")
                    h4.textContent = `${elem.fullName}`
                    anchorright.appendChild(h4)
                    rightContent.appendChild(anchorright)

                    const h6 = document.createElement("h6")
                    h6.textContent = `By: Sale Agent`
                    rightContent.appendChild(h6)

                    const rate = document.createElement('ul');
                    rate.classList.add('rate')
                    const list = document.createElement("li")
                    const list2 = document.createElement("li")
                    list2.textContent = `0 Reviews`
                    const i = document.createElement("i")
                    i.className = "fa fa-star-o"
                    list.appendChild(i)
                    rate.appendChild(list)
                    rate.appendChild(list2)
                    rightContent.appendChild(rate)

                    const price = document.createElement("span")
                    price.classList.add("price")
                    const divIcon = document.createElement('div');
                    divIcon.classList.add("icon")
                    const imgIcon1 = document.createElement("img")
                    imgIcon1.src = "../assets/images/listing-icon-01.png"
                    imgIcon1.alt = "../assets/images/listing-icon-01.png"
                    divIcon.appendChild(imgIcon1)
                    price.appendChild(divIcon)
                    price.textContent=`$${elem.Prize} / month with taxes`
                    rightContent.appendChild(price)

                    const li1 = document.createElement("li")
                    const imgIcon2 = document.createElement("img")
                    imgIcon2.src = "../assets/images/listing-icon-02.png"
                    imgIcon2.alt = "../assets/images/listing-icon-02.png"
                    li1.appendChild(imgIcon2)
                    li1.textContent = `${elem.ingredients.find((ele)=>ele.Bedroom).Bedroom} Bedroom`

                    const li2 = document.createElement("li")
                    const imgIcon3 = document.createElement("img")
                    imgIcon3.src = "../assets/images/listing-icon-03.png"
                    imgIcon3.alt = "../assets/images/listing-icon-03.png"
                    li2.appendChild(imgIcon3)
                    li2.textContent = `${elem.ingredients.find((ele)=>ele.Bathroom).Bathroom} Bathroom`

                    const detail = document.createElement("span")
                    detail.classList.add("details")
                    detail.textContent = `Details: ${elem.dimension} sq ft`
                    rightContent.appendChild(detail)

                    const info = document.createElement('ul');
                    info.classList.add('info')
                    info.appendChild(li1)
                    info.appendChild(li2)
                    rightContent.appendChild(info)

                    const mainMenu = document.createElement('div');
                    mainMenu.classList.add('main-white-button')
                    const iContact = document.createElement("i")
                    iContact.classList.add("fa", "fa-eye")
                    const anchorContact = document.createElement('a');
                    anchorContact.href = "../contact.html"
                    anchorContact.appendChild(iContact)
                    anchorContact.textContent = "Contact Now"
                    mainMenu.appendChild(anchorContact)
                    rightContent.appendChild(mainMenu)

                    lisitng.appendChild(rightContent)

                    cardContainer.appendChild(row)
                })
            }
        }
    }
    getData()
});

function openForm() {
    document.getElementById("myForm").style.display = "block";
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
            alert('You have login successfully');
            document.cookie = `token=${data.token}`;
            const authToken = document.cookie
            console.log(authToken)
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
            console.log(name, email, password)
            const response = await fetch(`http://localhost:6600/auth/register`, {
                method: "POST",
                body: JSON.stringify({ name, email, password }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
            const data = await response.json();
            alert('You have registered successfully');
            console.log(data)
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
            let formData = new FormData();
            formData.append('fullName', fullName);
            formData.append('Bathroom', Bathroom);
            formData.append('Bedroom', Bedroom);
            formData.append('file', file1.files[0]);
            formData.append('dimension', dimension);
            formData.append('Prize', Prize);
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