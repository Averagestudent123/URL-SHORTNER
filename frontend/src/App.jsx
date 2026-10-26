import { useState } from "react";
import axios from "axios";
import QRCode from "react-qr-code";
import QRCodeGnerator from "qrcode";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

function App() {
  const [url, seturl] = useState("");
  const [shorturl, setshorturl] = useState("");
  const [copies, setcopies] = useState("Copy");
  const [QrImage, setQrImage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if(!url || loading){return alert("Please enter a URL")};
    setLoading(true);

    try{
      const res = await axios.post(`${API_BASE_URL}/shorten`, { url });

      setshorturl(res.data.shortURL);
      QRCodeGnerator.toDataURL(res.data.shortURL)
      .then((url) => {
        setQrImage(url);
      })
      .catch((err) => {
        console.error(err);
      });
    }catch(err){
      console.error(err);
      alert("Error shortening URL");
    } finally{
      setLoading(false);
    }
  
  }

    const handleCopy = () => {
      navigator.clipboard.writeText(shorturl);
      setcopies("Copied");
      setTimeout(() => {
        setcopies("Copy");
      }, 2000);
    };
  return <div className="min-h-screen flex flex-col items-center justify-center p-6">
    <h1 className="text-4xl font-bold mb-6">URL Shortener</h1>

    <div className="w-full max-w-md">
      <input type="text" placeholder="Enter URL" value={url} onChange={(e) => seturl(e.target.value)} className="w-full p-3 mb-4 border rounded" />
      <button onClick={handleSubmit} className="w-full p-3 mb-4 bg-blue-500 text-white rounded hover:bg-blue-600" disabled={loading}>
        Shorten URL
      </button>
    </div>
    {shorturl && (  
      <div className="w-full max-w-md text-center">
        <p className="mb-4">
          Shortened URL:{" "}
          <a
            href={shorturl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 underline font-medium"
          >
            {shorturl}
          </a>
        </p>
        <button
          onClick={handleCopy}
          className="w-full p-3 mb-4 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          {copies}
        </button>

        <div className="flex flex-col items-center justify-center mt-6">
          <p className="mb-3 text-center font-semibold text-gray-200">
            Scan the QR code
          </p>
          <div className="bg-white p-3 rounded-lg shadow inline-block">
            <QRCode value={shorturl} size={180} />
          </div>
        </div>
        {QrImage && (
          <a
            className="block mt-4 text-blue-400 hover:text-blue-300 underline text-center"
            download="qr-code.png"
            href={QrImage}
          >
            Download QR Code
          </a>
        )}
      </div>
    )}
  </div>;
}

export default App;