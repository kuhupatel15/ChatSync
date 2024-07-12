var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const getTime =(msgtime)=>{
    const time = new Date(msgtime)
    const hours = time.getHours();
    const minute = time.getMinutes();
    const formattedHours = hours < 10 ? '0' + hours : hours;
    const formattedMinutes = minute < 10 ? '0' + minute : minute;
    return `${formattedHours}:${formattedMinutes}`
}

export const isSendByUser = (sender,userId)=>{
    // console.log(sender)
    // console.log( userId)

    
    return (sender!==userId)
}
export const getMsgTime = (msgTime,divider)=>{
    let currentTime= new Date().toLocaleDateString().split("/");
    const chatDate=new Date(msgTime);
    let date = new Date(msgTime).toLocaleDateString();
    let time= new Date(msgTime).toLocaleDateString().split("/");
    const day = currentTime[1]-time[1]
    const month = currentTime[0]-time[0]
    const year = currentTime[2]-time[2];
    if(day===0&&month===0&&year===0){
        return divider?"Today":getTime(msgTime);
    }
    else if(day===1&&month===0&&year===0){
        return "Yesterday" ;
    }
    else if(day<8&&month===0&&year===0){
        return days[chatDate.getDay()] ;
    }
    else{
        return date;
    }
}
export const compareTime = (arr,index)=>{
    // const currentTime = new Date();
    if(index===0){return getMsgTime(arr[index].createdAt)}
    else{
    const curr = arr[index].createdAt;
    const prev = arr[index-1].createdAt;
    // console.log(prev)
    const currMsgTime = new Date(curr).toLocaleDateString().split("/")
    const prevMsgTime = new Date(prev).toLocaleDateString().split("/")
    const day = currMsgTime[1]- prevMsgTime[1];
    
    if(day>0){
        return getMsgTime(arr[index].createdAt,'divider'
        )
    }
    else {
        return;
    }}
    // console.log(currentTime)
}