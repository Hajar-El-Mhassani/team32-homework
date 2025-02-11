
const checkWeatherTemperature = (temperature) => {
    if (temperature > 25) {
        return 'Shorts and t-shirt';
    } else if (temperature > 15) {
        return 'Jeans and t-shirt';
    }
    else if (temperature > 10) {
        return 'Jacket and jeans';
    }

    else if(temperature >5) {
        return 'Jacket, jeans and scarf';
    }
    else if(temperature > 0) {
        return 'Jacket, jeans, scarf and gloves';
    }
    else {
        return 'Jacket, jeans, scarf, gloves and hat';
    }
}

console.log(checkWeatherTemperature(1));