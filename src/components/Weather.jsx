import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Input, Button, Flex, Box, Container, Text, Image } from '@chakra-ui/react';
import { WiBarometer, WiThermometer, WiHorizonAlt, WiHumidity, WiWindDeg, WiWindBeaufort12 } from "weather-icons-react";
const Weather = () => {
    const [city, setCity] = useState("")
    const [data, setData] = useState(null)
    const [count, setCount] = useState(0)
    const handleSearch = () => {
        fetchWeatherDetails()
        setCount((prev) => prev + 1)
    }

    const fetchWeatherDetails = () => {
        axios.get(`http://api.weatherapi.com/v1/current.json?key=90e44dd303ad4f2d94344416232408&q=${city}`)
            .then((res) => {
                console.log(res)
                setData(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    /*useEffect(()=>{
       fetchWeatherDetails(city)
    },[count])*/
    console.log(process.env.API_KEY)
    return (
        <Box w={"90%"} margin={"auto"} centerContent>
            <Box mt={10} p={6} borderWidth={1} borderRadius="lg">
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

            {/* Weather details */}
            {data && <Box w="100%" mt={8} p={6} borderWidth={1} borderRadius="lg">
                <Flex direction="column" align="center">
                    <Box mb={4} textAlign="center">
                        <Flex>
                            <Box>
                                <Text fontSize={"xl"} fontWeight={"bold"} p={"1rem"} mr={"1rem"}>Location</Text>
                                <Text fontSize={"2xl"} fontWeight={"bold"} p={"1rem"} mr={"1rem"}>{data.location.name}</Text>
                            </Box>
                            <Box>
                                <Text fontSize={"xl"} fontWeight={"bold"} p={"1rem"} mr={"1rem"}>Region</Text>
                                <Text fontSize={"2xl"} fontWeight={"bold"} p={"1rem"} mr={"1rem"}>{data.location.region}</Text>
                            </Box>
                            <Box>
                                <Text fontSize={"xl"} fontWeight={"bold"} p={"1rem"} mr={"1rem"}>Country</Text>
                                <Text fontSize={"2xl"} fontWeight={"bold"} p={"1rem"} mr={"1rem"}>{data.location.country}</Text>
                            </Box>
                            <Box>
                                <Text fontSize={"xl"} fontWeight={"bold"} p={"1rem"} mr={"1rem"}>Time Zone</Text>
                                <Text fontSize={"2xl"} fontWeight={"bold"} p={"1rem"} mr={"1rem"}>{data.location.tz_id}</Text>
                            </Box>
                        </Flex>
                    </Box>
                    <Box textAlign="center" >
                        {/* Weather details */}
                        <Flex w="100%" justify={"space-evenly"}>
                            <Flex direction={"column"} border={"2px solid #5331de"} borderRadius={"20px"} mr={"20px"} p="10px" align={"center"} justify={"center"}>
                                <WiThermometer size={100} color='#5331de' />
                                <Flex direction={"row"}>
                                    <Box p={"5px"} borderRight={"1px solid black"}>
                                        <Text>{data.current.temp_c}</Text>
                                        <Text>Temperature <br /> in C</Text>
                                    </Box>
                                    <Box p={"5px"}>
                                        <Text>{data.current.feelslike_c}</Text>
                                        <Text>Temperature <br />feels like</Text>
                                    </Box>
                                </Flex>
                            </Flex>

                            <Flex direction={"column"} border={"2px solid #5331de"} mr={"20px"} borderRadius={"20px"} p="10px" align={"center"} justify={"center"}>
                                <WiBarometer size={100} color='#5331de' />
                                <Text>{data.current.pressure_mb}</Text>
                                <Text>Pressure <br /> in mb</Text>
                            </Flex>
                            <Flex direction={"column"} border={"2px solid #5331de"} mr={"20px"} borderRadius={"20px"} p="10px" align={"center"} justify={"center"}>
                                <WiHumidity size={100} color='#5331de' />
                                <Text>{data.current.humidity}%</Text>
                                <Text>Humidity</Text>
                            </Flex>

                            <Flex direction={"row"} border={"2px solid #5331de"} mr={"20px"} borderRadius={"20px"} p="10px" align={"center"} justify={"center"}>
                                <Flex direction={"column"} p="10px" align={"center"} justify={"center"}>
                                    <WiWindDeg size={100} color='#5331de' />
                                    <Text>{data.current.wind_degree}%</Text>
                                    <Text>Wind Degree</Text>
                                </Flex>
                                <Flex direction={"column"} p="10px" align={"center"} justify={"center"}>
                                    <WiWindBeaufort12 size={100} color='#5331de' />
                                    <Text>{data.current.wind_kph} kmph</Text>
                                    <Text>wind speed</Text>
                                </Flex>
                            </Flex>

                            <Flex direction={"column"} border={"2px solid #5331de"} mr={"20px"} borderRadius={"20px"} p="10px" align={"center"} justify={"center"}>

                                <Image src='http://cdn.worldweatheronline.com/images/weather/small/116_night_sm.png' alt='Dan Abramov' />
                                <Text>{data.current.condition.text}</Text>
                                <Text>Weather condition</Text>


                            </Flex>
                        </Flex>
                    </Box>
                </Flex>
            </Box>}
        </Box>

    )
}

export default Weather