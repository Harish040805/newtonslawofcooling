const form = document.getElementById('calculator-form');
const resultDiv = document.getElementById('result');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const temperature1 = parseFloat(document.getElementById('temperature1').value);
    const time1 = 0; 
    const temperature2 = parseFloat(document.getElementById('temperature2').value);
    const time2 = parseFloat(document.getElementById('time2').value);
    const coolingRateInput = document.getElementById('cooling-rate').value;
    const coolingRate = parseFloat(coolingRateInput);
    const surroundingTemperature = parseFloat(document.getElementById('surrounding-temperature').value);
    const originalTemperatureInput = document.getElementById('original-temperature').value;
    const originalTemperature = parseFloat(originalTemperatureInput);
    let resultHtml = '';
    if (!isNaN(temperature1) && !isNaN(temperature2) && !isNaN(time2) && !isNaN(surroundingTemperature) && isNaN(coolingRate)) {
        const k = calculateK(temperature1, temperature2, time2 - time1, surroundingTemperature);
        resultHtml += `<p>Cooling Rate (k): ${k}</p>`;
    }
    if (!isNaN(temperature1) && !isNaN(time2) && !isNaN(coolingRate) && !isNaN(surroundingTemperature)) {
        const temperature2Calculated = calculateTemperature(temperature1, coolingRate, time2 - time1, surroundingTemperature);
        if (Math.abs(temperature2Calculated - temperature2) > 0.01) {
            resultHtml += `<p>Temperature at time ${time2} minutes: ${temperature2Calculated}°C (Note: Calculated value does not match provided Temperature 2)</p>`;
        } else {
            resultHtml += `<p>Temperature at time ${time2} minutes: ${temperature2Calculated}°C</p>`;
        }
    }
    if (!isNaN(temperature1) && (temperature2) && !isNaN(coolingRate) && !isNaN(surroundingTemperature)) {
        const timeCalculated = calculateTime(temperature1, temperature2, coolingRate, surroundingTemperature);
        resultHtml += `<p>Time: ${timeCalculated} minutes</p>`;
    }
    if (!isNaN(temperature1) && !isNaN(coolingRate) && !isNaN(time1) && !isNaN(surroundingTemperature) && isNaN(originalTemperature)) {
        const originalBodyTemperature = calculateOriginalBodyTemperature(temperature1, coolingRate, time1, surroundingTemperature);
        resultHtml += `<p>Original Body Temperature: ${originalBodyTemperature}°C</p>`;
    }
    if (!isNaN(coolingRate) && !isNaN(time2) && !isNaN(temperature2) && !isNaN(surroundingTemperature) && isNaN(temperature1)) {
        const initialTemperature = calculateInitialTemperature(temperature2, coolingRate, time2, surroundingTemperature);
        resultHtml += `<p>Temperature 1: ${initialTemperature}°C</p>`;
    }
    resultDiv.innerHTML = resultHtml;
});
function calculateK(temperature1, temperature2, time, surroundingTemperature) {
    return Math.log(Math.abs((temperature1 - surroundingTemperature) / (temperature2 - surroundingTemperature))) / time;
}
function calculateTemperature(initialTemperature, k, time, surroundingTemperature) {
    return surroundingTemperature + (initialTemperature - surroundingTemperature) * Math.exp(-k * time);
}
function calculateTime(initialTemperature, finalTemperature, k, surroundingTemperature) {
    return Math.log(Math.abs((initialTemperature - surroundingTemperature) / (finalTemperature - surroundingTemperature))) / k;
}
function calculateOriginalBodyTemperature(temperature, k, time, surroundingTemperature) {
    return surroundingTemperature + (temperature - surroundingTemperature) / Math.exp(-k * time);
}
function calculateInitialTemperature(finalTemperature, k, time, surroundingTemperature) {
    return (finalTemperature - surroundingTemperature) / Math.exp(-k * time) + surroundingTemperature;
}
