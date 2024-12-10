import React, { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import "./QRCodeGenerator.css";

const QRCodeGenerator = () => {
    const [inputText, setInputText] = useState("");
    const [color, setColor] = useState("#000000");
    const qrRef = useRef();

    const downloadQRCode = () => {
        const canvas = qrRef.current.children[0]; // Select the canvas element directly
        if (!canvas) return;
    
        const url = canvas.toDataURL("image/png"); // Convert the canvas to PNG format
        const link = document.createElement("a"); // Create a temporary download link
        link.href = url; // Set the link to the QR code image
        link.download = "qrcode.png"; // Set the file name for the download
        link.click(); // Trigger the download
    };
    
    return (
        <div className="container">
            <h1>QR Code Generator</h1>
            <div className="card">
                <input
                    type="text"
                    placeholder="Enter text or URL"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                />
                <label>
                    QR Code Color:
                    <input
                        type="color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                    />
                </label>
                <div className="qr-code" ref={qrRef}>
                    {inputText && (
                        <QRCodeCanvas value={inputText} size={200} fgColor={color} />
                    )}
                </div>
                <button onClick={downloadQRCode} disabled={!inputText}>
                    Download QR Code
                </button>
            </div>
        </div>
    );
};

export default QRCodeGenerator;
