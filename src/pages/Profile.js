import React from 'react';
import { 
    Text,
    Image,
    CircularProgress,
    Center,
    FormControl,
    Container,
    Stack,
    HStack,
    VStack,
    Box,
    Heading,
    IconButton,
    Input,
    InputGroup,
    InputLeftAddon,
    Checkbox,
    Select,
    StackDivider,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Button
} from '@chakra-ui/react';
import useProfile from '../hooks/useProfile';
import { STATUS } from '../utils';

export default function Profile() {
    const { profile, status, error, updateStatus, updateProfile } = useProfile();

    const [firstnameValue, firstnameSetValue] = React.useState("")
    const firstnameHandleChange = (event) => firstnameSetValue(event.target.value)

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
                    Error fetching movie with ID 
                </Text>
            </Container>
        );
    }
    console.log(profile);
    console.log(firstnameValue);
        return (
            <Container>
                <Center>
                    <Text fontSize="3xl" >PROFILE</Text>
                </Center>
                <VStack
                divider={<StackDivider borderColor="gray.200" />}
                spacing={4}
                align="stretch"
                >
                    <Box h="100px">
                        <text>{'Name: ' + profile.first_name + " " + profile.last_name}</text>
                        <InputGroup>
                            <InputLeftAddon children='First name' width='96px' />
                            <Input
                                placeholder= {profile.first_name}
                                variant='outline'
                              //  onChange={firstnameHandleChange}
                            />
                        </InputGroup>
                        <InputGroup>
                            <InputLeftAddon children='Surename' width='96px' />
                            <Input
                                placeholder={profile.last_name}
                                variant='outline'
                            />
                        </InputGroup>
                    </Box>
                    <Box h="60px">
                        <text>{'Email: ' + profile.email}</text>
                        <Input
                            placeholder={profile.email}
                            variant='outline'
                        />
                    </Box>
                    <Box h="20px">
                        <text>{'Birthdate: ' + profile.birthdate.slice(0, 10)
}</text>
                    </Box>
                    <Box h="60px">
                        <text>{'Language: ' + profile.language}</text>
                        <FormControl id="language">
                            <Select placeholder="Select language">
                                <option>English</option>
                                <option>Română</option>
                            </Select>
                        </FormControl>
                    </Box>
                    <Button colorScheme="blue" onClick={useUpdateProfile(firstnameValue)}>
                        Update Profile
                    </Button>
                </VStack>
            </Container>
        );
}