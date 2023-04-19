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
                    anchorContact.href = `mailto:${user.email}`
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
})