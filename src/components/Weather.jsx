import React, { useEffect, useRef, useState } from 'react'
import axios from "axios"
import { Input, Button, Flex, Box, Container, Text, Image, RadioGroup, Stack, Radio } from '@chakra-ui/react';
import { WiBarometer, WiThermometer, WiHorizonAlt, WiHumidity, WiWindDeg, WiWindBeaufort12 } from "weather-icons-react";
import WeatherSingleCity from './WeatherSingleCity';
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'
import Example from './Example';




const Weather = () => {
    const [city, setCity] = useState("");
    const [data, setData] = useState(JSON.parse(localStorage.getItem("data"))||[])
    const [count, setCount] = useState(0)
    const [city_array, setCity_array] = useState([])
    const [index, setIndex] = useState(0);
    const ref = useRef(null)

    const fetchCityWeatherDetails = ()=>{
        axios.get(`http://api.weatherapi.com/v1/current.json?key=90e44dd303ad4f2d94344416232408&q=${city}`)
        .then((res)=>{
          console.log(res);
          setData({
            location : {
               name : res.data.location.name,
               region : res.data.location.region,
               country : res.data.location.country,
            },
            current : [
            {
                name : "Temperature",
                value : `${res.data.current.temp_c} C`,
                icon : "WiThermometer"
            },
            {
                name : "Temp. feels like",
                value : `${res.data.current.feelslike_c} C`,
                icon : "WiThermometer"
            },
            {
                name : "Pressure",
                value : `${res.data.current.pressure_mb} mb`,
                icon : "WiBarometer"
            },
            {
                name : "Humidity",
                value : `${res.data.current.humidity} %`,
                icon : "WiHumidity"
            },
            {
                name : "Wind Degree",
                value : `${res.data.current.wind_degree} %`,
                icon : "WiWindDeg"
            },
            {
                name : "wind speed",
                value : `${res.data.current.wind_kph} kmph`,
                icon : "WiWindBeaufort12"
            },
            {
                name : "Weather condition",
                value : res.data.current.condition.text,
                icon : "WiDaySunny"
            }
          ]})
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    const handleSearch = () => {
        fetchCityWeatherDetails()
        setCount((prev) => prev + 1)
    }

    const handleChangeRadio = (value) => {
        console.log(value)
        setIndex(prev => Number(value))
    }

    const handlePrev = ()=>{
       setIndex(pre => (Number(pre)+city_array.length -1) % city_array.length)
    }

    const handleNext= ()=>{
        setIndex(pre => (Number(pre)+ 1) % city_array.length)
    }

    const fetchWeatherDetails = async (array) => {
        const promises = array.map(city => {
            return axios.get(`http://api.weatherapi.com/v1/current.json?key=90e44dd303ad4f2d94344416232408&q=${city}`);
        });

        try {
            const responses = await Promise.all(promises);
            const cityDetails = responses.map(res => res.data);
            setCity_array(prevCityArray => [...prevCityArray, ...cityDetails]);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        const array = ["Mumbai", "Bangalore", "Hyderabad"]
        city_array.length < 3 && fetchWeatherDetails(array)
    }, [])
    console.log(data)

    const intervalFunc = ()=>{
        if(ref.current != undefined){
            return
        }else{
            ref.current = setInterval(() => {
                setIndex(prev => (Number(prev)+1) % 3)
            }, 10000);
        }
    };


    useEffect(() => {
        intervalFunc()
       
        return () => {
            clearInterval(ref.current)
        }
    }, [])
    console.log(index,typeof index)

    return (
        <Box w={"90%"} margin={"auto"} >
            <Box mt={10} p={6} >
                <Flex direction="row" justify={"center"} >
                    <Box mb={4} mr={5}>
                        <Input
                            type="text"
                            placeholder="Search your city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </Box>
                    <Button colorScheme="teal" onClick={handleSearch}>
                        Search
                    </Button>
                </Flex>
            </Box>

            {data.length!=0&&<Example City_Data = {[data,setData]}/>}

            {/* Weather details */}
            {city_array.length != 0 &&

                <Box position={"relative"} borderWidth={1} borderRadius="lg" p={"40px"}>
                    <Text fontSize={"2xl"}>Weather of Popular Cities</Text>
                    <ArrowLeftIcon boxSize={6} position={"absolute"} left={"10px"} top={"50%"} onClick={()=>handlePrev()}/>
                    <WeatherSingleCity data={city_array[index]} />
                    <ArrowRightIcon position={"absolute"} boxSize={6} right={"10px"} top={"50%"} onClick={()=>handleNext()}/>
                    <RadioGroup  position={"absolute"} onChange={handleChangeRadio} value={index} bottom={"20px"} left={"50%"}>
                        <Stack direction='row'>
                            {
                                city_array.map((_, i) => {
                                    return <Radio backgroundColor={index == i ? "black" : "white"}  borderColor={"black"} value={i}  // Use strict equality here as well
                                    key={i}></Radio>
                                })
                            }
                        </Stack>
                    </RadioGroup>
                </Box>
            }
        </Box>

    )
}

export default Weather