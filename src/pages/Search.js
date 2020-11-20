import React from 'react';
import { useParams, useHistory, Link as RouterLink } from 'react-router-dom';
import { buildImageUrl, imageFallback } from '../connectors/tmdb';
import {
  Box,
  Input,
  IconButton,
  Button,
  Center,
  SimpleGrid,
  ListItem,
  Container,
  Link,
  Tooltip,
  Image,
  Progress,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
} from '@chakra-ui/react';
import { SearchIcon, ChatIcon } from '@chakra-ui/icons';
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
    <Container p={3} maxW="80em">
    <Center>
      <Box as="form" onSubmit={handleSearch} w="50%" d="flex" mb={30}>
      
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
        data.results.length !== 0 ?
        <SimpleGrid columns={3}  spacing={5} >
        
          {data.results.map(({ id, title, release_date, poster_path, overview, vote_average }) => (
            <Container>
            <Box as={RouterLink} to={`/movies/${id}`} key={id} pos="relative" noOfLines={2}>
            
              <Image
                boxSize="lg"
                objectFit="cover"
                src={buildImageUrl(poster_path)}
                alt="Poster"
                fallbackSrc={imageFallback}
                pos="relative"
                border={"solid"}
                mb={1}
                
              />
            </Box>
            <Center>
            <Box >
            <Popover placement="top" >
              <PopoverTrigger>
                <Button colorScheme={"teal"} variant="outline">Details</Button>
              </PopoverTrigger>
              <PopoverContent color="teal.500"  >
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>
                <Text>{title}</Text>
                <Text>
                Release date: {release_date.slice(0,4)}
                </Text>  
                <Text>
                Score: {vote_average > 0? vote_average : ''}
                </Text>
                </PopoverHeader>
                <PopoverBody>
                  <Text>
                    { overview}
                  </Text>
                </PopoverBody>
              </PopoverContent>
          </Popover>
            </Box>
            </Center>
            
            </Container>
            
          ))}
        
          </SimpleGrid>
       
        : <Text>:( no film with title {terms} found</Text>
      )}
      {/*DONE @todo: Display a message when no results DONE*/}
    </Container>
  );
}
