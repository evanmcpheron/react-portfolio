import React from 'react';
import PortfolioContainer from '../portfolio/portfolio-container';
import ReactGA from 'react-ga';


ReactGA.initialize('UA-80246531-2');

ReactGA.pageview('/Home');

export default function() {
   return (
       <div>
           <PortfolioContainer/>
       </div>
   );
}