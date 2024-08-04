# Sketch Recognition App


# Deployed at:
https://66afc6f77275d7ee219783f1--utkarshsketchclassification.netlify.app/


## Overview

This project is a Sketch Recognition App that uses a Convolutional Neural Network (CNN) model trained on 10 classes. The app is built using React and TensorFlow.js (tfjs) and allows users to draw sketches and get real-time predictions of what the sketches represent.

The app has been deployed and is accessible on Netlify.

## Features

- **Real-Time Predictions**: Users can draw sketches on a canvas, and the app will predict what the sketch represents in real-time.
- **Top 10 Predictions**: The app provides the top 10 predictions with their respective probabilities.
- **Download Sketch**: Users can download their sketches as PNG images.
- **Clear Canvas**: Users can clear the canvas to draw new sketches.

## Technologies Used

### Frontend

- **React**: Frontend framework for building the user interface.
- **TensorFlow.js**: Library for running machine learning models in the browser.
- **Netlify**: Platform for deploying the app.

### CNN Model

- **Python**: Programming language used for developing the model.
- **TensorFlow/Keras**: Libraries used for building and training the CNN model.

## Model

The CNN model was trained on the following 10 classes:

1. Bird
2. Book
3. Car
4. Cat
5. Chair
6. Flower
7. Plane
8. Sheep
9. Ship
10. Strawberry

The trained model is saved in JSON format and is loaded in the React app using TensorFlow.js.

## Setup and Deployment

### Local Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/YourUsername/Sketch-classifier_App.git
   cd Sketch-classifier_App
   npm install
   npm start
