import React,{useState,useEffect} from 'react'

const useCountDown =(start)=>{
    const [counter,setCounter] = useState(start)
    useEffect(()=>{
        if(counter === 0){
            return
        }
        setTimeout(()=>{
            setCounter(counter - 1)
        },1000)
    },[counter])
    
    return counter
}

export default function Countdown({seconds}) {
    const timeLeft = useCountDown(seconds)
    if(timeLeft ===0){
        return (<div className='text-red-500'>หมดเวลา</div>)
    }else{
        return (
            <div>00 : {timeLeft}</div>
          )
    }
}
