// const loadPhone = async () => {
//     const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=iphone`)
//     const mobile = await res.json();
//     displayPhones(mobile);
// }

// const displayPhones = (phones) => {
//     console.log(phones);
// }

// loadPhone();





const loadPhone = async (text = 13, isShowAll ) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${text}`)
    const mobile = await res.json();
    displayPhones(mobile.data, isShowAll);
}

const displayPhones = (phones, isShowAll) => {
    // console.log(phones);
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';

  
    const showAllContainer = document.getElementById('show-allContainer');
    if(phones.length > 12 && !isShowAll){
      showAllContainer.classList.remove('hidden');
    }

    else{
      showAllContainer.classList.add('hidden')
    }
    
    if(!isShowAll){
      phones = phones.slice(0, 12)
    }


    if (phones.length === 0) {
      phoneContainer.innerHTML = `
      <img src="image/404.png" alt="not found">
      <p class="text-center text-white text-3xl mt-24">Sorry !!! <br>This phone is not found.</p>
     `;

      toggleLoadingSpinner(false);
      return;
  }

  
    phones.forEach(phone => {
        console.log(phone)
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-base-100 w-96 shadow-xl`;

        phoneCard.innerHTML = `
        <figure>
            <img
              src="${phone.image}"
              alt="Shoes"]
            />
          </figure>
          <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews phones whose phones does he choose?</p>
            <div class="card-actions justify-end">
              <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
            </div>
          </div>
          `;

          phoneContainer.appendChild(phoneCard);
    })

    toggleLoadingSpinner(false)
}


// Search Field

const handleSearch = (isShowAll) => {
  toggleLoadingSpinner(true)
    const searchField = document.getElementById('search-field');
    const text = searchField.value;
    // console.log(text);
    loadPhone(text, isShowAll)
}

// show all card buttons

const handleShowAll = () => {
  handleSearch(true)
}


// Show Mobile Details
const handleShowDetail = async (id) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
  const data = await res.json();
  const phone = data.data
  showPhoneDetails(phone)
}

const showPhoneDetails = (phone) => {
  const phoneName = document.getElementById('show-detail-phone-name');
  phoneName.innerText = phone.name;

  const showDetailContainer = document.getElementById('show-detail-container');
  showDetailContainer.innerHTML = `
  <img src="${phone.image}" alt="" >
  <p><span>Storage: </span>${phone?.mainFeatures?.storage}</p>
  <p><span>Display Size: </span>${phone?.mainFeatures?.displaySize}</p>
  <p><span>ChipSet: </span>${phone?.mainFeatures?.chipSet}</p>
  <p><span>Memory: </span>${phone?.mainFeatures?.memory}</p>
  <p><span>Sensors: </span>${phone?.mainFeatures?.sensors}</p>
  <p><span>Slug: </span>${phone?.slug}</p>
  <p><span>Name: </span>${phone?.name}</p>
  <p><span>Brand: </span>${phone?.brand}</p>
  <p><span>Image: </span>${phone?.image}</p>
  <p><span>WLAN: </span>${phone?.others?.WLAN}</p>
  <p><span>Bluetooth: </span>${phone?.others?.Bluetooth}</p>
  <p><span>GPS: </span>${phone?.others?.GPS}</p>
  <p><span>NFC: </span>${phone?.others?.NFC}</p>
  <p><span>Radio: </span>${phone?.others?.Radio}</p>
  <p><span>USB: </span>${phone?.others?.USB}</p>
    
  `


  my_modal_1.showModal();

}

// Spinner

const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById('loading-spinner');
  if(isLoading){
    loadingSpinner.classList.remove('hidden')
  }

  else{
    loadingSpinner.classList.add('hidden')
  }
}

loadPhone();



