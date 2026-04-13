
let cities_name = [
    { ar: 'دمشق', en: 'Damascus' },
    { ar: 'حلب', en: 'Aleppo' },
    { ar: 'حمص', en: 'Homs' }, 
    { ar: 'اللاذقية', en: 'Latakia' }, 
    { ar: 'حماة', en: 'Hama' }
];

for (let city of cities_name) {
    let content = `<option value="${city.ar}">${city.ar}</option>`;
    document.getElementById('city_select').innerHTML += content;
};

document.getElementById('city_select').addEventListener('change', function () {
    let cityName = "";
    for (let city of cities_name) {
        if (city.ar === this.value) {
            cityName = city.en;
            break;
        }
    }
    getPrayersTimingsByCity(cityName);
    document.getElementById('city_name').textContent = this.value;
})

function getPrayersTimingsByCity(cityName) {
    let params = {
        city: cityName,
        country: 'Syria',
        method: 3
    };
    axios.get('https://api.aladhan.com/v1/timingsByCity', {
        params: params
    })
    .then(function (response) {
        let time = response.data.data.timings;
        FillTimeForPrayer('fagr', time.Fajr);
        FillTimeForPrayer('sunrise', time.Sunrise);
        FillTimeForPrayer('dhuhr', time.Dhuhr);
        FillTimeForPrayer('asr', time.Asr);
        FillTimeForPrayer('sunset', time.Sunset);
        FillTimeForPrayer('isha', time.Isha);
        let date = response.data.data.date.gregorian.date;
        let day = response.data.data.date.hijri.weekday.ar;
        document.getElementById('date').textContent = day + ' ' + date;
    })
    .catch(function (error) {
        console.log(error);
    });
}
getPrayersTimingsByCity("Damascus");
function FillTimeForPrayer(id,time) {
    document.getElementById(id).nextElementSibling.firstElementChild.textContent = time;
}