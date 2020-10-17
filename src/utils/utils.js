// 中国时区时间
export var ChinaTime= (time)=>{
  let date = new Date(time);
  return date.getFullYear()+'/'+repairZero((date.getMonth()+1))+"/"+repairZero(date.getDate())+" "+repairZero(date.getHours())+":"+repairZero(date.getMinutes())+":"+repairZero(date.getSeconds())
}

// 不满10补零函数
var repairZero=(time)=> {
  return time < 10 ? "0" + time : time;
}
export var ChinaDate= (time)=>{
  let date = new Date(time);
  return date.getFullYear()+'/'+repairZero((date.getMonth()+1))+"/"+repairZero(date.getDate())
}


// 国标时间
export var UTCTime= (time)=>{
  let date = new Date(time);
  return date.getUTCFullYear()+'/'+date.getUTCMonth()+"/"+date.getUTCDate()+" "+date.getUTCHours()+":"+date.getUTCMinutes()+":"+date.getSeconds()
}
