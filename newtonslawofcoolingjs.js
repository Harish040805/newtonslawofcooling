const form = document.getElementById('calculator-form');
const resultDiv = document.getElementById('result');

function toCelsius(temp, unit) {
    if (unit === "C") return temp;
    if (unit === "F") return (temp - 32) * 5/9;
    if (unit === "K") return temp - 273.15;
}

function fromCelsius(temp, unit) {
    if (unit === "C") return temp;
    if (unit === "F") return (temp * 9/5) + 32;
    if (unit === "K") return temp + 273.15;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const t1 = parseFloat(document.getElementById('temperature1').value);
    const u1 = document.getElementById('unit1').value;
    const t2 = parseFloat(document.getElementById('temperature2').value);
    const u2 = document.getElementById('unit2').value;

    const temperature1 = toCelsius(t1, u1);
    const temperature2 = toCelsius(t2, u2);

    const time1 = 0;
    const time2 = parseFloat(document.getElementById('time2').value);

    const coolingRateInput = document.getElementById('cooling-rate').value;
    const coolingRate = parseFloat(coolingRateInput);

    const surroundingTemperature = toCelsius(parseFloat(document.getElementById('surrounding-temperature').value), "C");

    const originalTemperatureInput = document.getElementById('original-temperature').value;
    const originalTemperature = parseFloat(originalTemperatureInput);

    let resultHtml = '';

    if (!isNaN(temperature1) && !isNaN(temperature2) && !isNaN(time2) && isNaN(coolingRate)) {
        const k = calculateK(temperature1, temperature2, time2 - time1, surroundingTemperature);
        resultHtml += `<p>Cooling Rate (k): ${k}</p>`;
    }

    if (!isNaN(temperature1) && !isNaN(time2) && !isNaN(coolingRate)) {
        const temp2CalcC = calculateTemperature(temperature1, coolingRate, time2 - time1, surroundingTemperature);
        const temp2Display = fromCelsius(temp2CalcC, u2);

        if (Math.abs(temp2CalcC - temperature2) > 0.01) {
            resultHtml += `<p>Temperature at time ${time2} minutes: ${temp2Display}°${u2} (Note: mismatch)</p>`;
        } else {
            resultHtml += `<p>Temperature at time ${time2} minutes: ${temp2Display}°${u2}</p>`;
        }
    }

    if (!isNaN(temperature1) && !isNaN(temperature2) && !isNaN(coolingRate)) {
        const timeCalculated = calculateTime(temperature1, temperature2, coolingRate, surroundingTemperature);
        resultHtml += `<p>Time: ${timeCalculated} minutes</p>`;
    }

    if (!isNaN(temperature1) && !isNaN(coolingRate) && isNaN(originalTemperature)) {
        const origC = calculateOriginalBodyTemperature(temperature1, coolingRate, time1, surroundingTemperature);
        const origDisplay = fromCelsius(origC, u1);
        resultHtml += `<p>Original Body Temperature: ${origDisplay}°${u1}</p>`;
    }

    if (!isNaN(coolingRate) && !isNaN(time2) && !isNaN(temperature2) && isNaN(t1)) {
        const initC = calculateInitialTemperature(temperature2, coolingRate, time2, surroundingTemperature);
        const initDisplay = fromCelsius(initC, u1);
        resultHtml += `<p>Temperature 1: ${initDisplay}°${u1}</p>`;
    }

    resultDiv.innerHTML = resultHtml;
});

function calculateK(t1, t2, time, Ts) {
    return Math.log(Math.abs((t1 - Ts) / (t2 - Ts))) / time;
}

function calculateTemperature(T0, k, time, Ts) {
    return Ts + (T0 - Ts) * Math.exp(-k * time);
}

function calculateTime(T0, Tt, k, Ts) {
    return Math.log(Math.abs((T0 - Ts) / (Tt - Ts))) / k;
}

function calculateOriginalBodyTemperature(T, k, time, Ts) {
    return Ts + (T - Ts) / Math.exp(-k * time);
}

function calculateInitialTemperature(Tt, k, time, Ts) {
    return (Tt - Ts) / Math.exp(-k * time) + Ts;
}
