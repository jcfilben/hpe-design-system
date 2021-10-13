import PropTypes from 'prop-types';
import { Box, Paragraph, Text } from 'grommet';

import { getPageDetails } from '../../utils';
import { HighlightPhrase } from '.';

export const SearchResult = ({ query, result }) => {
  const hub = result.url && result.url.split('/')[1];
  const parent = getPageDetails(hub);

  return (
    <Box gap="xsmall" pad={{ vertical: 'xxsmall' }} width="large">
      <>
        {parent && (
          <Box align="center" direction="row" gap="xsmall">
            {parent.icon && parent.icon('8px', parent.color)}
            <Text size="small">{result.name}</Text>
          </Box>
        )}
        {result.title && (
          <Text size="large" color="text-strong">
            <HighlightPhrase phrase={query} size="large">
              {result.title}
            </HighlightPhrase>
          </Text>
        )}
      </>
      {result.description && (
        <Paragraph margin="none" fill>
          <HighlightPhrase phrase={query}>{result.description}</HighlightPhrase>
        </Paragraph>
      )}
    </Box>
  );
};

SearchResult.propTypes = {
  query: PropTypes.string,
  result: PropTypes.object,
};