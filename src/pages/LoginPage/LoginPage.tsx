import { Field, Form, Formik, type FormikHelpers } from 'formik';
import { Button, Flex, Input, Text } from '@chakra-ui/react';

import { login } from '@/redux/reducers/auth';
import { useDispatch } from '@/redux/store';
import type { LoginUser } from '@/types/users';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  const dispatch = useDispatch();

  const handleSubmit = (values: LoginUser, actions: FormikHelpers<LoginUser>) => {
    dispatch(login({ email: values.email, password: values.password }));
    actions.resetForm();
  };

  return (
    <Flex alignItems='center' flexDir='column' gap='24px'>
      <h1>Log In</h1>

      <Flex w='320px' flexDir='column' gap='24px'>
        <Formik initialValues={{ email: '', password: '' }} onSubmit={handleSubmit}>
          <Flex as={Form} flexDir='column' gap='24px'>
            <Input as={Field} name='email' type='email' placeholder='Email' />
            <Input as={Field} name='password' type='password' placeholder='password' />
            <Button type='submit'>Log In</Button>
          </Flex>
        </Formik>

        <Flex justifyContent='center' gap='8px'>
          <Text>Don't have an account yet?</Text>

          <Button as={Link} to='/register' variant='link' colorScheme='blue'>
            Sign Up
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
