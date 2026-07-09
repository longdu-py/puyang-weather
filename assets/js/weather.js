// 默认华龙区经纬度
const defaultLat = 35.7762;
const defaultLon = 115.0186;

// 区县经纬度映射
const cityCoord = {
    hualong: {lat:35.7762, lon:115.0186},
    puyangxian: {lat:35.6980, lon:114.9560},
    qingfeng: {lat:35.8960, lon:115.1010},
    nanle: {lat:36.0730, lon:115.2080},
    fanxian: {lat:35.7520, lon:115.4760},
    taiqian: {lat:35.9350, lon:115.7820}
};

// 区县下拉切换事件
document.getElementById("citySelect").addEventListener("change", function () {
    const cityKey = this.value;
    const coord = cityCoord[cityKey];
    getNowWeather(coord.lat, coord.lon);
})

// 气象编码转图标+中文文字
function parseWeatherCode(code) {
    const map = {
        0: { icon: "☀️", text: "晴空万里" },
        1: { icon: "⛅", text: "大部晴朗" },
        2: { icon: "⛅", text: "多云" },
        3: { icon: "☁️", text: "阴天" },
        45: { icon: "🌫️", text: "有雾" },
        48: { icon: "🌫️", text: "霜雾" },
        51: { icon: "🌧️", text: "小雨" },
        53: { icon: "🌧️", text: "中雨" },
        55: { icon: "🌧️", text: "大雨" },
        61: { icon: "🌨️", text: "小雪" },
        71: { icon: "❄️", text: "大雪" },
        80: { icon: "🌦️", text: "短时阵雨" },
        95: { icon: "⛈️", text: "雷阵雨" }
    }
    return map[code] || { icon: "🌤️", text: "未知天气" };
}

// 请求实时天气接口
async function getNowWeather(latitude = defaultLat, longitude = defaultLon) {
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m&wind_speed_unit=kmh&timezone=Asia/Shanghai`;
    try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        const curr = data.current;
        const weatherInfo = parseWeatherCode(curr.weather_code);

        // 页面赋值
        document.getElementById("icon").innerText = weatherInfo.icon;
        document.getElementById("temp").innerText = curr.temperature_2m;
        document.getElementById("feels").innerText = curr.apparent_temperature;
        document.getElementById("text").innerText = weatherInfo.text;
        document.getElementById("humidity").innerText = curr.relative_humidity_2m;
        document.getElementById("wind").innerText = `${curr.wind_direction_10m}° ${curr.wind_speed_10m} km/h`;
    } catch (err) {
        alert("天气数据加载失败，请检查网络");
        console.error(err);
    }
}

// 页面加载自动获取华龙区天气
window.onload = function () {
    getNowWeather();
}
