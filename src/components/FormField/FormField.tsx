import { Field } from 'formik';
import { Flex, Input, Text } from '@chakra-ui/react';

type FormFieldProps = {
  name: string;
  type?: string;
  placeholder?: string;
  error?: string;
  touched?: boolean;
};

export default function FormField({
  name,
  type = 'text',
  placeholder,
  error,
  touched,
}: FormFieldProps) {
  return (
    <Flex flexDir='column' gap='4px'>
      <Input as={Field} name={name} type={type} placeholder={placeholder} />
      {error && touched && (
        <Text color='red.500' fontSize='sm'>
          {error}
        </Text>
      )}
    </Flex>
  );
}
