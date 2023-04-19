document.addEventListener('DOMContentLoaded', function () {
    const cookies = document.cookie.split(";");
    const myCookie = cookies.find(cookie => cookie.trim().startsWith("token="));
    const myCookieValue = myCookie ? myCookie.trim().substring("token=".length) : null;
    const authToken = myCookieValue
    async function getData() {
        const response = await fetch(`http://localhost:6600/client/clientInfo`, {
            method: "GET",
            headers: {
                "authorization": `${authToken}`
            }
        });
        if (response.status == 200) {
            const data = await response.json()
            // console.log(data)
            if (data) {
                const h2 = document.getElementById('userName');
                h2.textContent = `Hi, ${data.name}`
                const cardContainer = document.getElementById('card-item');
                for (const user of data.product) {
                    const elem = user.imageUrl
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
                    img.src = `http://localhost:6600/product/fileinfo/${elem}`
                    img.alt = user.fullName
                    img.style.width = "500px"
                    img.style.height = "500px"
                    anchorleft.appendChild(img)
                    leftImg.appendChild(anchorleft)

                    const rightContent = document.createElement('div');
                    rightContent.className = 'right-content align-self-center'

                    const anchorright = document.createElement('a');
                    rightContent.appendChild(anchorright)

                    const h4 = document.createElement("h4")
                    h4.textContent = `${user.fullName}`
                    anchorright.appendChild(h4)
                    rightContent.appendChild(anchorright)

                    const h6 = document.createElement("h6")
                    h6.textContent = `By: ${data.name}`
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
                    imgIcon1.src = "https://img.icons8.com/external-line-icons-royyan-wijaya/256/external-detail-ecommerce-bram-bram-line-line-icons-royyan-wijaya.png"
                    imgIcon1.alt = "Details"
                    divIcon.appendChild(imgIcon1)
                    price.appendChild(divIcon)
                    const Detail = document.createElement("span")
                    Detail.textContent = `$${user.Prize} / month with taxes`
                    price.appendChild(Detail)
                    rightContent.appendChild(price)

                    const li1 = document.createElement("li")
                    const imgIcon2 = document.createElement("img")
                    imgIcon2.src = "https://img.icons8.com/ios/256/occupied-bed.png"
                    imgIcon2.alt = "Bed"
                    li1.appendChild(imgIcon2)
                    const textBed = document.createElement("span")
                    textBed.textContent = `${user.ingredients.find((ele) => ele.Bedroom).Bedroom} Bedroom`
                    li1.appendChild(textBed)

                    const li2 = document.createElement("li")
                    const imgIcon3 = document.createElement("img")
                    imgIcon3.src = "https://img.icons8.com/external-icongeek26-outline-icongeek26/256/external-bath-plumbing-icongeek26-outline-icongeek26.png"
                    imgIcon3.alt = "Bath"
                    li2.appendChild(imgIcon3)
                    const textBath = document.createElement("span")
                    textBath.textContent = `${user.ingredients.find((ele) => ele.Bathroom).Bathroom} Bathroom`
                    li2.appendChild(textBath)

                    const detail = document.createElement("span")
                    detail.classList.add("details")
                    detail.textContent = `Details: ${user.dimension} sq ft`
                    rightContent.appendChild(detail)

                    const info = document.createElement('ul');
                    info.classList.add('info')
                    info.appendChild(li1)
                    info.appendChild(li2)
                    rightContent.appendChild(info)

                    const mainMenu = document.createElement('div');
                    mainMenu.classList.add('main-white-button')
                    const anchorCategory = document.createElement('div');
                    anchorCategory.textContent = `Category: ${user.Category}`
                    mainMenu.appendChild(anchorCategory)
                    rightContent.appendChild(mainMenu)

                    lisitng.appendChild(rightContent)

                    cardContainer.appendChild(row)
                    // })
                }
                const ProfileContainer = document.getElementById('ProfileCont');
                for (const user of data.contactedUser) {
                    console.log(user)
                    const ProfileCont = document.createElement('article');
                    ProfileCont.classList.add('profile')
                    const Prof = document.createElement('div');
                    Prof.classList.add('profile-image')
                    const profImag = document.createElement('img')
                    profImag.src = "https://img.icons8.com/clouds/256/user.png"
                    Prof.appendChild(profImag)
                    ProfileCont.appendChild(Prof)

                    const h2 = document.createElement('h2')
                    h2.classList.add('profile-username')
                    h2.textContent = user.Name
                    ProfileCont.appendChild(h2)

                    const profile_handle = document.createElement('small')
                    profile_handle.classList.add('profile-user-handle')
                    profile_handle.textContent = `token: ${user.token}`
                    ProfileCont.appendChild(profile_handle)

                    const profileActions = document.createElement('div')
                    profileActions.classList.add('profile-actions')
                    const btn1 = document.createElement('button')
                    btn1.className = 'btn btn--icon'
                    const textSpan = document.createElement('span')
                    textSpan.textContent = `${user.
                        category}`
                    const i1 = document.createElement('i')
                    i1.className = 'ph-export'
                    btn1.appendChild(i1)
                    profileActions.appendChild(textSpan)
                    profileActions.appendChild(btn1)

                    const profileLinks = document.createElement('div')
                    profileLinks.classList.add('profile-links')
                    const btn2 = document.createElement('button')
                    btn2.className = 'btn btn--primary'
                    btn2.textContent = 'Contact'
                    const contact = document.createElement('a')
                    contact.href = `mailto:${user.email}`
                    contact.appendChild(btn2)
                    profileLinks.appendChild(contact)

                    ProfileCont.appendChild(profileActions)
                    ProfileCont.appendChild(profileLinks)

                    ProfileContainer.appendChild(ProfileCont)
                    // console.log(ProfileContainer)
                }

            }
        }
    }
    getData()
})