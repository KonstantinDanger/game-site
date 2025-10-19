import { Button, Image } from '@chakra-ui/react';
import { IoMdArrowBack } from 'react-icons/io';
import { Link } from 'react-router-dom';

const GoBackButton = () => {
  return (
    <Button w='48px' p='0' as={Link} to='..'>
      <Image as={IoMdArrowBack} size='24px' />
    </Button>
  );
};

export default GoBackButton;
