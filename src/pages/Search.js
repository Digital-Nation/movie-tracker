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
  Container,
  Image,
  Progress,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from '@chakra-ui/react';
import { SearchIcon} from '@chakra-ui/icons';
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
      <Box as="form" onSubmit={handleSearch} w="50%" d="flex" mb={30} >
      
        <Input placeholder="Search for a movie..." defaultValue={terms} ref={searchRef} mr={3} color="orange.500" focusBorderColor="orange.500"/>
        <IconButton
          aria-label="Search for a movie"
          icon={<SearchIcon />}
          type="submit"
          isLoading={status === STATUS.PENDING}
          colorScheme={"orange"} 
          variant="outline"
        />
        
      </Box>
      </Center>
      {status === STATUS.IDLE && <Center><Text fontSize={"1.5rem"} color={"orange.500"} overflowWrap={"break-word"}>Hello there! Here you'll find all the great movies! Just type their name in the box above</Text></Center>}
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
                borderColor={"orange.500"}
                mb={1}
                
              />
            </Box>
            <Center>
            <Box >
            <Popover placement="top" >
              <PopoverTrigger>
                <Button colorScheme={"orange"} variant="outline">Details</Button>
              </PopoverTrigger>
              <PopoverContent color="orange.500"  >
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>
                <Text>{title}</Text>
                <Text>
                Release date: {getYear(release_date)}
                </Text>  
                <Text >
                Score: {vote_average > 0? vote_average : 'N/A'}
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
       
        : <Center><Text>:( no film with title {terms} found</Text></Center>
      )}
      {/*DONE @todo: Display a message when no results DONE*/}
    </Container>
  );
}
