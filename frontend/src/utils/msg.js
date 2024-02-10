export const getTime =(msgtime)=>{
    const time = new Date(msgtime)
    const hours = time.getHours();
    const minute = time.getMinutes();
    const formattedHours = hours < 10 ? '0' + hours : hours;
    const formattedMinutes = minute < 10 ? '0' + minute : minute;
    return `${formattedHours}:${formattedMinutes}`
}

export const isSendByUser = (sender,userId)=>{
    // console.log(message.sender)
    // console.log(typeof sender,typeof userId)

    console.log(sender===userId)
    return (sender!==userId)
}
