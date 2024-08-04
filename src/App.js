import React, { useState, useRef, useEffect, useCallback } from "react";
import { Canvas } from "./Canvas";
import * as tf from "@tensorflow/tfjs";
import { predict } from "./helpers";
import "./App.css";

function App() {
  const canvasRef = useRef();
  const [ctx, setCtx] = useState(null);
  const [isPredicting, setIsPredicting] = useState(false);
  const [prediction, setPrediction] = useState("");
  const [dataUrl, setDataUrl] = useState("#");
  const [model, setModel] = useState(null);

  useEffect(() => {
    const loadModel = async () => {
      const loadedModel = await tf.loadLayersModel("./model/model.json");
      setModel(loadedModel);
    };
    loadModel();
  }, []);

  const handleClear = useCallback(() => {
    if (!ctx || !canvasRef || !canvasRef.current) return;
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setPrediction("");
  }, [ctx]);

  const handleDownload = useCallback(() => {
    if (!canvasRef || !canvasRef.current) return;
    setDataUrl(canvasRef.current.toDataURL("image/png"));
  }, [canvasRef]);

  const predictClicked = async () => {
    if (!model) return;
    setIsPredicting(true);
    const pred = await predict(canvasRef.current, model);
    setPrediction(pred);
    setIsPredicting(false);
  };

  useEffect(() => {
    setCtx(canvasRef?.current?.getContext("2d"));
  }, [canvasRef, ctx]);

  return (
    <div className="app-container">
      <div className="header-container">
        <p className="header-title">Welcome to the Doodle Classifier!</p>
        <p className="header-subtitle">Draw a sketch and we'll try to predict what it is!</p>
      </div>
      <div className="canvas-container">
        <Canvas ref={canvasRef} />
      </div>
      <div className="button-container">
        <button className="btn" onClick={predictClicked}>Predict</button>
        <button className="btn" onClick={handleDownload}>
          <a
            href={dataUrl}
            download="doodle.png"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Download
          </a>
        </button>
        <button className="btn" onClick={handleClear}>Clear</button>
      </div>
      <div className="prediction-container">
        {isPredicting ? (
          <p>Loading...</p>
        ) : (
          <p className="prediction-text">
            {prediction.length === 0
              ? "Hey, Start to draw time is ticking"
              : `I think this is ... ${prediction}`}
          </p>
        )}
      </div>
      <div className="about-container">
        <p className="about-title">About Us</p>
        <p className="about-text">
          This project is created and maintained by Utkarsh Singh as a course project at IIT Jodhpur.
        </p>
        <p className="about-title">Predicted Classes</p>
        <p className="about-text">
          We predict 10 classes of sketches as of now. These include:
        </p>
        <p className="about-text">
          1. bird 2. book 3. car 4. cat 5. chair 6. flower 7. plane 8. sheep 9. ship 10. strawberry
        </p>
        <p className="about-text">
          We hope that you enjoy our little creation 😁.
        </p>
        <p className="about-text">
          You can ping us at{" "}
          <a style={{ color: "blue" }}>singhutkarsh778@gmail.com</a> for feedback.
        </p>
        <p className="credit-text">Created by Utkarsh Singh</p>
      </div>
    </div>
  );
}

export default App;
