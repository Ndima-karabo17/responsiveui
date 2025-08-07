const btns = document.querySelectorAll(".tabs-btn");
const contents = document.querySelectorAll(".tab-content");

btns.forEach(btn => {
    btn.addEventListener("click", () => {

        btns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        

        contents.forEach(c => c.classList.remove("active-content"));

    
        if (btn.classList.contains("fileTran")) {
            document.getElementById("file-transfer-content").classList.add("active-content");
        } else if (btn.classList.contains("temp")) {
            document.getElementById("temperature-content").classList.add("active-content");
        }
    });
});


function clearText() {
    document.getElementById("size-type").value = '';
    document.getElementById("speed").value = '';
}


function calculate() {
    let input1 = parseFloat(document.getElementById("size-type").value);
    let input2 = parseFloat(document.getElementById("speed").value);
    let size_choice = document.getElementById("size-speed").value;
    let speed_choice = document.getElementById("speed-name").value;

    if (isNaN(input1) || isNaN(input2) || input1 < 0 || input2 < 0) {
        document.querySelector('.estimate-time p').textContent = "Please enter positive numbers";
        return;
    }

    let sizeInBits;
    switch (size_choice) {
        case "gigabytes":
            sizeInBits = input1 * 8 * 1024 * 1024 * 1024;
            break;
        case "megabytes":
            sizeInBits = input1 * 8 * 1024 * 1024;
            break;
        case "kilobytes":
            sizeInBits = input1 * 8 * 1024;
            break;
        default:
            sizeInBits = input1;
    }

    let speedInBps;
    switch (speed_choice) {
        case "gigabits":
            speedInBps = input2 * 1000000000;
            break;
        case "megabits":
            speedInBps = input2 * 1000000;
            break;
        case "kilobits":
            speedInBps = input2 * 1000;
            break;
        default:
            speedInBps = input2;
    }

    let timeInSeconds = sizeInBits / speedInBps;
    let hours = Math.floor(timeInSeconds / 3600);
    let minutes = Math.floor((timeInSeconds % 3600) / 60);
    let seconds = Math.floor(timeInSeconds % 60);

    let result = [];
    if (hours > 0) result.push(`${hours} hour${hours !== 1 ? "s" : ""}`);
    if (minutes > 0) result.push(`${minutes} minute${minutes !== 1 ? "s" : ""}`);
    if (seconds > 0 || result.length === 0) result.push(`${seconds} second${seconds !== 1 ? "s" : ""}`);

    document.querySelector('.estimate-time p').textContent = result.join(", ");
}


function convertTemperature() {
    const temp = parseFloat(document.getElementById("temp-input").value);
    const unit = document.getElementById("temp-unit").value;
    let result;

    if (isNaN(temp)) {
        result = "Please enter a valid temperature.";
    } else {
        switch (unit) {
            case "celsius":
                result = `${(temp * 9/5 + 32).toFixed(2)} °F, ${(temp + 273.15).toFixed(2)} K`;
                break;
            case "fahrenheit":
                result = `${((temp - 32) * 5/9).toFixed(2)} °C, ${(((temp - 32) * 5/9) + 273.15).toFixed(2)} K`;
                break;
            case "kelvin":
                result = `${(temp - 273.15).toFixed(2)} °C, ${((temp - 273.15) * 9/5 + 32).toFixed(2)} °F`;
                break;
        }
    }

    document.getElementById("temp-result").textContent = result;
}
