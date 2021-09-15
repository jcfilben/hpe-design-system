import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Keyboard, List } from 'grommet';
import { FormClose } from 'grommet-icons';

import { SearchInput, SearchResult } from '.';

export const SearchResults = ({
  allSuggestions,
  onChange,
  onClose,
  onEnter,
  onSelect,
  query,
  results,
  setSuggestions,
  ...rest
}) => {
  const searchRef = useRef();
  const [focused, setFocused] = useState(true);

  useEffect(() => {
    if (focused && searchRef.current) {
      searchRef.current.focus();
    }
  }, [focused, searchRef]);

  return (
    <Box
      background="background-front"
      round="small"
      pad={{ horizontal: 'medium', top: 'small', bottom: 'large' }}
      gap="small"
      width="large"
      {...rest}
    >
      <Button icon={<FormClose />} onClick={onClose} alignSelf="end" />
      <Box
        background="background-contrast"
        flex={false}
        round="xsmall"
        margin={{ horizontal: 'small' }}
      >
        <Keyboard onEsc={onClose} onEnter={onEnter}>
          <SearchInput
            ref={searchRef}
            placeholder="Search the HPE Design System"
            value={query}
            onChange={onChange}
            size="xlarge"
          />
        </Keyboard>
      </Box>
      <Box overflow="auto" pad="xsmall">
        <List
          data={results}
          onClickItem={onSelect}
          border="bottom"
          paginate
          step={4}
        >
          {datum => <SearchResult query={query} result={datum.value} />}
        </List>
        {results.length === 0 && (
          <SearchResult
            query={query}
            result={{
              title: `No results found for "${query}".`,
              description: 'Search tip: Helpful search tips could go here.',
            }}
          />
        )}
      </Box>
    </Box>
  );
};

SearchResults.propTypes = {
  allSuggestions: PropTypes.array,
  onChange: PropTypes.func,
  onClose: PropTypes.func,
  onEnter: PropTypes.func,
  onSelect: PropTypes.func,
  query: PropTypes.string,
  results: PropTypes.arrayOf(
    PropTypes.shape({
      query: PropTypes.string,
      matchedText: PropTypes.string,
      matchType: PropTypes.string,
      url: PropTypes.string,
      preview: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
    }),
  ),
  setSuggestions: PropTypes.func,
};