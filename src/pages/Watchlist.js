import React from 'react';
import {
  Text,
  Image,
  CircularProgress,
  Center,
  Container,
  Box,
  SimpleGrid,
  Badge,
  Tooltip,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import useFetchEffect from '../hooks/useFetchEffect';
import { buildImageUrl, imageFallback } from '../connectors/tmdb';
import { WATCHLIST_URL } from '../connectors/api';
import { STATUS } from '../utils';

export default function Watchlist() {
  const { status, data: movies, error } = useFetchEffect(`${WATCHLIST_URL}`);

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
      <SimpleGrid minChildWidth={150} spacing={3}>
        {movies.map(movie => (
          <Box as={Link} to={`/movies/${movie.id}`} key={movie.id} pos="relative" noOfLines={2}>
            <Tooltip label={movie.genres[0].name} >
              <Image
                src={buildImageUrl(movie.poster_path, 'w300')}
                alt="Poster"
                fallbackSrc={imageFallback}
                pos="relative"
                border={"solid"}
              />
            </Tooltip>
            <Badge variant="solid" colorScheme="teal" pos="relative" top={1} right={0} padding={2} fontSize={15}>
              {movie.vote_average}
            </Badge>
            <Text pos="relative" top={0} marginTop={3} fontSize="1.5rem">{movie.title} </Text>
            
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
}
