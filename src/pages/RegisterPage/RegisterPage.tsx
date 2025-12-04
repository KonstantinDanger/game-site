import { Link, useNavigate } from 'react-router-dom';
import { Form, Formik } from 'formik';
import { Button, Flex, Text } from '@chakra-ui/react';
import type { RegisterUser, FormErrors } from '@/types/users';
import { register } from '@/redux/reducers/auth';
import { useDispatch, useSelector } from '@/redux/store';
import { authSelector } from '@/redux/selectors';
import { EMAIL_REGEX, validatePassword } from '@/constants';
import FormField from '@/components/FormField/FormField';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status } = useSelector(authSelector);
  const isLoading = status === 'loading';

  const handleSubmit = (values: RegisterUser) => {
    const { repeatedPwd, ...registerData } = values;
    dispatch(
      register({
        data: registerData,
        onSuccess: () => {
          navigate('/');
          toast.success('Registration was successful');
        },
        onError: () => {
          toast.error('Something went wrong. Refresh page and try again');
        },
      }),
    );
  };

  return (
    <Flex alignItems='center' flexDir='column' gap='24px'>
      <h1>Sign Up</h1>

      <Flex w='320px' flexDir='column' gap='24px'>
        <Formik
          initialValues={{ name: '', email: '', password: '', repeatedPwd: '' }}
          validate={values => {
            const errors: FormErrors<RegisterUser> = {};
            if (!values.name || values.name.trim().length < 2) {
              errors.name = 'Name must be at least 2 characters';
            }
            if (!values.email) {
              errors.email = 'Email is required';
            } else if (!EMAIL_REGEX.test(values.email)) {
              errors.email = 'Invalid email address';
            }
            const passwordError = validatePassword(values.password);
            if (passwordError) {
              errors.password = passwordError;
            }
            if (values.repeatedPwd && !values.password) {
              errors.password = 'Password is required';
            }
            if (values.password && !values.repeatedPwd) {
              errors.repeatedPwd = 'Please confirm your password';
            } else if (
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
          {({ errors, touched }) => (
            <Flex as={Form} flexDir='column' gap='24px'>
              <FormField
                name='name'
                type='text'
                placeholder='Name'
                error={errors.name}
                touched={touched.name}
              />
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
              <FormField
                name='repeatedPwd'
                type='password'
                placeholder='Repeat Password'
                error={errors.repeatedPwd}
                touched={touched.repeatedPwd}
              />
              <Button type='submit' isLoading={isLoading}>
                Sign Up
              </Button>
            </Flex>
          )}
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
