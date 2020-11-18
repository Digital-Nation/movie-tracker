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
            <Badge variant="solid" colorScheme="teal" pos="absolute" top={1} right={1}>
              {movie.vote_average}
            </Badge>
            <Tooltip label={movie.title}>
              <Image
                src={buildImageUrl(movie.poster_path, 'w300')}
                alt="Poster"
                fallbackSrc={imageFallback}
              />
            </Tooltip>
            <Text>{movie.title}</Text>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
}
