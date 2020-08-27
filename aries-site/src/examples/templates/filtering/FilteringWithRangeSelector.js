import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Anchor,
  Box,
  Button,
  DropButton,
  FormField,
  Form,
  Layer,
  List,
  Header,
  Heading,
  RangeSelector,
  Stack,
  Select,
  Text,
  ResponsiveContext,
} from 'grommet';
import { FormClose, Filter } from 'grommet-icons';

const allData = [
  {
    availability: 90.2,
    name: 'Asup-array01-lvs (default)',
    location: 'San Jose, CA',
  },
  {
    availability: 70.3,
    name: 'Des-K8-Sym-R5-3 (default)',
    location: 'San Jose, CA',
  },
  {
    availability: 95.8,
    name: 'Dev36-erray01 ( default)',
    location: 'Houston, TX',
  },
  {
    availability: 85.1,
    name: 'asup-array1 (default)',
    location: 'Fort Collins, CO',
  },
  {
    availability: 53.4,
    name: 'asup-array21 (default)',
    location: 'New York, NY',
  },
  { availability: 77.3, name: 'Dpe-R3-19 (default)', location: 'Houston, TX' },
  {
    availability: 30.4,
    name: 'Asup-array10-lvs (default)',
    location: 'Fort Collins, CO',
  },
];

const defaultLocation = 'All Locations';
const defaultAvailability = [0, 100];
const defaultFilters = {};

export const FilteringWithRangeSelector = () => {
  const [data, setData] = useState(allData);
  const [filtering, setFiltering] = useState(false);

  return (
    <Box
      gap="medium"
      width={{ max: 'xxlarge' }}
      margin="auto"
      overflow="auto"
      pad="small"
      fill
    >
      <Header>
        <Box gap="xsmall">
          <Heading level={2} margin={{ bottom: 'small', top: 'none' }}>
            Storage
          </Heading>
          <Filters
            data={data}
            setData={setData}
            filtering={filtering}
            setFiltering={setFiltering}
          />
          <RecordSummary data={data} filter={filtering} />
        </Box>
      </Header>
      <Results data={data} />
    </Box>
  );
};

const Filters = ({ data, filtering, setData, setFiltering }) => {
  const [availability, setAvailability] = useState(defaultAvailability);
  const [filters, setFilters] = useState(defaultFilters);
  const [location, setLocation] = useState(defaultLocation);
  const [open, setOpen] = useState(false);
  const [previousValues, setPreviousValues] = useState({});
  const [showLayer, setShowLayer] = useState(false);
  const size = useContext(ResponsiveContext);

  useEffect(() => {
    if (availability !== defaultAvailability || location !== defaultLocation) {
      setFiltering(true);
    } else {
      setFiltering(false);
    }
  }, [availability, location, setFiltering]);

  const resetFilters = () => {
    setAvailability(defaultAvailability);
    setData(allData);
    setFilters(defaultFilters);
    setLocation(defaultLocation);
  };

  const filterData = (array, criteria) => {
    setFilters(criteria);
    const filterKeys = Object.keys(criteria);
    return array.filter(item => {
      // validates all filter criteria
      return filterKeys.every(key => {
        // ignores non-function predicates
        if (typeof criteria[key] !== 'function') return true;
        return criteria[key](item[key]);
      });
    });
  };

  if (size === 'small') {
    return (
      <>
        <Box align="center" direction="row" gap="xsmall">
          <Button
            icon={<Filter />}
            alignSelf="start"
            onClick={() => setShowLayer(true)}
          />
        </Box>
        {showLayer && (
          <Layer
            onClickOutside={() => {
              setShowLayer(!showLayer);
              setLocation(previousValues.location);
            }}
          >
            <Box width="large" pad="large" gap="medium">
              <Header>
                <Text color="text-strong" size="xxlarge" weight="bold">
                  Filter Categories
                </Text>
                <Button
                  icon={<FormClose />}
                  onClick={() => {
                    setShowLayer(!showLayer);
                    setLocation(previousValues.location);
                    setAvailability(previousValues.availability);
                  }}
                />
              </Header>
              <Box gap="small">
                <Text color="text-strong" size="large" weight="bold">
                  Location
                </Text>
                <LocationFilter
                  filters={filters}
                  filterData={filterData}
                  location={location}
                  setData={setData}
                  setLocation={setLocation}
                  previousValues={previousValues}
                  setPreviousValues={setPreviousValues}
                />
                <Text color="text-strong" size="large" weight="bold">
                  Availability
                </Text>
                <AvailabilityFilter
                  availability={availability}
                  setAvailability={setAvailability}
                  filters={filters}
                  filterData={filterData}
                  previousValues={previousValues}
                  setPreviousValues={setPreviousValues}
                  setData={setData}
                />
                <Text size="small">
                  {`${availability[0]}% - ${availability[1]}%`}
                </Text>
                <Box align="center" direction="row" justify="end" gap="medium">
                  {filtering && (
                    <Anchor label="Clear filters" onClick={resetFilters} />
                  )}
                  <Button
                    label={`See ${data.length} results`}
                    primary
                    onClick={() => {
                      const nextFilters = {
                        location:
                          location !== defaultLocation &&
                          (nextLocation => nextLocation === location),
                        availability: nextAvailability =>
                          nextAvailability >= availability[0] &&
                          nextAvailability <= availability[1],
                      };
                      const nextData = filterData(allData, nextFilters);
                      setData(nextData);
                      setShowLayer(!showLayer);
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </Layer>
        )}
      </>
    );
  }

  return (
    <Box align="center" direction="row" justify="between" gap="xsmall">
      <Box direction="row" gap="xsmall">
        <LocationFilter
          filters={filters}
          filterData={filterData}
          location={location}
          setData={setData}
          setLocation={setLocation}
          previousValues={previousValues}
          setPreviousValues={setPreviousValues}
        />
        <DropButton
          alignSelf="start"
          icon={<Filter />}
          open={open}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          dropContent={
            <Box pad="medium" width="medium">
              <Form>
                <FormField
                  name="range-selector"
                  htmlFor="range-selector"
                  label="Availability"
                >
                  <AvailabilityFilter
                    availability={availability}
                    setAvailability={setAvailability}
                    filters={filters}
                    filterData={filterData}
                    previousValues={previousValues}
                    setPreviousValues={setPreviousValues}
                    setData={setData}
                  />
                </FormField>
                <Text size="small">
                  {`${availability[0]}% - ${availability[1]}%`}
                </Text>
                <Box direction="row" justify="end" gap="small">
                  <Button
                    label="Reset Filter"
                    secondary
                    onClick={() => {
                      const nextFilters = {
                        ...filters,
                        availability: undefined,
                      };
                      const nextData = filterData(allData, nextFilters);
                      setData(nextData);
                      setAvailability(defaultAvailability);
                      setOpen(!open);
                    }}
                  />
                  <Button
                    label="Apply Filter"
                    primary
                    onClick={() => {
                      const nextFilters = {
                        ...filters,
                        availability: nextAvailability =>
                          nextAvailability >= availability[0] &&
                          nextAvailability <= availability[1],
                      };
                      const nextData = filterData(allData, nextFilters);
                      setData(nextData);
                      setOpen(!open);
                    }}
                  />
                </Box>
              </Form>
            </Box>
          }
          dropAlign={{ top: 'bottom', left: 'left' }}
        />
      </Box>
      {filtering && <Anchor label="Clear filters" onClick={resetFilters} />}
    </Box>
  );
};

Filters.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      availability: PropTypes.number,
      name: PropTypes.string,
      location: PropTypes.string,
    }),
  ).isRequired,
  filtering: PropTypes.bool.isRequired,
  setData: PropTypes.func.isRequired,
  setFiltering: PropTypes.func.isRequired,
};

const LocationFilter = ({
  filters,
  filterData,
  location,
  setData,
  setLocation,
  previousValues,
  setPreviousValues,
}) => {
  return (
    <Select
      options={[
        'All Locations',
        'Fort Collins, CO',
        'Houston, TX',
        'New York, NY',
        'San Jose, CA',
      ]}
      value={location}
      onChange={({ option }) => {
        const nextFilters = {
          ...filters,
          location:
            option !== defaultLocation &&
            (nextLocation => nextLocation === option),
        };
        const nextData = filterData(allData, nextFilters);
        // save previous value in case user
        // clicks 'x'
        setPreviousValues({
          ...previousValues,
          location,
        });
        setLocation(option);
        setData(nextData);
      }}
    />
  );
};

LocationFilter.propTypes = {
  filters: PropTypes.shape({
    availability: PropTypes.func,
    location: PropTypes.func,
  }).isRequired,
  filterData: PropTypes.func.isRequired,
  location: PropTypes.string.isRequired,
  setData: PropTypes.func.isRequired,
  setLocation: PropTypes.func.isRequired,
  previousValues: PropTypes.shape({
    availability: PropTypes.arrayOf(PropTypes.number),
    location: PropTypes.string,
  }).isRequired,
  setPreviousValues: PropTypes.func.isRequired,
};

const AvailabilityFilter = ({
  availability,
  setAvailability,
  filters,
  filterData,
  previousValues,
  setPreviousValues,
  setData,
}) => {
  const size = useContext(ResponsiveContext);
  return (
    <Stack>
      <Box background="border" height="3px" direction="row" />
      <RangeSelector
        name="range-selector"
        id="range-selector"
        min={0}
        max={100}
        values={availability}
        onChange={nextRange => {
          setAvailability(nextRange);
          // on mobile, we want to filter the data immediately but
          // on desktop, we wait until the user clicks
          // "Apply Filter" to filter the data
          if (size === 'small') {
            const nextFilters = {
              ...filters,
              availability: nextAvailability =>
                nextAvailability >= availability[0] &&
                nextAvailability <= availability[1],
            };
            const nextData = filterData(allData, nextFilters);
            // save previous value in case user
            // clicks 'x'
            setPreviousValues({
              ...previousValues,
              availability,
            });
            setData(nextData);
          }
        }}
      />
    </Stack>
  );
};

AvailabilityFilter.propTypes = {
  availability: PropTypes.string.isRequired,
  filters: PropTypes.shape({
    availability: PropTypes.func,
    location: PropTypes.func,
  }).isRequired,
  filterData: PropTypes.func.isRequired,
  setData: PropTypes.func.isRequired,
  setAvailability: PropTypes.func.isRequired,
  previousValues: PropTypes.shape({
    availability: PropTypes.arrayOf(PropTypes.number),
    location: PropTypes.string,
  }).isRequired,
  setPreviousValues: PropTypes.func.isRequired,
};

const RecordSummary = ({ data, filtering }) => (
  <Box direction="row" gap="xxsmall">
    <Text color="text-weak" size="small" weight="bold">
      {data.length}
    </Text>
    <Text color="text-weak" size="small">
      {filtering ? 'results' : 'items'}
    </Text>
  </Box>
);

RecordSummary.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      availability: PropTypes.number,
      name: PropTypes.string,
      location: PropTypes.string,
    }),
  ).isRequired,
  filtering: PropTypes.bool.isRequired,
};

const Results = ({ data }) => (
  <Box pad="xxsmall" overflow="auto" fill>
    <List
      background="background-front"
      border="horizontal"
      data={data}
      action={item => (
        <Box direction="row" align="center" gap="medium">
          <Box direction="row" gap="small" align="center">
            <Text>Availability: {item.availability}%</Text>
            <Box
              pad="xsmall"
              background={
                item.availability <= 70 ? 'status-critical' : 'status-ok'
              }
              round
            />
          </Box>
        </Box>
      )}
      onClickItem={() => {
        // eslint-disable-next-line no-alert
        alert(`
          Typically a click would route to a view with 
          greater detail behind this summary information.
          `);
      }}
    >
      {(datum, index) => (
        <>
          <Text weight="bold" key={index}>
            {datum.name}
          </Text>
          <Text size="small">{datum.location}</Text>
        </>
      )}
    </List>
  </Box>
);

Results.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      availability: PropTypes.number,
      name: PropTypes.string,
      location: PropTypes.string,
    }),
  ).isRequired,
};
