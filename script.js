const temperatureInput = document.getElementById("temperature");
const fromUnit = document.getElementById("fromUnit");
const toUnit = document.getElementById("toUnit");
const convertBtn = document.getElementById("convertBtn");
const clearBtn = document.getElementById("clearBtn");
const resultValue = document.getElementById("resultValue");
const swapBtn = document.getElementById("swapBtn");

convertBtn.addEventListener("click", convertTemperature);

function convertTemperature() {
    const temperature = parseFloat(temperatureInput.value);
    const from = fromUnit.value;
    const to = toUnit.value;

    if (isNaN(temperature)) {
        resultValue.textContent = "Please enter a valid temperature";
        return;
    }

    if (from === "kelvin" && temperature < 0) {
    resultValue.textContent = "Kelvin cannot be below 0 K";
    return;
    }

    let celsius;

    // Convert input to Celsius first
    if (from === "celsius") {
        celsius = temperature;
    } else if (from === "fahrenheit") {
        celsius = (temperature - 32) * 5 / 9;
    } else if (from === "kelvin") {
        celsius = temperature - 273.15;
    }

    let result;

    // Convert Celsius to target unit
    if (to === "celsius") {
        result = celsius;
    } else if (to === "fahrenheit") {
        result = (celsius * 9 / 5) + 32;
    } else if (to === "kelvin") {
        result = celsius + 273.15;
    }

    resultValue.textContent = `${result.toFixed(2)}° ${getUnitSymbol(to)}`;
}

function getUnitSymbol(unit) {
    if (unit === "celsius") {
        return "C";
    } else if (unit === "fahrenheit") {
        return "F";
    } else {
        return "K";
    }
}

clearBtn.addEventListener("click", clearConverter);

function clearConverter() {
    temperatureInput.value = "";
    fromUnit.value = "celsius";
    toUnit.value = "fahrenheit";
    resultValue.textContent = "--";
}

temperatureInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        convertTemperature();
    }
});

swapBtn.addEventListener("click", function () {
    const currentFrom = fromUnit.value;

    fromUnit.value = toUnit.value;
    toUnit.value = currentFrom;

    if (temperatureInput.value !== "") {
        convertTemperature();
    }
});