import { Button, Image } from '@chakra-ui/react';
import { IoMdArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const GoBackButton = () => {
  const navigate = useNavigate();
  return (
    <Button w='48px' p='0' onClick={() => navigate(-1)}>
      <Image as={IoMdArrowBack} size='24px' />
    </Button>
  );
};

export default GoBackButton;
