import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './example.css'; // Import the CSS file
import { Box, Button, Text } from '@chakra-ui/react';
import { WiBarometer, WiThermometer, WiHorizonAlt, WiHumidity, WiWindDeg, WiWindBeaufort12, WiDaySunny } from "weather-icons-react";




const Example = ({ City_Data }) => {
  const [data, setData] = City_Data
  const {location, current} = data


  const onDragEnd = result => {
    if (!result.destination) return;

    const items = Array.from(current);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    localStorage.setItem("data",JSON.stringify({...data,current : items}))
    setData({...data,current : items});
  };

  const handleSave = () => {
    console.log("Rearranged array:", data);
    setData(data)
    // Add logic here to save the rearranged order to the backend
  };

  console.log(data, setData);

  return (
    <Box>
      <Text fontSize={"2xl"} fontWeight={"bold"}>Weather Details of {location.name}</Text>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="weather-details" direction="horizontal">
          {(provided) => (
            <Box
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="weather-container" // Apply CSS class
              
            >
              {data.current.map((weatherTile, index) => (
                <Draggable
                  key={weatherTile.id}
                  draggableId={index.toString()}
                  index={index}
                >
                  {(provided) => (
                    <Box
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="weather-tile" // Apply CSS class
                      direction={"column"} border={"2px solid #5331de"} borderRadius={"20px"} mr={"20px"} p="10px" align={"center"} justify={"center"}
                    >
                        {
                          weatherTile.icon === "WiThermometer" ? <WiThermometer  size='100px' color='#5331de' /> :
                          weatherTile.icon === "WiBarometer"  ? <WiBarometer size={100} color='#5331de' /> :
                          weatherTile.icon === "WiHumidity" ? <WiHumidity size={100} color='#5331de' /> :
                          weatherTile.icon === "WiWindDeg" ? <WiWindDeg size={100} color='#5331de' /> :
                          weatherTile.icon === "WiWindBeaufort12" ? <WiWindBeaufort12 size={100} color='#5331de' /> :
                          <WiDaySunny size={100} color='#5331de' />
                        }
                      <Text>{weatherTile.value}</Text>
                      <Text>{weatherTile.name}</Text>
                    </Box>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragDropContext>
      <Button onClick={handleSave}>Save Rearrangement</Button>
    </Box>
  );
};

export default Example;
