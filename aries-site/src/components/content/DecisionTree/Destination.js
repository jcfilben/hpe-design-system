import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Collapsible, Paragraph, Text } from 'grommet';
import { FormDown, FormUp } from 'grommet-icons';

export const Destination = ({ children, detail, id, useCases, ...rest }) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <Box {...rest}>
      <Box id={id} background={{ color: 'yellow!' }} round="small">
        <Box pad={{ horizontal: 'medium', top: 'medium' }}>
          <Text color="text-strong" weight={500}>
            {children}
          </Text>
          <Paragraph
            color="text-strong"
            margin={{ top: 'small', bottom: 'xsmall' }}
            maxLines={showMore ? undefined : 3}
          >
            {detail}
          </Paragraph>
          <Collapsible open={showMore}>
            <Text color="text-strong" margin="none">
              Example use cases:
            </Text>
            {useCases && (
              <Box
                as="ul"
                gap="xsmall"
                pad={{ left: 'small', top: 'small' }}
                margin="none"
              >
                {useCases.map((useCase, index) => (
                  <Paragraph
                    as="li"
                    key={index}
                    color="text-strong"
                    margin="none"
                  >
                    {useCase}
                  </Paragraph>
                ))}
              </Box>
            )}
          </Collapsible>
        </Box>
        <Box pad={{ horizontal: 'small', bottom: 'small' }}>
          <Button
            alignSelf="start"
            label={showMore ? 'Show less' : 'Show all'}
            icon={showMore ? <FormUp /> : <FormDown />}
            onClick={() => setShowMore(!showMore)}
            margin={{ left: 'xsmall' }} // align button label with text above
            reverse
            size="small"
          />
        </Box>
      </Box>
    </Box>
  );
};

Destination.propTypes = {
  children: PropTypes.string,
  detail: PropTypes.string,
  useCases: PropTypes.arrayOf(PropTypes.string),
};
