const form = document.getElementById("calculator-form");
const resultDiv = document.getElementById("result");

function randomGarbage(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

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

form.addEventListener("submit", (e) => {
    e.preventDefault();
    resultDiv.innerHTML = "";

    let logs = "";

    // FETCH INPUTS
    let t1 = document.getElementById("temperature1").value;
    let t2 = document.getElementById("temperature2").value;
    let time2 = document.getElementById("time2").value;
    let k = document.getElementById("cooling-rate").value;
    let T0 = document.getElementById("original-temperature").value;
    const u1 = document.getElementById("unit1").value;
    const u2 = document.getElementById("unit2").value;
    const Ts = parseFloat(document.getElementById("surrounding-temperature").value);

    // APPLY GARBAGE VALUES
    if (t1 === "") {
        const g = randomGarbage(1000, 9000);
        t1 = g;
        document.getElementById("temperature1").value = g;
        logs += `<p>Temperature 1 missing → garbage value assigned: ${g}°${u1}</p>`;
    }

    if (t2 === "") {
        const g = randomGarbage(1000, 9000);
        t2 = g;
        document.getElementById("temperature2").value = g;
        logs += `<p>Temperature 2 missing → garbage value assigned: ${g}°${u2}</p>`;
    }

    if (time2 === "") {
        const g = randomGarbage(1, 50);
        time2 = g;
        document.getElementById("time2").value = g;
        logs += `<p>Time 2 missing → garbage value assigned: ${g} minutes</p>`;
    }

    if (k === "") {
        const g = Math.random().toFixed(3);
        k = g;
        document.getElementById("cooling-rate").value = g;
        logs += `<p>Cooling Rate missing → garbage value assigned: ${g}</p>`;
    }

    if (T0 === "") {
        const g = randomGarbage(1000, 9000);
        T0 = g;
        document.getElementById("original-temperature").value = g;
        logs += `<p>Original Temperature missing → garbage value assigned: ${g}°C</p>`;
    }

    // CONVERT
    const T1c = toCelsius(parseFloat(t1), u1);
    const T2c = toCelsius(parseFloat(t2), u2);
    const kVal = parseFloat(k);
    const tVal = parseFloat(time2);

    // NEWTON'S COOLING LAW CALCULATIONS
    const tempCalc = Ts + (T1c - Ts) * Math.exp(-kVal * tVal);
    const timeCalc = Math.log((T1c - Ts) / (T2c - Ts)) / kVal;
    const T2final = fromCelsius(tempCalc, u2);

    logs += `<p>Calculated Temperature at time ${tVal} minutes: ${T2final.toFixed(3)}°${u2}</p>`;
    logs += `<p>Calculated Time between T1 & T2: ${timeCalc.toFixed(3)} minutes</p>`;
    logs += `<p>Cooling Rate (k): ${kVal}</p>`;

    resultDiv.innerHTML = logs;
});
