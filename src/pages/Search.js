import React from 'react';
import { useParams, useHistory, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Input,
  IconButton,
  UnorderedList,
  ListItem,
  Container,
  Link,
  Progress,
  Text,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import useFetch from '../hooks/useFetchEffect';
import { searchMovie } from '../connectors/tmdb';
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

  const { status, data, error } = useFetch(searchMovie(terms), !!terms);

  return (
    <Container p={3}>
      <Box as="form" onSubmit={handleSearch} w="100%" d="flex" mb={3}>
        <Input placeholder="Search for a movie..." defaultValue={terms} ref={searchRef} mr={3} />
        <IconButton
          aria-label="Search for a movie"
          icon={<SearchIcon />}
          type="submit"
          isLoading={status === STATUS.PENDING}
        />
      </Box>
      {status === STATUS.IDLE && <Text>Type some terms and submit for a quick search</Text>}
      {status === STATUS.PENDING && <Progress size="xs" isIndeterminate />}
      {status === STATUS.REJECTED && (
        <Text>
          Error fetching movies for {terms}: {JSON.stringify(error)}
        </Text>
      )}
      {status === STATUS.RESOLVED && (
        <UnorderedList>
          {data.results.map(({ id, title, release_date }) => (
            <ListItem key={id}>
              <Link as={RouterLink} to={`/movies/${id}`}>
                <Text as="span">{title} </Text>
                <Text as="span" color="GrayText">
                  {getYear(release_date)}
                </Text>
              </Link>
            </ListItem>
          ))}
        </UnorderedList>
      )}
      {/* @todo: Display a message when no results */}
    </Container>
  );
}
