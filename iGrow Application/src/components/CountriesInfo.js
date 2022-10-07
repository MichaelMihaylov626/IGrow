import { useEffect, useState } from 'react';
import { Button, ButtonGroup, Heading, Text, List, ListItem } from '@chakra-ui/react'
import axios from 'axios';

const DisplayCountries = (array) => {
    const languages = array[0].languages
    console.log(languages)
    return (
            <div>
                <Heading as="h2">{array[0].name.common}</Heading>
                <div>
                    capital {array[0].capital[0]}<br></br>
                    area {array[0].area}
                </div>
                <div>
                    <p><b>languages:</b></p>
                    <ul>
                      {Object.keys(languages).map(key => {
                          return(
                            <ListItem key={key}>
                                {languages[key]}
                            </ListItem>
                          )
                      })}
                    </ul>
                </div>
                <div>
                    <img src={array[0].flags.png}/>
                </div>

            </div>
        )
}

const DisplayCountry = (country) => {
    const languages = country.languages
    console.log(country)
    const lat = country.latlng[0]
    const lng = country.latlng[1]
    const capital = country.capital
    console.log("run")
        return (
            <div>
                <Heading as="h2">{country.name.common}</Heading>
                <div>
                    capital {country.capital}<br></br>
                    area {country.area}
                </div>
                <div>
                    <p><b>languages:</b></p>
                    <ul>
                      {Object.keys(languages).map(key => {
                          return(
                            <List spacing={3}>
                                <ListItem key={key}>
                                {languages[key]}
                                </ListItem>
                            </List>
                          )
                      })}
                    </ul>
                </div>
                {/* display Weather by lat lng here */}
                <div>
                    <Weather lat= {lat} lng = {lng}/>
                </div>
                <div>
                    <p>
                        Flag:
                    </p>
                </div>
                <div>
                    <img src={country.flags.png}/>
                </div>
            </div>
        )
}

// display weather info for a country using open weather api
const Weather = (props) => {
    const [weather, setWeather] = useState([])
    
    const key_api = "4bc72c7112c04849fcc7430d52eba260"
    const lat = props.lat
    const lng = props.lng
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${key_api}`
    useEffect(() => {
        axios
        .get(url)
        .then(response => {
            setWeather(response.data)
        })
    }, [])
    // wait for data to be fetched
    console.log(weather)
    if (weather.length == 0) {
        return (
            <div>
                <p>loading...</p>
            </div>
        )
    }
    else {
        return (
            <div>
                <h2>Weather in {weather.name}</h2>
                <div>
                    <p><b>temperature:</b> {weather.main.temp} Kelvin</p>
                    <p><b>wind:</b> {weather.wind.speed} m/s</p>
                    <p><b>humidity</b> {weather.main.humidity}</p>
                    <p><b>description: </b> {weather.weather[0].main}</p>
                </div>
            </div>
        )
    }
}
// y 1 5 1
// r 1 0 0
const Countries = (props) => {
    const [countriesWeather, setCountriesWeather] = useState([])
    var array_cca2 = props.array.map(c => {
            return c.cca2
        }
    )
    const key_api = "4bc72c7112c04849fcc7430d52eba260"
    console.log(countriesWeather)
    array_cca2 = array_cca2.reduce((acc, cur)=> (acc[cur]=false, acc), {})
    
    var [isShown, setisShown] = useState(array_cca2)
    
    function handleClick(e) {
        const key = e.target.getAttribute("data-name")
        console.log(e.target.getAttribute("data-name"))
        var isShownCopy = {...isShown}
        console.log("before element",isShownCopy[key])
        console.log("before array", isShownCopy)       
        setisShown(isShownCopy)
        
        isShownCopy[key] = !isShownCopy[key]
        
        setisShown(isShownCopy)
        console.log("after element",isShownCopy[key])
        console.log("after array", isShownCopy)
    }
    if (props.array.length == 1) {
        return (DisplayCountries(props.array))
    }
    else {
        const countriesToShow = props.array
        return (
            <div>
                {countriesToShow.map(c => {
                    return(
                        <div key = {c.cca2}>
                            {c.name.common}
                            <Button onClick={handleClick}
                            data-name={c.cca2}
                            >show</Button>
                            {
                                isShown[c.cca2] ? DisplayCountry(c) : null
                            }

                        </div>
                    )
                })
                }
            </div>
        )
    }
}
export default Countries