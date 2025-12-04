import { Link, useNavigate } from 'react-router-dom';
import { Form, Formik, type FormikHelpers } from 'formik';
import { Button, Flex, Text } from '@chakra-ui/react';

import { login } from '@/redux/reducers/auth';
import { useDispatch, useSelector } from '@/redux/store';
import { authSelector } from '@/redux/selectors';
import type { LoginUser, FormErrors } from '@/types/users';
import { EMAIL_REGEX } from '@/constants';
import FormField from '@/components/FormField/FormField';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status } = useSelector(authSelector);
  const isLoading = status === 'loading';

  const handleSubmit = (values: LoginUser, actions: FormikHelpers<LoginUser>) => {
    dispatch(
      login({
        data: values,
        onSuccess: () => {
          navigate('/');
          toast.success('Successfuly logged in');
        },
        onError: () => {
          toast.error('Something went wrong. Refresh the and try again');
        },
      }),
    );
    actions.resetForm();
  };

  return (
    <Flex alignItems='center' flexDir='column' gap='24px'>
      <h1>Log In</h1>

      <Flex w='320px' flexDir='column' gap='24px'>
        <Formik
          initialValues={{ email: '', password: '' }}
          validate={values => {
            const errors: FormErrors<LoginUser> = {};
            if (!values.email) {
              errors.email = 'Email is required';
            } else if (!EMAIL_REGEX.test(values.email)) {
              errors.email = 'Invalid email address';
            }
            if (!values.password) {
              errors.password = 'Password is required';
            }
            return errors;
          }}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Flex as={Form} flexDir='column' gap='24px'>
              <FormField
                name='email'
                type='email'
                placeholder='Email'
                error={errors.email}
                touched={touched.email}
              />
              <FormField
                name='password'
                type='password'
                placeholder='Password'
                error={errors.password}
                touched={touched.password}
              />
              <Button type='submit' isLoading={isLoading}>
                Log In
              </Button>
            </Flex>
          )}
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
