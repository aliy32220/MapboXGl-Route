import React from 'react';
import { useRef, useEffect, useState } from 'react';
// import { CloseIcon } from '@chakra-ui/icons';
import {
  Button,
  Text,
  ButtonGroup,
  Select,
  Checkbox
} from '@chakra-ui/core';
import { Box, Flex } from '@chakra-ui/core';
// import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { useForm, useFieldArray, Controller, useWatch, set } from "react-hook-form";
import GooglePlacesAutoComplete from '../Components/GooglePlacesAutoComplete.js'
import MapBox from '../Components/MapBox.js'

export default function LoginForm() {
    
    // this.state = { adrress: [] };
    // handleLanguageCode = (langValue) => {
    //     this.setState({adrress: langValue});
    // }
    const [address, setAddress] = useState(
        [0, 0]
    );
    const [address2, setAddress2] = useState(
        [0, 0]
    );
    const { register, control, handleSubmit, reset, watch } = useForm({
        defaultValues: {
          test: [{ starting_point: "Enter Starting Point", location1: "Enter Location"}],
        }
    });
    const { fields, append } = useFieldArray(
        {
          control,
          name: "test"
        }
      );
    var locations = [];
    locations.push(address);
    locations.push(address2);
    return (
        <Box style={{position: 'absolute', left:100, top: 50}} width={1300} height={600} borderWidth={1} borderRadius={8} boxShadow="lg">
            <Box style={{
            position: 'relative',
            left: 40,
            top: 20,
            }}>
                <Text color={'#838794'} fontWeight={'bold'} fontSize='xl'>Availability</Text>
            </Box>
            <Box style={{position: 'relative', left: 900, top: -10}}>
                <ButtonGroup variant='outline' spacing='6'>
                    <Button background={'White'} color={'Blue'} width={100} variant='solid' borderWidth={1} borderRadius={20} boxShadow="lg">Regular</Button>
                    <Button background={'Blue'} color={'White'} width={100} variant='outline' borderWidth={1} borderRadius={20} boxShadow="lg">Recurring</Button>
                    <Button background={'White'} color={'#4185ED'} width={100} variant='solid' borderWidth={1} borderRadius={20} boxShadow="lg">Fixed Date</Button>
                </ButtonGroup>
            </Box>
            <Box style={{position:'relative', top: 0, left: 50}} width={800} height={200} p={20} borderWidth={1} borderRadius={8} boxShadow="sm">
                <Flex>
                    <Box style={{
                    position:'relative',
                    right: 40,
                    top:-70,
                    }}>
                        <Text color={'#838794'} fontWeight={'bold'} fontSize='xl'>Route 1</Text>
                    </Box>
                    <Box style={{
                    position:'relative',
                    left: 300,
                    top: -70,
                    }}>
                        <ButtonGroup variant='outline' spacing='6'>
                            <Button background={'Blue'} color={'White'} width={100} variant='outline' borderWidth={1} borderRadius={10} boxShadow="lg">Edit</Button>
                            <Button background={'White'} color={'Black'} width={100} variant='solid' borderWidth={1} borderRadius={10} boxShadow="lg">Delete</Button>
                        </ButtonGroup>
                    </Box>
                </Flex>
                <Flex>
                    <Box style={{position:'relative', left:-60, top: -70}}>
                    <ul>
                        {fields.map((item, index) => {
                        return (
                            <li key={item.id}>
                                <Flex>
                                    <GooglePlacesAutoComplete
                                        name={`test[${index}].starting_point`}
                                        setAddress = {setAddress}
                                        placeholder='Enter Starting Point'
                                        defaultValue={String(`${item.starting_point}`)} // make sure to set up defaultValue
                                        {...register("starting_point", {
                                            required: "Required",
                                        })}
                                    />
                                    
                                    <GooglePlacesAutoComplete
                                        name={`test[${index}].location1`}
                                        setAddress = {setAddress2}
                                        placeholder='Enter Ending Point'
                                        defaultValue={String(`${item.location1}`)} // make sure to set up defaultValue
                                        {...register("location1", {
                                            required: "Required",
                                        })}
                                    />  
                                </Flex>    
                            </li>
                        );
                        })}
                    </ul>   
                    </Box>
                    <Box style={{position:'relative', left:100, top: -70}}>
                        <Button type='button' onClick={() => {
                                append({ starting_point: " ", location1: " " });
                                }} style={{position:'absolute',}} background={'White'} color={'Blue'} width={100} variant='outline' 
                                borderWidth={1} borderRadius={20} boxShadow="lg">Add Location
                        </Button>
                    </Box>
                </Flex>
            </Box>
            {/* <Box ref={mapContainer} className="map-container" background={'White'} style={{position: 'relative', width:350, height:500, top: -200, left:920}}  borderWidth={1} borderRadius={8} boxShadow="sm">
            </Box> */}
            <Box background={'White'} style={{position:"absolute", left:870, top:70}} borderWidth={1} borderRadius={8} boxShadow="sm">
                <MapBox address = {locations}></MapBox>
            </Box>
            <Box style={{position:'relative', top: 10, left: 50}} width={800} height={200} p={20} borderWidth={1} borderRadius={8} boxShadow="sm">
                <Flex>
                    <Box style={{
                    position:'relative',
                    right: 40,
                    top:-70,
                    }}>
                        <Text color={'#838794'} fontWeight={'bold'} fontSize='xl'>Return Route</Text>
                    </Box>
                </Flex>
                <Flex>
                    <Box style={{position:'relative', left:-60, top: -70}}>
                        <Checkbox style={{color:'#838794'}} defaultIsChecked>Do You want the above return route?</Checkbox> 
                        <ul>
                        {fields.map((item, index) => {
                        return (
                            <li key={item.id}>
                                <Flex>
                                    <input width={250}
                                        name={`test[${index}].starting_point`}
                                        placeholder='Enter Starting Point'
                                        defaultValue={`${item.starting_point}`} // make sure to set up defaultValue
                                        {...register("starting_point2", {
                                            required: "Required",
                                        })}
                                    />
                                    <input width={250}
                                        name={`test[${index}].location1`}
                                        placeholder='Enter Ending Point'
                                        defaultValue={`${item.location1}`} // make sure to set up defaultValue
                                        {...register("location2", {
                                            required: "Required",
                                        })}
                                    />  
                                </Flex>    
                            </li>
                            );
                            })}
                        </ul>       
                    </Box>
                    <Box style={{position:'relative', left:250, top: -60}}>
                        <Button type='button' onClick={() => {
                                append({ starting_point2: " ", location2: " " });
                                }} style={{position:'absolute',}} background={'White'} color={'Blue'} width={100} variant='outline' 
                                borderWidth={1} borderRadius={20} boxShadow="lg">Add Location
                        </Button>
                    </Box>
                </Flex>
            </Box>
        </Box>
    );
  }
  