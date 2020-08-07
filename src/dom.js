import convertTemp from './convertTemp';

const clearElement = (element) => {
  element.innerHTML = '';
};

const renderTemp = (ul, btn, temperatureData) => {
  clearElement(ul);
  const tempText = ['Current Temp', 'Feels Like', 'Min Temp', 'Max Temp'];
  if (btn.textContent === 'To Farenhite') {
    btn.textContent = 'To Celsius';
    tempText.forEach((item, i) => {
      const li = document.createElement('li');
      const temp = convertTemp.kelvinToF(temperatureData[i]);
      li.textContent = `${item} : ${temp}`;
      ul.appendChild(li);
    });
  } else {
    btn.textContent = 'To Farenhite';
    tempText.forEach((item, i) => {
      const li = document.createElement('li');
      const temp = convertTemp.kelvinToC(temperatureData[i]);
      li.textContent = `${item} : ${temp}`;
      ul.appendChild(li);
    });
  }
};

const renderData = (weatherData) => {
  const weatherDiv = document.querySelector('#weatherDiv');
  weatherDiv.classList.add('animate');
  clearElement(weatherDiv);
  const iconDiv = document.createElement('div');
  const h1 = document.createElement('h1');
  const h2 = document.createElement('h2');
  const img = document.createElement('img');
  const ul = document.createElement('ul');
  const btn = document.createElement('button');
  btn.setAttribute('class', 'btn');
  btn.textContent = 'To Celsius';
  const temperatureData = Object.values(weatherData.main);
  renderTemp(ul, btn, temperatureData);
  btn.addEventListener('click', () => renderTemp(ul, btn, temperatureData));
  iconDiv.setAttribute('class', 'icon');
  img.src = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
  h1.textContent = `${weatherData.name}, ${weatherData.sys.country}`;
  h2.textContent = weatherData.weather[0].description;
  iconDiv.appendChild(h1);
  iconDiv.appendChild(img);
  weatherDiv.appendChild(iconDiv);
  weatherDiv.appendChild(h2);
  weatherDiv.appendChild(ul);
  weatherDiv.appendChild(btn);
  weatherDiv.addEventListener('animationend', () => {
    weatherDiv.classList.remove('animate');
  });
};

export default renderData;