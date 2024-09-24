/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {},
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    }
  },
  plugins: [],
}

<div className="w-full md:w-[45px] lg:w-[50px]">
    {/* Tail */}
    <img src="./whale/tail.png" alt="Whale Tail" className="absolute left-[-80px] md:left-[-60px] w-[50px] md:w-[40px]" />

    {/* Body */}
    <div 
        className="absolute bottom-0 h-[34px] md:h-[24px]"
        style={{
            left: '-35px',  // Adjust this based on screen size with Tailwind breakpoints if needed
            width: `calc(${sliderValue}% - 0px)`,
            backgroundImage: 'url(./whale/body.png)',
            backgroundRepeat: 'repeat-x',
            backgroundSize: 'contain'
        }}
    ></div>

    {/* Head */}
    <img 
        src={getWhaleHeadSrc()}
        alt="Whale Head"
        className="absolute cursor-pointer bottom-0 top-[43px] w-[80px] md:w-[60px]"
        style={{
            left: `calc(${sliderValue}% - 35px)`  // Adjust head position using media queries
        }}
    />
</div>
