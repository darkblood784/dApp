import React, { useState, useCallback } from 'react';

const WhaleSlider = () => {
  const [sliderValue, setSliderValue] = useState(0);

  // Whale head images for different percentage ranges
  const headImages = {
    "0-25": './whale/0_25.png', // Adjust image paths as needed
    "25-75": './whale/25_75.png',
    "75-100": './whale/75_100.png',
  };

  // Set slider value based on button click or input
  const handleSliderChange = useCallback((value) => {
    setSliderValue(value);
  }, []);

  // Determine whale head image based on slider value
  const getWhaleHeadImage = () => {
    if (sliderValue <= 25) {
      return headImages["0-25"];
    } else if (sliderValue <= 75) {
      return headImages["25-75"];
    } else {
      return headImages["75-100"];
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {/* Slider Container */}
      <div className="slider-container relative w-full h-[100px] mb-5">
        {/* Fixed Whale Tail */}
        <img
          src="./whale/tail.png" // Adjust image path
          alt="Whale Tail"
          className="absolute left-0 bottom-0 w-[70px] h-[80px]"
        />

        {/* Stretchable Whale Body */}
        <div
          className="absolute bottom-0 h-[50px] bg-contain bg-repeat-x"
          style={{
            left: '70px', // Ensure body starts after tail
            width: `${sliderValue * 4}px`, // Stretch ratio for the body
            backgroundImage: 'url(./whale/body.png)', // Adjust image path
          }}
        ></div>

        {/* Draggable Whale Head */}
        <img
          src={getWhaleHeadImage()}
          alt="Whale Head"
          className="absolute cursor-pointer bottom-0 w-[90px] h-[64px]"
          style={{
            left: `${70 + sliderValue * 4}px`, // Move head in sync with the body
          }}
        />
      </div>

      {/* Range Slider (hidden) */}
      <input
        type="range"
        min="0"
        max="100"
        value={sliderValue}
        onChange={(e) => handleSliderChange(e.target.value)}
        className="absolute w-[430px] bottom-[20px] left-[70px] h-[5px] bg-transparent"
      />

      {/* Buttons for percentage selection */}
      <div className="buttons-container flex justify-between w-full">
        {[25, 50, 75, 100].map((value) => (
          <button
            key={value}
            onClick={() => handleSliderChange(value)}
            className="text-sm py-2 px-4 rounded-full bg-gray-800 text-white hover:bg-gray-600"
          >
            {value === 100 ? 'All In' : `${value}%`}
          </button>
        ))}
      </div>

      {/* Slider Value Display */}
      <div className="text-2xl mt-2.5">{`${sliderValue}%`}</div>
    </div>
  );
};

export default WhaleSlider;
