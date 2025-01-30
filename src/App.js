import './App.css';
import Homepage from './component/Homepage';
import Navbar from './component/Navbar';
import React, { useState } from 'react';
import SmallNavbar from './component/SmallNavbar';


function App() {
  const [mode, setMode] = useState('light'); // Whether dark mode is enabled or not
  

  const toggleMode = ()=>{
    if(mode === 'light'){
      setMode('dark');
      document.body.style.backgroundColor = '#042743';
      
      // document.title = 'TextUtils - Dark Mode';
      // setInterval(() => {
      //   document.title = 'TextUtils is Amazing Mode';
      // }, 2000);
      // setInterval(() => {
      //   document.title = 'Install TextUtils Now';
      // }, 1500);
    }
    else{
      setMode('light');
      document.body.style.backgroundColor = 'white';
      
      // document.title = 'TextUtils - Light Mode';
    }
  }
  return (
    <>
    <Navbar title="Website Usability Using AI" mode={mode} toggleMode={toggleMode} />
     <Homepage mode={mode}/>
     <SmallNavbar mode={mode}/>
    </>
  );
}

export default App;
