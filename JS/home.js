document.addEventListener('DOMContentLoaded', function () {
    async function getData() {
        const response = await fetch(`http://localhost:6600/product/`, {
            method: "GET",
        });
        if (response.status == 200) {
            const data = await response.json()
            if (data) {
                const cardContainer = document.getElementById('card-item');
                for (const user of data) {
                    const elem = user.result
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
                    img.style.width = "600px"
                    img.style.height = "100%"
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
                    h6.textContent = `By: ${user.name}`
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
                    price.textContent = `$${elem.Prize} / month with taxes`
                    rightContent.appendChild(price)

                    const li1 = document.createElement("li")
                    const imgIcon2 = document.createElement("img")
                    imgIcon2.src = "../assets/images/listing-icon-02.png"
                    imgIcon2.alt = "../assets/images/listing-icon-02.png"
                    li1.appendChild(imgIcon2)
                    li1.textContent = `${elem.ingredients.find((ele) => ele.Bedroom).Bedroom} Bedroom`

                    const li2 = document.createElement("li")
                    const imgIcon3 = document.createElement("img")
                    imgIcon3.src = "../assets/images/listing-icon-03.png"
                    imgIcon3.alt = "../assets/images/listing-icon-03.png"
                    li2.appendChild(imgIcon3)
                    li2.textContent = `${elem.ingredients.find((ele) => ele.Bathroom).Bathroom} Bathroom`

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
                    anchorContact.onclick = function () { contactForm(elem._id) }
                    anchorContact.appendChild(iContact)
                    anchorContact.textContent = "Contact Now"
                    mainMenu.appendChild(anchorContact)
                    rightContent.appendChild(mainMenu)

                    lisitng.appendChild(rightContent)

                    cardContainer.appendChild(row)
                    // })
                }
            }
        }
    }
    getData()

    function contactForm(id) {
        const dialogBox = document.getElementById('dialog')
        const cardContainer = document.createElement('dialog');
        cardContainer.id = 'contactDialog';
        cardContainer.open = true
        const formContainer = document.createElement('form')
        formContainer.id = "contactForm"
        formContainer.className = 'form-container'
        const i1 = document.createElement('i')
        i1.className = 'far fa fa-times'
        i1.style = "position: absolute; font-size:25px; font-style: normal;color:#2b2d42;margin-left:97%; top:-11px; cursor: pointer;"
        i1.onclick = function () { closeContactForm() }
        formContainer.appendChild(i1)

        const h1 = document.createElement('h1')
        h1.className = "form-heading"
        h1.textContent = "Interested? Contact Owner"
        formContainer.appendChild(h1)

        const label1 = document.createElement('label')
        label1.for = 'Contactname'
        const bold = document.createElement('b')
        bold.textContent = "Name"
        label1.appendChild(bold)
        formContainer.appendChild(label1)

        const input1 = document.createElement('input')
        input1.type = 'text'
        input1.className = 'form-control'
        input1.id = 'Contactname'
        input1.placeholder = "Enter Name"
        input1.name = "name"
        input1.required = true
        formContainer.appendChild(input1)

        const label2 = document.createElement('label')
        label2.for = 'Contactemail'
        const bold2 = document.createElement('b')
        bold2.textContent = "Email"
        label2.appendChild(bold2)
        formContainer.appendChild(label2)

        const input2 = document.createElement('input')
        input2.type = 'text'
        input2.className = 'form-control'
        input2.id = 'Contactemail'
        input2.placeholder = "Enter Email"
        input2.name = "email"
        input2.required = true
        formContainer.appendChild(input2)

        const label3 = document.createElement('label')
        label3.for = 'Contactemail'
        const bold3 = document.createElement('b')
        bold2.textContent = "Enter Your Query"
        label3.appendChild(bold3)
        formContainer.appendChild(label3)

        const input3 = document.createElement('input')
        input3.type = 'text'
        input3.className = 'form-control'
        input3.id = 'message'
        input3.placeholder = "Message for Owner"
        input3.name = "message"
        input3.style = "height:200px; width:380px"
        input3.required = true
        formContainer.appendChild(input3)

        const input4 = document.createElement('input')
        input4.type = 'submit'
        input4.className = 'btn cancel'
        input4.id = 'message'
        input4.name = "submit"
        input4.style = "background-color: #2b2d42;"
        input4.value = "send"
        input4.onclick = closeSignUpForm(id)
        formContainer.appendChild(input4)

        async function closeSignUpForm(id) {
            formContainer.addEventListener("submit", (event) => {
                event.preventDefault()
                contactOwner(id)
            })
        }
        cardContainer.appendChild(formContainer)
        dialogBox.appendChild(cardContainer)
    }

    function closeContactForm() {
        console.log("close")
        document.getElementById("contactDialog").open = false;
    }

    async function contactOwner(id) {
        const Name = await document.getElementById("Contactname").value;
        const email = await document.getElementById("Contactemail").value;
        const message = await document.getElementById("message").value;
        console.log(Name, email, message, id)
        const response = await fetch(`http://localhost:6600/client/clientInfo/${id}`, {
            method: "POST",
            body: JSON.stringify({ Name: Name, email: email, message: message }),
        });
        const data = await response.json();
        if (response.status === 200) {
            window.alert(`${data.msg}\nYour token is: ${data.token}`)
            document.getElementById("contactDialog").close();
        } else {
            console.log(data.err)
        }
    }
})

