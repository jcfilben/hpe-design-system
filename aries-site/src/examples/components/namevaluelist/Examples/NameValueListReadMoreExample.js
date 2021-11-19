import React, { useState } from 'react';
import { Box, Button, NameValueList, NameValuePair } from 'grommet';
import { FormDown, FormUp } from 'grommet-icons';
import { contentTruncationData } from '../data';

export const NameValueListReadMoreExample = () => {
  const MAX_LENGTH = 192;
  const [showAll, setShowAll] = useState(false);

  return (
    <Box pad="small">
      <NameValueList>
        {Object.entries(contentTruncationData).map(([name, value]) => (
          <NameValuePair key={name} name={name}>
            {value.length <= MAX_LENGTH ? (
              value
            ) : (
              <>
                {!showAll ? `${value.substring(0, MAX_LENGTH)}...` : value}
                <Button
                  alignSelf="start"
                  size="small"
                  label={`See ${!showAll ? 'more' : 'less'}`}
                  onClick={() => setShowAll(!showAll)}
                  icon={!showAll ? <FormDown /> : <FormUp />}
                  reverse
                />
              </>
            )}
          </NameValuePair>
        ))}
      </NameValueList>
    </Box>
  );
};