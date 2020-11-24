import React from 'react'
import { STATUS } from '../utils';
import { HISTORY } from '../connectors/api';
import { Tooltip, IconButton } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';


export default function HistoryButton({ movie, status, update }) {
    const toggleHistory = () => {
      update({
        ...movie,
        history: movie.history === HISTORY.WATCHED ? HISTORY.REMOVED : HISTORY.WATCHED,
      });
    }
  
    const isWatched = movie.history === HISTORY.WATCHED; // we don't care if watchlist is REMOVED or undefined, both means it's not listed
    const label = isWatched ? 'Remove from history' : 'Add to history';
    return(
        <Tooltip label={label}>
        <IconButton
            aria-label={label} 
            icon={<AddIcon />}
            colorScheme="teal"
            variant="outline"
            isLoading={status === STATUS.PENDING}
            onClick={toggleHistory}
          />
          </Tooltip>
    )
}
