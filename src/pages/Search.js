import React from 'react';
import { useParams, useHistory, Link as RouterLink } from 'react-router-dom';
import { buildImageUrl, imageFallback} from '../connectors/tmdb';
import { Center, SimpleGrid } from "@chakra-ui/react"
import {
  Box,
  Input,
  IconButton,
  UnorderedList,
  ListItem,
  Container,
  Image,
  Link,
  Progress,
  Text,

} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import useFetchEffect from '../hooks/useFetchEffect';
import { buildSearchMovieUrl } from '../connectors/tmdb';
import { getYear, STATUS } from '../utils';

export default function Search() {
  const { terms } = useParams();
  const history = useHistory();
  const searchRef = React.useRef(null);

  const handleSearch = event => {
    event.preventDefault();
    const value = searchRef.current.value;
    if (value !== terms) {
      history.push(`/search/${value}`);
    }
  };

  const { status, data, error } = useFetchEffect(buildSearchMovieUrl(terms), !!terms);

  return (
    <Container p={3} maxW="70em">
      <Center>
        <Box as="form" onSubmit={handleSearch} w="40%" d="flex" mb={3}>
          <Input placeholder="Search for a movie..." defaultValue={terms} ref={searchRef} mr={3} />
          <IconButton
            aria-label="Search for a movie"
            icon={<SearchIcon />}
            type="submit"
            isLoading={status === STATUS.PENDING}
          />
        </Box>
      </Center>
      {status === STATUS.IDLE && <Text>Type some terms and submit for a quick search</Text>}
      {status === STATUS.PENDING && <Progress size="xs" isIndeterminate />}
      {status === STATUS.REJECTED && (
        <Text>
          Error fetching movies for {terms}: {JSON.stringify(error)}
        </Text>
      )}
    
      {status === STATUS.RESOLVED && (

          <SimpleGrid columns={3} spacing={4}>
            {data.results.map(({ id, title, release_date, poster_path, popularity, original_language }) => (
              <Box key = {id}>
                <Link as={RouterLink} to={`/movies/${id}`}>

                  <Image
                    boxSize="lg"
                    objectFit="cover"
                    border={"solid"}
                    src={buildImageUrl(poster_path)}
                    fallbackSrc={imageFallback}
                    alt="Movie Poster"
                    pos="relative"
                    mb={1}
                  />
                
                  <Text as="span">{title} </Text>
                  <Text as="span" color="GrayText">
                    {getYear(release_date)}
                  </Text>
                
                </Link>
              </Box>     
            ))}
          </SimpleGrid>
      )}
      {/* @todo: Display a message when no results */}
    </Container>
  );
}