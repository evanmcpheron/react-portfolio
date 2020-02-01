import React from "react";
import profileImg from "../../../static/assets/img/profileImg.jpg";

export default function() {
    return (
        <div className="about-page-wrapper">
            <div className="about-img">
                <img src={profileImg}/>
            </div>
            <div className="about-content">
                <h1>About</h1>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nemo animi corporis, doloremque enim obcaecati odio incidunt
                    atque tempora quae non itaque vel, aut dolor sunt, nisi
                    quis. Voluptatum ipsam fuga dolor ratione est corrupti
                    eligendi provident? Alias dolores quasi totam?
                </p>
            </div>
        </div>
    );
}
