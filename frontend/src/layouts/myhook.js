import { useEffect, useState } from "react"

const myhook=()=>{
    const [width,setWidth] = useState();
    const [height,setHeight] = useState();
    useEffect(()=>{
        const handleResize =()=>{

            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
        }
        window.addEventListener("resize", handleResize);
    })

    return {width,height}
}
export default myhook;
// const [width,height]=myhook();
// console.log(width,height);