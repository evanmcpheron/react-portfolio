import React from 'react';
import {Link} from 'react-router-dom'

export default function() {
   return (
       <div>
           <h2>Oops! Looks like that page doesn't exist.</h2>
           <Link to="/">Return Home</Link>
       </div>
   );
}