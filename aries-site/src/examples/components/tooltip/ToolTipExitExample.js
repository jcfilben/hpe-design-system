import React from 'react';
import { Box, Button, Tip, Text } from 'grommet';
import { FormClose } from 'grommet-icons';

export const ToolTipExitExample = () => {
  return (
    <Box align="center" justify="center" fill>
      <Box gap="xsmall" round="xsmall">
        <Box justify="between" direction="row">
          <Text bold level={4} size="large">
            Add Service
          </Text>
          <Tip dropProps={{ align: { left: 'right' } }} content="Close">
            <Button icon={<FormClose />} />
          </Tip>
        </Box>
        <Box width="small">
          <Text>
            Visit the HPE catalog to start addiing all of your favoriite
            service.
          </Text>
        </Box>
      </Box>
    </Box>
  );
};
