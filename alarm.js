const currentTime = document.querySelector("h1"),
selectMenu = document.querySelectorAll("select"),
setAlarmbtn = document.querySelector("button");


let alarmTime, isAlarmSet = false,
ringtone= new Audio("./files/ringtone.mp3")
 

for(let i = 12; i > 0; i--) {
    i= i < 10 ? "0" + i : i;
    let option=`<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend",option);
}

for(let i = 59; i >= 0; i--) {
    i= i < 10 ? "0" + i : i;
    let option=`<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend",option);
}

for(let i = 2; i > 0; i--) {
    let apm=i==1? "AM":"PM";
    let option=`<option value="${apm}">${apm}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend",option);
}

setInterval(() =>{
    // getting real time
    let date=new Date(),
    h = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds(),
    ampm="AM";
    
    if(h>12){
        h=h-12;
        ampm="PM";
    }
    
    //if hours value is 0, set this to 12
    h=h==0? h=12:h;
    // adding 0 before values h,m,s if value is less than 10
    h=h<10? "0"+h:h;
    m=m<10? "0"+m:m;
    s=s<10? "0"+s:s; 

    currentTime.innerText =`${h}:${m}:${s} ${ampm}`;

    if (alarmTime==`${h}:${m} ${ampm}`){
        ringtone.play();
        ringtone.loop = true;
    }
}, 1000);

function setAlarm(){
    
    if(isAlarmSet){ // if alarmset is true
        alarmTime=""; // clear the value of time
        ringtone.pause();
        setAlarmbtn.innerText = "Set Alarm";
        return isAlarmSet=false;
    }

    let time=`${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;

    if(time.includes("Hours") || time.includes("Minutes") || time.includes("AM/PM")){
        return alert("please select valid time to set Alarm !");
    }

    isAlarmSet = true;
    alarmTime = time;
    setAlarmbtn.innerText="Clear Alarm";
}

setAlarmbtn.addEventListener("click", setAlarm);