import { TextInput, Checkbox, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import { FC } from 'react';
interface CardProps {
  settest: any
}


const QueriesForm:FC<CardProps> = ({settest}) => {
  const form = useForm({
    initialValues: {
      name: '',
      termsOfService: false,
    },
  
    validate: {
      name: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  return (
    <Box sx={{ maxWidth: 390 }} mx="auto">
      <form onSubmit={form.onSubmit((values:any) => settest(values))}>
        <TextInput
          required
          label="Query Name"
          placeholder="your@email.com"
          {...form.getInputProps('name')}
        />

        <Checkbox
          mt="md"
          label="I agree to sell my privacy"
          {...form.getInputProps('termsOfService', { type: 'checkbox' })}
        />

        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
}

export default QueriesForm