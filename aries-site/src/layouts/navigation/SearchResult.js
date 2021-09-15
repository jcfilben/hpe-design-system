import PropTypes from 'prop-types';
import { Box, Paragraph, Text } from 'grommet';

import { HighlightPhrase } from '.';

export const SearchResult = ({ query, result }) => (
  <Box gap="xsmall" pad={{ vertical: 'small' }} width="large">
    <>
      {result.title && (
        <Text size="large" color="text-strong">
          <HighlightPhrase phrase={query} size="large">
            {result.title}
          </HighlightPhrase>
        </Text>
      )}
      {result.url && (
        <Text size="small" weight={100}>
          <HighlightPhrase phrase={query} size="small">
            {result.url}
          </HighlightPhrase>
        </Text>
      )}
    </>
    {result.description && (
      <Paragraph margin="none" fill>
        <HighlightPhrase phrase={query}>{result.description}</HighlightPhrase>
      </Paragraph>
    )}
    {result.tags && (
      <Paragraph margin="none" size="small" weight={100}>
        tags:{' '}
        {result.tags.map(tag => (
          <HighlightPhrase key={tag} phrase={query} size="small">
            {`${tag}, `}
          </HighlightPhrase>
        ))}
      </Paragraph>
    )}
  </Box>
);

SearchResult.propTypes = {
  query: PropTypes.string,
  result: PropTypes.object,
};