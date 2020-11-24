import React from "react"
import {
  Text,
  Image,
  CircularProgress,
  Center,
  Container,
  Box,
  Grid,
  Tooltip,
  Heading,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import useFetchEffect from '../hooks/useFetchEffect';
import { buildImageUrl, imageFallback } from '../connectors/tmdb';
import { HISTORY_URL } from '../connectors/api';
import { STATUS, SetDate} from '../utils';




export default function History() {
  const { status, data: movies, error } = useFetchEffect(`${HISTORY_URL}`);

  if (status === STATUS.IDLE) {
    return null;
  }
  if (status === STATUS.PENDING) {
    return (
      <Center minH="50vh">
        <CircularProgress isIndeterminate />
      </Center>
    );
  }
  if (status === STATUS.REJECTED) {
    return (
      <Container p={3}>
        <Text>Error fetching watchlist: {JSON.stringify(error)}</Text>
      </Container>
    );
  }

  return (
    <Container p={3} maxW="80em">
    <Center>
    <Heading mt={"30px"} mb={"50px"}>List of films you have already watched</Heading>
    </Center>
      <Grid h={"200"} templateRows="repeat(10, 1fr)" templateColumns="repeat(3, 1fr)" gap={"2rem"}>
        {movies.map(movie => (
          
          <Box key={movie.id} pos="relative" noOfLines={2}>
            
            
            <Link to={`/movies/${movie.id}`}>
            
              <Image
                src={buildImageUrl(movie.poster_path, 'w300')}
                alt="Poster"
                fallbackSrc={imageFallback}
                pos="relative"
                border={"solid"}
              />
              
              </Link>
           
            
            <Text pos="relative" top={0} marginTop={3} fontSize="1.5rem" as={Link}>{movie.title} </Text>
            <Box mt={"10px"} ml={"3px"} >
            Watched on: <SetDate/>
            </Box>
            
          </Box>
          
          
        ))}
        <Box>
            
            </Box>
      </Grid>
    </Container>
  );
  
}
