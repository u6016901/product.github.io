import React from 'react';
import cardImg from '/Users/design/Downloads/au-room-reservation/src/assets/cardImg.png';

 
function Header() {
  return (
    <div>
        <div class="myCard">
        <img class="card-img-top" src={cardImg}></img>
            <div class="card-img-overlay">
            <h4 class="headContent card-title">HISTORY</h4>
            <p class="content card-text">Suvarnabhumi Campus</p>
            </div>
        </div>
    </div>

  );
}
 
export default Header;