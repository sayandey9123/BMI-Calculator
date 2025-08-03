import React, { useMemo, useState } from 'react'
import './App.css'

const App = () => {
  const[height, setHeight] = useState(180);
  const[Weight, setWeight] = useState(70);


  function onWeightChange(event) {
      setWeight(event.target.value);
  }

  function onHeightChange(event){
      setHeight(event.target.value);
  }

  const output = useMemo(()=>{
        const calHeight = height /100;
        return (Weight/(calHeight * calHeight)).toFixed(1)
  },[Weight, height]);


  return (
    <main>
      <h1>BMI CALCULATOR</h1>
      <div className='input-section'>
        <p className='slider-output'>Weight : {Weight}kg</p>
        <input className='input-slider' type='range'
        step="1"
        min = "0"
        max= "200"
        onChange={onWeightChange}/>
        <p className='slider-output'>Height : {height}cm</p>
        <input className='input-slider' type='range'
        onChange={onHeightChange}
        min="0"
        max="300"/>

      </div>
      <div className='output-section'>
        <p>Your BMI is :</p>
        <p className='output'>{output}</p>
      </div>
    </main>
  )
}

export default App
