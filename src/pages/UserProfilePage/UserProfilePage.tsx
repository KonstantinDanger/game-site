import { Field, Form, Formik, type FormikHelpers } from 'formik';
import { Button, Flex, Input } from '@chakra-ui/react';

import { updateUser } from '@/redux/reducers/auth';
import { useDispatch, useSelector } from '@/redux/store';
import { authSelector } from '@/redux/selectors';
import type { RegisterUser } from '@/types/users';

export default function UserProfilePage() {
  const dispatch = useDispatch();
  const { player, status } = useSelector(authSelector);
  const isLoading = status === 'loading';

  const handleSubmit = (values: RegisterUser, actions: FormikHelpers<RegisterUser>) => {
    dispatch(
      updateUser({
        data: values,
        onSuccess: data =>
          actions.resetForm({
            values: {
              name: data.name,
              email: data.email,
              password: '',
            },
          }),
      }),
    );
  };

  return (
    <Flex alignItems='center' flexDir='column' gap='24px'>
      <h1>My Profile</h1>

      <Formik
        initialValues={{
          name: player?.name || '',
          email: player?.email || '',
          password: '',
        }}
        onSubmit={handleSubmit}
      >
        {({ dirty }) => (
          <Flex as={Form} flexDir='column' gap='24px' w='320px'>
            <Input as={Field} name='name' type='input' placeholder='Name' />
            <Input as={Field} name='email' type='email' placeholder='Email' />
            <Input as={Field} name='password' type='password' placeholder='Password' />
            <Button type='submit' isLoading={isLoading} isDisabled={!dirty}>
              Update Profile
            </Button>
          </Flex>
        )}
      </Formik>
    </Flex>
  );
}
