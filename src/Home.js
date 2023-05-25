import React from "react";
import axios from 'axios';
import { useState, useEffect } from 'react';
import './App.css';

function Home() {
    const [data, setData] = useState({
        celcius: 10,
        name: 'London',
        image: '/Images/t-shirt_shorts.png'
    })
    const [name, setName] = useState('');
    useEffect(() => {

    }, [])

    const handleClick = () => {
        if (name !== "") {
            const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=0fed4bc63aa936c1dc865859bfae86be&units=metric`;
            axios.get(API_URL)
                .then(res => {
                    let imagePath = '';
                    if (res.data.main.temp > 20) {
                        imagePath = "/Images/t-shirt_shorts.png";
                    } else if (res.data.main.temp > 15) {
                        imagePath = "/Images/sportswear.png";
                    } else if (res.data.main.temp > 5) {
                        imagePath = "/Images/jacket.png";
                    }else if (res.data.main.temp > 0) {
                        imagePath = "/Images/down_jacket.png";
                    } else {
                        imagePath = "/Images/t-shirt_shorts.png"
                    }

                    setData({ ...data, celcius: res.data.main.temp, name: res.data.name, image: imagePath });
                })
                .catch(err => console.log(err));


        }
    };

    return (
        <div className="container">
            <div className="weather">
                <div className="search">
                    <input type="text" placeholder="Enter City Name" onChange={e => setName(e.target.value)} />
                    <button> <img src="/Images/icons8-search-48.png" onClick={handleClick} alt="" /> </button>
                </div>
                <div className="winfo">
                    <img src={data.image} alt="" className="icon" />
                    <h1>{Math.round(data.celcius)} °C</h1>
                    <h2>{data.name}</h2>

                </div>
            </div>
        </div>



    )
}

export default Home