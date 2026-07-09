// 濮阳坐标
const lat = 35.7762;
const lon = 115.0186;

// 区县切换绑定
document.getElementById("citySelect").addEventListener("change", function () {
    const val = this.value;
    let newLat, newLon;
    switch (val) {
        case "hualong": newLat = 35.7762; newLon = 115.0186; break;
        case "puyangxian": newLat = 35.6980; newLon = 114.9560; break;
        case "qingfeng": newLat = 35.8960; newLon = 115.1010; break;
        case "nanle": newLat = 36.0730; newLon = 115.2080; break;
        case "fanxian": newLat = 35.7520; newLon = 115.4760; break;
        case "taiqian": newLat = 35.9350; newLon = 115.7820; break;
        default: newLat = 35.7762; newLon = 115.0186;
    }
    getNowWeather(newLat, newLon);
})

// 天气编码转文字+图标
function getWeatherInfo(code) {
    const map = {
        0: { icon: "☀️", text: "晴天" },
        1: { icon: "⛅", text: "大部晴朗" },
        2: { icon: "⛅", text: "多云" },
        3: { icon: "☁️", text: "阴天" },
        45: { icon: "🌫️", text: "雾" },
        48: { icon: "🌫️", text: "霜雾" },
        51: { icon: "🌧️", text: "小雨" },
        53: { icon: "🌧️", text: "中雨" },
        55: { icon: "🌧️", text: "大雨" },
        61: { icon: "🌨️", text: "小雪" },
        71: { icon: "❄️", text: "大雪" },
        80: { icon: "🌦️", text: "阵雨" },
        95: { icon: "⛈️", text: "雷阵雨" }
    }
    return map[code] || { icon: "🌤️", text: "未知天气" };
}

// 获取实时天气
async function getNowWeather(latitude = lat, longitude = lon) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m&wind_speed_unit=kmh&timezone=Asia/Shanghai`;
    const res = await fetch(url);
    const data = await res.json();
    const curr = data.current;

    const weather = getWeatherInfo(curr.weather_code);
    document.getElementById("icon").innerText = weather.icon;
    document.getElementById("temp").innerText = curr.temperature_2m;
    document.getElementById("feels").innerText = curr.apparent_temperature;
    document.getElementById("text").innerText = weather.text;
    document.getElementById("humidity").innerText = curr.relative_humidity_2m;
    document.getElementById("wind").innerText = `${curr.wind_direction_10m}° ${curr.wind_speed_10m} km/h`;
}

window.onload = function () {
    getNowWeather();
}
