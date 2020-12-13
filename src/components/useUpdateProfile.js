import React from 'react';
import { IconButton, Tooltip } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { STATUS } from '../utils';
import {firstnameValue} from '../pages/Profile';
import useProfile from '../hooks/useProfile';

export default function updateButton() {
    const { updateProfile } = useProfile();
    const useUpdateProfile = (firstnameValue) => {
        console.log('updateProfile' + firstnameValue);
        updateProfile({
            first_name: firstnameValue
        });
    };
}