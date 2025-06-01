import { useState } from "react";


export const QrCode = () => {
  const year =new Date().getFullYear();

  const [img, setImg] = useState();
  const [Loading,setLoading] = useState(false)
  const [data,setData] = useState()
  const [qrsize,setQrsize] = useState()

  async function genrate() {
    setLoading(true);
    try{

      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrsize}x${qrsize}&data=${encodeURIComponent(data)}`
      setImg(url);  

    }catch(error){
      console.error("Error While Genrating QR",error);
      
    }finally{
      setLoading(false);
    }
  }

  function download(){
    fetch(img)
      .then((response) => response.blob())
      .then((blob) => {
      const link=document.createElement("a");
      link.href=URL.createObjectURL(blob);
      link.download="QrCode.png"
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }).catch((error) => {
      console.error("Error While Downloading,error");
    })
  }

  return (
    <div className="container col-12 col-sm-2" >
      <h1>QR GENRATOR</h1>
      {Loading && <p>Please Wait.....</p>}
      {img && <img src={ img } alt="" className="img col-md-5 col-lg-4 col-xl-3"/>}

      <div className="inputs col-8" >
        <label htmlFor="input" className="input">Enter the Data :</label>
        <input type="text" id="input" className="datainput form-control" placeholder="Give the Data For QR " value={data} onChange={(e)=> setData(e.target.value)} required/>

        <label htmlFor="sizeInput" className=" input">Enter the size :</label>
        <input type="text" id="sizeInput" className="sizeinput form-control" placeholder="(eg: 50,100) " value={qrsize} onChange={(e)=> setQrsize(e.target.value)} required/>

        <button className="genrate" onClick={genrate} disabled={Loading}>Generate</button>
        <button className="download" onClick={download}>Download</button>
      </div>

      <p className="copyright">Designed by &copy; {year} <span className="name">Sivakumar</span> </p>
    </div>
  )
}
