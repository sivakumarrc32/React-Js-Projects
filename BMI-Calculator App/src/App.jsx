import { useState } from 'react'
import './App.css'

function App(){

  const [weight,setWeight]=useState('');
  const [height,setHeight]=useState('');
  const [bmi,setBmi]=useState(null);
  const [bmiStatus,setBmiStatus]=useState("");
  const [errorMessage,setErrorMessage]=useState("");

  const calculateBmi = ()=>{
    const isValidHeight = /^\d+$/.test(height);
    const isValidWeight = /^\d+$/.test(weight);


    if(isValidHeight && isValidWeight){
      const h2m = height/100;
      const bmiValue = weight/(h2m*h2m);
      setBmi(bmiValue.toFixed(2));
      if(bmiStatus < 18.5){
        setBmiStatus("Under Weight");
      }
      else if(bmiValue >= 18.5 && bmiValue < 24.9){
        setBmiStatus("Normal Weight");
      }
      else if(bmiValue >= 24.9 && bmiValue < 29.9){
        setBmiStatus("Over Weight");
      }
      else{
          setBmiStatus("Obese");
      }

      setErrorMessage("")
    }
    else{
      setBmi(null);
      setBmiStatus("");
      setErrorMessage("Please Enter Valid Numeric Values for Height and Weight.")
    }
  }

  const clearAll = () => {
    setHeight("");
    setWeight("")
    setBmi(null);
    setBmiStatus("");
  }

  return (
    <>
      <div className="bmi-calculator">
        <div className="box"></div>
        <div className="data">
          <h1>BMI Caluculator</h1>

          {errorMessage && <p className="error">{errorMessage}</p>}

          <div className="input-container">
            <label htmlFor="height">Height (cm) :</label>
            <input type="text" id="height" value={height} onChange={(e) => setHeight(e.target.value)}/>
          </div>
          <div className="input-container">
            <label htmlFor="weight">Weight (kg) :</label>
            <input type="text" id="weight" value={weight} onChange={(e) => setWeight(e.target.value)}/>
          </div>
          <button className="calculate" onClick={calculateBmi}>Calculte BMI</button>
          <button onClick={clearAll}>Clear All</button>

          {bmi!==null && (<div className="result">
            <p className="bmi-result">Your BMI is : {bmi}</p>
            <p className="status">Status : {bmiStatus}</p>
          </div>)}
        </div>
      </div>
    </>
  )
}

export default App
