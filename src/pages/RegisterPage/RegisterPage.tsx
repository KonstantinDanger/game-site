import { Link, useNavigate } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import { Button, Flex, Input, Text } from '@chakra-ui/react';
import type { RegisterUser } from '@/types/users';
import { register } from '@/redux/reducers/auth';
import { useDispatch, useSelector } from '@/redux/store';
import { authSelector } from '@/redux/selectors';

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status } = useSelector(authSelector);
  const isLoading = status === 'loading';

  const handleSubmit = (values: RegisterUser) => {
    dispatch(register({ data: values, onSuccess: () => navigate('/') }));
  };

  return (
    <Flex alignItems='center' flexDir='column' gap='24px'>
      <h1>Sign Up</h1>

      <Flex w='320px' flexDir='column' gap='24px'>
        <Formik
          initialValues={{ name: '', email: '', password: '' }}
          onSubmit={handleSubmit}
        >
          <Flex as={Form} flexDir='column' gap='24px'>
            <Input as={Field} name='name' type='input' placeholder='Name' />
            <Input as={Field} name='email' type='email' placeholder='Email' />
            <Input as={Field} name='password' type='password' placeholder='Password' />
            <Button type='submit' isLoading={isLoading}>
              Sign Up
            </Button>
          </Flex>
        </Formik>

        <Flex justifyContent='center' gap='8px'>
          <Text>Already have an account?</Text>

          <Button as={Link} to='/login' variant='link' colorScheme='blue'>
            Log In
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
