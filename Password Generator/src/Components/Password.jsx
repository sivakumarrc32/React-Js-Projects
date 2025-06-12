import React, { useState } from 'react'

function Password() {

    const year = new Date().getFullYear();


    //UseState
    const [length,setLength]=useState(8);
    const [includeUppercase,setIncludeUppercase] = useState(true);
    const [includeLowercase,setIncludeLowerrcase] = useState(true);
    const [includeNumber,setIncludeNumber] = useState(true);
    const [includeSymbol,setIncludeSymbol] = useState(true);
    const [password,setPassword]=useState("");
    const [buttonText, setButtonText] = useState("Copy");

    //function

    const generatePassword = () =>{
        let charset ="";
        if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
        if (includeNumber) charset += "0123456789";
        if (includeSymbol) charset += "!@#$%^&*.+";
        let generatedPassword ="";
        for (let i=0;i<length;i++)
        {
            const randomIndex = Math.floor(Math.random()*charset.length);
            generatedPassword += charset[randomIndex];
        }
        setPassword(generatedPassword);  
    };

    const copyToClipBoard = () => {
        navigator.clipboard.writeText(password);
        setButtonText("Copied!");
        setTimeout(() => {
        setButtonText("Copy");
        }, 3000);
    };


  return (
    <>
        <div className="password-generator">
            <h2>Strong Password Generator</h2>
            <div className="input-group">
                <label htmlFor="len">Password Length : </label>
                <input type="number" id='len' value={length} onChange={(e)=>setLength(parseInt(e.target.value))}/>
            </div>
            <div className="checkbox-grp">
                <input type="checkbox" id="upper"  checked ={includeUppercase} onChange={(e)=> setIncludeUppercase(e.target.checked)} />
                <label htmlFor="upper">Include Upper Case</label>
            </div>
            <div className="checkbox-grp">
                <input type="checkbox" id="lower" checked ={includeLowercase} onChange={(e)=> setIncludeLowerrcase(e.target.checked)}/>
                <label htmlFor="lower">Include Lower Case</label>
            </div>
            <div className="checkbox-grp">
                <input type="checkbox" id="number" checked ={includeNumber} onChange={(e)=> setIncludeNumber(e.target.checked)} />
                <label htmlFor="number">Include Numbers</label>
            </div>
            <div className="checkbox-grp">
                <input type="checkbox" id="symbol" checked ={includeSymbol} onChange={(e)=> setIncludeSymbol(e.target.checked)}/>
                <label htmlFor="symbol">Include Symbol</label>
            </div>
            <button className="generate-btn" onClick={generatePassword} >Generate Password</button>
            <div className="generated-password">
                <input type="text" readOnly value={password}/>
                <button className='copy-btn' onClick={copyToClipBoard}>{buttonText}</button>
            </div>
            <div className="footer">
                <p> {year} &copy; Designed By <span>SIVAKUMAR R C</span></p>
            </div>
        </div>
    </>
    
  )
}

export default Password