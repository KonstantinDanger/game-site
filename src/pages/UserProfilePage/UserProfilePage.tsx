import { Field, Form, Formik, type FormikHelpers } from 'formik';
import { Button, Flex, Input } from '@chakra-ui/react';

import { updateUser } from '@/redux/reducers/auth';
import { useDispatch, useSelector } from '@/redux/store';
import { authSelector } from '@/redux/selectors';
import type { RegisterUser } from '@/types/users';
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
    const pwd = values.password;
    const repeatedPwd = values.repeatedPwd;
    const name = values.name;

    if (pwd !== repeatedPwd) {
      toast.error('Passwords should match!');
      resetForm(actions);
      return;
    }

    if (name == player?.name) {
      toast.error('Username is the same!');
      return;
    }

    dispatch(
      updateUser({
        data: values,
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
        onSubmit={handleSubmit}
      >
        {({ dirty }) => (
          <Flex as={Form} flexDir='column' gap='24px' w='320px'>
            <label htmlFor={nameFieldId}>New name</label>
            <Input as={Field} name='name' type='input' id={nameFieldId} />

            <label htmlFor={pwdFieldName}>Password</label>
            <Input as={Field} name='repeatedPwd' type='password' id={pwdFieldName} />

            <label htmlFor={repeatedPwdFieldName}>Repeat password</label>
            <Input as={Field} name='password' type='password' id={repeatedPwdFieldName} />

            <Button type='submit' isLoading={isLoading} isDisabled={!dirty}>
              Update Profile
            </Button>
          </Flex>
        )}
      </Formik>
    </Flex>
  );
}
