import React from 'react';
import { Box, NameValueList, NameValuePair } from 'grommet';
import { alignmentData } from './data';

export const NameValueListAlignmentPreview = () => (
  <Box pad="small">
    <NameValueList>
      {Object.entries(alignmentData).map(([name, value]) => (
        <NameValuePair key={name} name={name}>
          {value}
        </NameValuePair>
      ))}
    </NameValueList>
  </Box>
);