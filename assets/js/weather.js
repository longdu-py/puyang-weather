// 城市编码 濮阳各区县
const cityCode = {
    hualong: "101180701",   //华龙区
    puyangxian: "101180702",//濮阳县
    qingfeng: "101180703",  //清丰
    nanle: "101180704",     //南乐
    fanxian: "101180705",   //范县
    taiqian: "101180706"    //台前
};
let nowCity = cityCode.hualong;

// 替换你自己的和风天气key（官网免费申请）
const KEY = "你的和风天气KEY";

// 加载实时天气
async function getNowWeather(){
    const res = await fetch(`https://devapi.qweather.com/v7/weather/now?location=${nowCity}&key=${KEY}`);
    const data = await res.json();
    if(data.code !== "200"){
        alert("天气数据获取失败，请检查key");
        return;
    }
    const now = data.now;
    document.getElementById("temp").innerText = now.temp;
    document.getElementById("feels").innerText = now.feelsLike;
    document.getElementById("text").innerText = now.text;
    document.getElementById("wind").innerText = now.windDir + now.windScale + "级";
    document.getElementById("humidity").innerText = now.humidity;
    document.getElementById("icon").innerText = getWeatherIcon(now.icon);
}

// 天气图标转换
function getWeatherIcon(icon){
    const map = {
        "100":"☀️","101":"⛅","102":"⛅","103":"🌤️","104":"☁️",
        "300":"🌧️","301":"🌦️","400":"🌨️","500":"🌫️","999":"🌪️"
    };
    return map[icon] || "🌤️";
}

// 切换区县
document.getElementById("citySelect").addEventListener("change",function(){
    const val = this.value;
    nowCity = cityCode[val];
    getNowWeather();
})

// 页面加载执行
window.onload = function(){
    getNowWeather();
}
