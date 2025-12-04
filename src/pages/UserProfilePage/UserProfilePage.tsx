import { Field, Form, Formik, type FormikHelpers } from 'formik';
import { Button, Flex, Input, Text } from '@chakra-ui/react';

import { updateUser } from '@/redux/reducers/auth';
import { useDispatch, useSelector } from '@/redux/store';
import { authSelector } from '@/redux/selectors';
import type { RegisterUser, FormErrors } from '@/types/users';
import { validatePassword } from '@/constants';
import { useId } from 'react';
import toast from 'react-hot-toast';

export default function UserProfilePage() {
  const dispatch = useDispatch();
  const { player, status } = useSelector(authSelector);
  const isLoading = status === 'loading';

  const nameFieldId = useId();
  const pwdFieldName = useId();
  const repeatedPwdFieldName = useId();

  const resetForm = (actions: FormikHelpers<RegisterUser>) => {
    actions.resetForm({
      values: {
        name: '',
        email: '',
        password: '',
        repeatedPwd: '',
      },
    });
  };

  const handleSubmit = (values: RegisterUser, actions: FormikHelpers<RegisterUser>) => {
    const name = values.name;

    if (name == player?.name) {
      toast.error('Username is the same!');
      return;
    }

    const { repeatedPwd, ...data } = values;

    dispatch(
      updateUser({
        data,
        onSuccess: () => resetForm(actions),
      }),
    );
  };

  return (
    <Flex alignItems='left' flexDir='column' gap='24px'>
      <h1>Welcome, {player?.name}</h1>

      <Formik
        initialValues={{
          name: player?.name || '',
          email: '',
          password: '',
          repeatedPwd: '',
        }}
        validate={values => {
          const errors: FormErrors<RegisterUser> = {};
          if (values.password) {
            const passwordError = validatePassword(values.password);
            if (passwordError) {
              errors.password = passwordError;
            }
          }
          if (values.password && !values.repeatedPwd) {
            errors.repeatedPwd = 'Please confirm your password';
          }
          if (values.repeatedPwd && !values.password) {
            errors.password = 'Password is required';
          }
          if (
            values.password &&
            values.repeatedPwd &&
            values.password !== values.repeatedPwd
          ) {
            errors.repeatedPwd = 'Passwords must match';
          }
          return errors;
        }}
        onSubmit={handleSubmit}
      >
        {({ dirty, errors, touched }) => (
          <Flex as={Form} flexDir='column' gap='24px' w='320px'>
            <label htmlFor={nameFieldId}>New name</label>
            <Input as={Field} name='name' type='input' id={nameFieldId} />

            <label htmlFor={pwdFieldName}>Password</label>
            <Input as={Field} name='password' type='password' id={pwdFieldName} />
            {errors.password && touched.password && (
              <Text color='red.500' fontSize='sm'>
                {errors.password}
              </Text>
            )}

            <label htmlFor={repeatedPwdFieldName}>Repeat password</label>
            <Input
              as={Field}
              name='repeatedPwd'
              type='password'
              id={repeatedPwdFieldName}
            />
            {errors.repeatedPwd && touched.repeatedPwd && (
              <Text color='red.500' fontSize='sm'>
                {errors.repeatedPwd}
              </Text>
            )}

            <Button type='submit' isLoading={isLoading} isDisabled={!dirty}>
              Update Profile
            </Button>
          </Flex>
        )}
      </Formik>
    </Flex>
  );
}
