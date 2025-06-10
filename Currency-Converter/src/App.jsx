
import { useEffect, useState } from 'react'
import './App.css'
import axios from "axios";

function App() {

  const [amount,setAmount]=useState(1);
  const [fromCurrency,setFromCurrency]=useState("USD");
  const [toCurrency,setToCurrency]=useState("INR");
  const [convertedAmount,setConvertedAmount]=useState(null);
  const [exchangeRate,setExchangeRate]=useState(null);


  useEffect(() =>{
    const getExchangeRate = async () => {
      try{
        let url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;

        const res = await axios.get(url);
        // console.log(res);
        setExchangeRate(res.data.rates[toCurrency])
      }catch(error){
        console.error("Error While Fetching Exchange Rate :",error);
      }
    };
    getExchangeRate();
  },[fromCurrency,toCurrency]);


  useEffect(()=> {
    if(exchangeRate !== null){
      setConvertedAmount((amount*exchangeRate).toFixed(2));
    }
  },[amount,exchangeRate])

  const handleAmountChange = (e) => {
    const value = parseFloat(e.target.value);
    setAmount(isNaN(value) ? 0 :value);
  }

  const handleFromCurrency = (e) => {
    setFromCurrency(e.target.value);
  }

  const handleToCurrency = (e) => {
    setToCurrency(e.target.value);
  }

  return (
    <>
      <div className="currency-converter">
        <div className="box"></div>
        <div className="data">
          <h1>Currency Converter</h1>
          <div className="input-container">
            <label htmlFor="amt">Amount : </label>
            <input type="number" id='amt' value={amount} onChange={handleAmountChange}/>
          </div>
          <div className="input-container">
            <label htmlFor="fromCurrency">From Currency : </label>
            <select name="" id="fromCurrency" value={fromCurrency} onChange={handleFromCurrency}>
              <option value="selectCurrent">Select Currency</option>
              <option value="USD">$ - US Dollar </option>
              <option value="EUR">€ - Euro</option>
              <option value="GBP">$ - British Pound Sterling</option>
              <option value="JPY">¥ - Japanese Yen</option>
              <option value="AUD"> $ - Australian Dollar</option>
              <option value="CAD">$ - Canadian Dollar</option>
              <option value="CNY">¥ - Chinese Yuan</option>
              <option value="INR">₹ - Indian Rupee</option>
              <option value="BRL">R$ - Brazilian Real</option>
              <option value="ZAR">R - South African Rand</option>
            </select>
          </div>
          <div className="input-container">
            <label htmlFor="toCurrency">To Currency : </label>
            <select name="" id="fromCurrency" value={toCurrency} onChange={handleToCurrency}>
              <option value="selectCurrent">Select Currency</option>
              <option value="USD">$ - US Dollar </option>
              <option value="EUR">€ - Euro</option>
              <option value="GBP">$ - British Pound Sterling</option>
              <option value="JPY">¥ - Japanese Yen</option>
              <option value="AUD"> $ - Australian Dollar</option>
              <option value="CAD">$ - Canadian Dollar</option>
              <option value="CNY">¥ - Chinese Yuan</option>
              <option value="INR">₹ - Indian Rupee</option>
              <option value="BRL">R$ - Brazilian Real</option>
              <option value="ZAR">R - South African Rand</option>
            </select>
          </div>
          <div className="result">
            <p>Amount  <span className='amot'>: {amount} {fromCurrency}</span></p>
            <p>Converted Amount  <span>: {convertedAmount} {toCurrency}</span></p>
          </div>
          <div className="footer">
            <p>&copy; Designed By<span className='foot'>SIVAKUMAR R C</span></p>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
