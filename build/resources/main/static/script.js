
const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

// functions
const renderCountry = function (data, className = "") {

   const  newhtml = `
        <article class="country ${className}">
            <img class="country__img" src="${data.flags.png}" />
            <div class="country__data">
                <h3 class="country__name">${data.name.common}</h3>
                <h4 class="country__region">${data.region}</h4>
                <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
    ).toFixed(1)}M people</p>
                <p class="country__row"><span>🗣️</span>${
        Object.values(data.languages)[0]
    }</p>
                <p class="country__row"><span>💰</span>${
        Object.values(data.currencies)[0].name
    }</p>
            </div>
        </article>
    `;

     // countriesContainer.insertAdjacentHTML("beforeend", html);
    document.querySelector('.countries').insertAdjacentHTML('beforeend', newhtml);

    // document.getElementById('anil').innerHTML = html;
    //  countriesContainer.style.opacity = 1;
};

const getCountry = function (country) {

    const request = new XMLHttpRequest();
    request.open("GET", `https://restcountries.com/v3.1/name/${country}`);

    request.send();
    if(request.status === 404){
        document.querySelector('.countries').innerHTML = '<h3>ddd</h3>';
    }
    request.addEventListener("load", function () {
        const [data] = JSON.parse(this.responseText);
        console.log(data);
        renderCountry(data);
        const neighbours = data.borders;

        // render neighbours

        neighbours.forEach((country) => {
            const request2 = new XMLHttpRequest();
            request2.open("GET", `https://restcountries.com/v3.1/alpha/${country}`);
            request2.send();
            request2.addEventListener("load", function () {
                const [data] = JSON.parse(this.responseText);
                renderCountry(data, "neighbour");
            });
        });

    });
};

function  getCountryData(){
    event.preventDefault();
  const contryName = document.getElementsByClassName('countryField');
  const country = contryName[0].value;
    contryName[0].value = '';
  document.querySelector('.countries').innerHTML = '';

  getCountry(country);
}

