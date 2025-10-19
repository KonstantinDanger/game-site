import { Field, Form, Formik, type FormikHelpers } from 'formik';
import { Button, Flex, Input } from '@chakra-ui/react';

import { updateUser } from '@/redux/reducers/auth';
import { useDispatch } from '@/redux/store';
import type { RegisterUser } from '@/types/users';

export default function UserProfilePage() {
  const dispatch = useDispatch();

  const handleSubmit = (values: RegisterUser, actions: FormikHelpers<RegisterUser>) => {
    dispatch(updateUser(values));
    actions.resetForm();
  };

  return (
    <Flex flexDir='column' gap='24px'>
      <h1>My Profile</h1>

      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        onSubmit={handleSubmit}
      >
        <Flex as={Form} flexDir='column' gap='24px' w='320px'>
          <Input as={Field} name='name' type='input' placeholder='Name' />
          <Input as={Field} name='email' type='email' placeholder='Email' />
          <Input as={Field} name='password' type='password' placeholder='Password' />
          <Button type='submit'>Update Profile</Button>
        </Flex>
      </Formik>
    </Flex>
  );
}
