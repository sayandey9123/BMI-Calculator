import React, { useMemo, useState } from 'react';
import './App.css';



const App = () => {
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(65);
  const [isCm, setIsCm] = useState(true); // unit toggle
  const [saved, setSaved] = useState(false);

  const toggleUnit = () => {
    if (isCm) {
      setHeight((height / 2.54).toFixed(1)); // cm → inch
    } else {
      setHeight((height * 2.54).toFixed(0)); // inch → cm
    }
    setIsCm(!isCm);
  };

  const onWeightChange = (event) => setWeight(Number(event.target.value));
  const onHeightChange = (event) => setHeight(Number(event.target.value));

  const bmi = useMemo(() => {
    if (height === 0) return 0;
    const h = isCm ? height / 100 : height * 0.0254; // cm or inches
    return (weight / (h * h)).toFixed(1);
  }, [weight, height, isCm]);

  const bmiInfo = useMemo(() => {
    if (bmi < 18.5) {
      return {
        label: 'Underweight',
        color: '#3498db',
        advice: 'Increase calorie intake with nutritious foods and strength training.',
        foods: ['Nuts & seeds', 'Whole milk & yogurt', 'Rice & oats', 'Chicken, eggs, fish', 'Protein smoothies']
      };
    } else if (bmi >= 18.5 && bmi < 24.9) {
      return {
        label: 'Normal',
        color: '#2ecc71',
        advice: 'Maintain balance with exercise and a varied diet.',
        foods: ['Fruits & vegetables', 'Lean proteins', 'Whole grains', 'Healthy fats', 'Plenty of water']
      };
    } else if (bmi >= 25 && bmi < 29.9) {
      return {
        label: 'Overweight',
        color: '#f39c12',
        advice: 'Adopt portion control, reduce sugar, and exercise regularly.',
        foods: ['High-fiber vegetables', 'Grilled proteins', 'Low-fat dairy', 'Green tea', 'Avoid fried foods']
      };
    } else if (bmi >= 30) {
      return {
        label: 'Obese',
        color: '#e74c3c',
        advice: 'Consult a doctor. Focus on calorie deficit and structured workouts.',
        foods: ['Leafy greens', 'Steamed vegetables', 'Legumes & beans', 'Whole grains (moderation)', 'No sugary drinks']
      };
    }
    return { label: 'N/A', color: '#7f8c8d', advice: 'Enter valid details.', foods: [] };
  }, [bmi]);

  const saveDetails = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000); // auto-hide message
  };

  return (
    <div className="container">
      {/* Left Panel: Calculator */}
      <div className="left-panel">
        <h1 className="title">BMI Calculator</h1>

        <div className="input-section">
          <label>
            <p className="slider-label">Weight: <strong>{weight} kg</strong></p>
            <input
              className="input-slider"
              type="range"
              step="1"
              min="20"
              max="200"
              value={weight}
              onChange={onWeightChange}
            />
          </label>

          <label>
            <p className="slider-label">
              Height: <strong>{height} {isCm ? 'cm' : 'inch'}</strong>
            </p>
            <input
              className="input-slider"
              type="range"
              step="1"
              min={isCm ? "100" : "40"}
              max={isCm ? "250" : "100"}
              value={height}
              onChange={onHeightChange}
            />
          </label>

          <button className="toggle-btn" onClick={toggleUnit}>
            Switch to {isCm ? 'Inches' : 'Centimeters'}
          </button>
        </div>

        <div className="output-section" style={{ borderColor: bmiInfo.color }}>
          <p className="output-text">Your BMI:</p>
          <p className="output-value" style={{ color: bmiInfo.color }}>{bmi}</p>
          <p className="output-category" style={{ color: bmiInfo.color }}>
            {bmiInfo.label}
          </p>
        </div>

        <button className="save-btn" onClick={saveDetails}>Save Details</button>
        {saved && <p className="saved-msg">✅ Details saved!</p>}
      </div>

      {/* Right Panel: Suggestions */}
      <div className="right-panel">
        <div className="suggestion-card">
          <h2>Health Advice</h2>
          <p className="output-advice">{bmiInfo.advice}</p>
          <h3>Suggested Foods</h3>
          <ul>
            {bmiInfo.foods.map((food, idx) => (
              <li key={idx}>{food}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
