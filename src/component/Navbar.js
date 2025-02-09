import React from 'react';
import PropTypes from 'prop-types';


export default function Navbar(props) {
  
  const getOffcanvasStyle = () => {
    const width = window.innerWidth;
    return width < 700
      ? { backgroundColor: props.mode === 'light' ? 'white' : '#343a40' }
      : {};
  };
  
  const getResponsiveStyle = () => {
    const width = window.innerWidth;
    let responsiveStyle = {
      backgroundColor: props.mode === 'light' ? 'white' : 'white',
      fontFamily: "'Times New Roman', Times, serif",
     
    };

    if (480 < width) {
      responsiveStyle.width = '1000px';
    } else if (width <= 480) {
      
      responsiveStyle.width = '300px';
    }

    return responsiveStyle;
  };
  return (
    <nav className={`navbar navbar-expand-lg navbar-${props.mode} fixed-top`} style={{ backgroundColor: `${props.mode === 'light' ? 'Gainsboro' : 'DarkSlateBlue'}` }}>
    <div className="container-fluid">
      <a className="navbar-brand" href="/">{props.title}</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
      <div className="offcanvas-header" style={{ backgroundColor: `${props.mode === 'light' ? 'Gainsboro' : 'DarkSlateBlue'}` }}>
        <h5 className="offcanvas-title" id="offcanvasNavbarLabel">{props.title}</h5>
        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body" style={getOffcanvasStyle()}>
        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3 ">
        
            
            <li className="nav-item item">
              <div className={` mx-2 text-${props.mode === 'light' ? 'dark' : 'light'} mt-2`}>
              <i className="fa-solid fa-circle-half-stroke" onClick={props.toggleMode}></i>
              </div>
            </li>
          
        </ul>
        
      </div>
    </div>
  </div>
</nav>
  );
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
  toggleMode: PropTypes.func.isRequired,
};

Navbar.defaultProps = {
  title: 'Set title here',
};








