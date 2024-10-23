import React from 'react';
import { Stack, Skeleton } from '@chakra-ui/react';

const ChatLoading = () => {
  return (
    <Stack spacing={3} width="100%">
      {[...Array(10)].map((_, i) => (
        <Skeleton key={i} height="40px" borderRadius="md" />
      ))}
    </Stack>
  );
};

export default ChatLoading;