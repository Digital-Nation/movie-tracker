import React from 'react';
import {
  Text,
  Image,
  CircularProgress,
  Center,
  Container,
  Box,
  HStack,
  Heading,
  IconButton,
  List,
  ListItem,
  ListIcon,
  Tooltip
} from '@chakra-ui/react';
import { ChevronLeftIcon, AddIcon, CheckIcon, InfoOutlineIcon, CalendarIcon, StarIcon, TimeIcon } from '@chakra-ui/icons';
import { useParams, useHistory } from 'react-router-dom';
import useMovie from '../hooks/useMovie';
import { buildImageUrl, imageFallback } from '../connectors/tmdb';
import { getYear, MovieLength, STATUS } from '../utils';
import WatchlistButton from '../components/WatchlistButton';

export default function Movie() {
  const { movieId } = useParams();
  const history = useHistory();
  const [isHistoryActive, setHistoryActive] = React.useState(false); // temp state, for UI only, should be removed when implemented properly

  const { movie, status, error, updateStatus, updateMovie } = useMovie(movieId);

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
        <Text>
          Error fetching movie with ID {movieId}: {JSON.stringify(error)}
        </Text>
      </Container>
    );
  }

  return (
    <Container p={3} maxW="80em">
      <HStack mb={3} justify="space-between">
        <IconButton
          aria-label="Back"
          icon={<ChevronLeftIcon />}
          variant="outline"
          fontSize={36}
          colorScheme="teal"
          onClick={history.goBack}
        />
        <HStack>
          <WatchlistButton movie={movie} status={updateStatus} update={updateMovie} />
          <IconButton
            aria-label={isHistoryActive ? 'Remove from history' : 'Mark as watched'}
            icon={isHistoryActive ? <CheckIcon /> : <AddIcon />}
            colorScheme="teal"
            variant={isHistoryActive ? 'solid' : 'outline'}
            onClick={() => setHistoryActive(a => !a)}
          />
        </HStack>
      </HStack>
      <HStack spacing={4} align="flex-start">
        <Box>
          <Image
            src={buildImageUrl(movie.poster_path, 'w300')}
            alt="Poster"
            w="35vw"
            maxW={300}
            fallbackSrc={imageFallback}
          />
        </Box>
        <Box w="100%">
          <HStack justify="space-between">
            <Heading as="h2">{movie.title}</Heading>
            <Tooltip label={movie.vote_average + "/10"} aria-label={movie.vote_average} placement="auto" bg="teal.600" variant="outline">
            <Box d="flex" mt="2" alignItems="center">
          {Array(5)
            .fill("")
            .map((_, i) => (
              <StarIcon
                key={i}
                color={i < Math.floor((movie.vote_average)/2) ? Math.round((movie.vote_average)/2) >= 3 ? "teal.500" : "red.500" : "gray.300"}
              />
            ))}
          <Box as="span" ml="2" color="teal.500"  fontSize="md">
            {movie.vote_count} votes
          </Box>
        </Box>
            </Tooltip>
          </HStack>
          <List >
          <ListItem>
            <ListIcon as={CalendarIcon}/>
            {getYear(movie.release_date)}
          </ListItem>
          <ListItem>
          <ListIcon as={TimeIcon}/>
            {MovieLength(movie.runtime)}
          </ListItem>
          {movie.genres.map(el => (<ListItem><ListIcon as={InfoOutlineIcon} color="teal.500" />{el.name}</ListItem>))}
          </List>
          <Text>{movie.overview}</Text>
        </Box>
      </HStack>
    </Container>
  );
}
