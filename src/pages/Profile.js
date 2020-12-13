import React from "react";

import {
  Select,
  Checkbox,
  Text,
  Input,
  Container,
  Stack,
  Center,
  CircularProgress,
  Button,
} from "@chakra-ui/react";

import useFetchEffect from "../hooks/useFetchEffect";
import { PROFILE_URL } from "../connectors/api";
import { STATUS } from "../utils";

const Profile = () => {
  const { status, data: users, error } = useFetchEffect(`${PROFILE_URL}`);

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
        <Text>Error on fetching user: {JSON.stringify(error)}</Text>
      </Container>
    );
  }

  return (
    <Container>
      {users.map(
        ({ firstName, lastName, email, language, country, over18 }) => (
          <>
            <Text fontSize="3xl" marginBottom="10px">
              Hello, {firstName}!
            </Text>
            <Stack direction="column" spacing={5}>
              <Input placeholder="FirstName" value={firstName} />
              <Input placeholder="LastName" value={lastName} />
              <Input placeholder="Email" value={email} />
              <Checkbox isChecked={over18}>Are you over 18 years old?</Checkbox>
              <Select placeholder="Select language" defaultValue={language}>
                <option value={language}>{language}</option>
              </Select>
              <Select placeholder="Select country" defaultValue={country}>
                <option value={country}>{country}</option>
              </Select>
            </Stack>
            <Button colorScheme="teal" size="md" marginTop="10px">
              Save
            </Button>
          </>
        )
      )}
    </Container>
  );
};

export default Profile;
