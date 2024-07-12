import { useEffect, useState } from "react"

export default myhook=()=>{
    const [width,setWidth] = useState();
    const [height,setHeight] = useState();
    useEffect(()=>{
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    })
    return width,height;
}

// const [width,height]=myhook();
// console.log(width,height);

