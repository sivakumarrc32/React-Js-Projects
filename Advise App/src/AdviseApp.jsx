import { useEffect, useState } from 'react'
function AdviseApp() {

    const [advice,setAdvice]=useState("Need a spark of wisdom? Your advice is one click away");
    const [count,setCount]=useState(0);

    async function getAdvice(){
        const res = await fetch("https://api.adviceslip.com/advice");
        const data = await res.json();
        setAdvice(data.slip.advice);
        setCount((c)=> c+1);
    }
    
    return (
        <>
        <div className='frame container-sm col-sm-6'>
            <img src="image/advice.jpg" alt=""  className='img'/>
            <h3>{advice}</h3>
            <button className='advise'onClick={getAdvice}>Get Advice</button>
            <p><span>{count}</span> Advice you have Readed</p>

            <p>&copy;Designed By Sivakumar</p>
        </div>
        </>
  )
}

export default AdviseApp
