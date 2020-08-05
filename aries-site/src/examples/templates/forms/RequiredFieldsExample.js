import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  CheckBox,
  Form,
  FormField,
  Header,
  Select,
  Text,
  TextInput,
  TextArea,
} from 'grommet';
import { CircleAlert } from 'grommet-icons';

const superPower = ['Flying', 'Sky Runner', 'Invisibility'];
const weakness = ['Fire', 'PB & J', 'Kryptonite'];

const RequiredFormField = props => {
  const { required, label, ...rest } = props;
  return (
    <FormField
      label={required ? `${label}*` : label}
      required={required}
      {...rest}
    />
  );
};

RequiredFormField.propTypes = {
  required: PropTypes.bool,
  label: PropTypes.string,
};

const FormContainer = ({ ...rest }) => {
  return (
    <Box background="background-front" border round="small" overflow="hidden">
      <Box flex pad={{ horizontal: 'medium', vertical: 'medium' }} {...rest} />
    </Box>
  );
};

const Error = ({ children, ...rest }) => {
  return (
    <Box direction="row" gap="xsmall" {...rest}>
      <Box flex={false} margin={{ top: 'hair' }} pad={{ top: 'xxsmall' }}>
        <CircleAlert size="small" />
      </Box>
      <Text size="xsmall">{children}</Text>
    </Box>
  );
};

Error.propTypes = {
  children: PropTypes.object,
};

export const RequiredFieldsExample = () => {
  const [formValues, setFormValues] = React.useState({
    name: 'Enduro',
    superPower: 'Sky Runner',
    nemesis: true,
    email: 'enduro@skyrunner.io.com',
    weakness: 'PB & J',
  });
  console.log('formvalues', formValues.name);
  // Set FormLevelError is set to true for display purposes
  // this should be set to false then api call will change state
  // eslint-disable-next-line no-unused-vars
  const [showFormLevelError, setShowFormLevelError] = React.useState(true);
  const onFormChange = value => {
    setFormValues(value);
  };
  // eslint-disable-next-line no-unused-vars
  const onSubmit = ({ value, touched }) => {
    // Your submission logic here
  };

  return (
    <FormContainer width="medium">
      <Box gap="medium">
        <Header
          direction="column"
          align="start"
          gap="xxsmall"
          pad={{ horizontal: 'xxsmall' }}
        >
          <Text size="xxlarge" weight="bold">
            Form Header
          </Text>
        </Header>
        <Box
          // Padding used to prevent focus from being cutoff
          pad={{ horizontal: 'xxsmall' }}
        >
          <Form
            messages={{
              required: (
                // need to define background otherwise
                // inherits validation-critical background
                <Error background="background-front">
                  This is a required field.
                </Error>
              ),
            }}
            onSubmit={({ value, touched }) => onSubmit({ value, touched })}
            value={formValues}
            onChange={onFormChange}
          >
            <RequiredFormField
              required
              error={
                <Error background="background-front">
                  Provide a unique name.
                </Error>
              }
              htmlFor="name__input"
              name="name"
              label="Name"
            >
              <TextInput id="name" name="name" />
            </RequiredFormField>
            <RequiredFormField
              required
              htmlFor="superPower__input"
              name="superPower"
              label="Superpower"
            >
              <Select options={superPower} id="superPower" name="superPower" />
            </RequiredFormField>
            <RequiredFormField
              required
              htmlFor="weakness__input"
              name="weakness"
              label="Weakness"
            >
              <Select options={weakness} id="weakness" name="weakness" />
            </RequiredFormField>
            <RequiredFormField
              required
              htmlFor="email__input"
              name="email"
              label="Email"
            >
              <TextInput id="email" name="email" />
            </RequiredFormField>
            <RequiredFormField
              required
              help="Would you like to apply nemesis character"
              htmlFor="nemesis__input"
              name="nemesis"
              label="Nemesis"
            >
              <CheckBox name="nemesis" label="Bring it on" toggle reverse />
            </RequiredFormField>
            <FormField htmlFor="comments" name="comments" label="Comments">
              <TextArea id="comments" name="comments" placeholder="Comments" />
            </FormField>
            {/* Show error if api call came back as an error  */}
            {showFormLevelError && (
              <Box
                direction="row"
                margin={{ top: 'medium', bottom: 'medium' }}
                gap="xsmall"
                round="4px"
                pad="small"
                background="validation-critical"
              >
                <Error>
                  The name of the superhero is already being used. Provide a
                  unique name.
                </Error>
              </Box>
            )}
            <Box align="start" margin={{ top: 'medium', bottom: 'small' }}>
              <Button label="Create" primary type="submit" />
            </Box>
          </Form>
        </Box>
      </Box>
    </FormContainer>
  );
};
