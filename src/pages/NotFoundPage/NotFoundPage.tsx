import { Box, Button, Flex } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <Box>
      <h1>Page Not Found 404</h1>

      <Flex gap='24px' mt='100px'>
        <Button as={Link} to={`/`}>
          Main Page
        </Button>

        <Button as={Link} to={`/sign_in`}>
          Login
        </Button>
      </Flex>
    </Box>
  );
}
