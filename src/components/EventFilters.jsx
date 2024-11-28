import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import './EventFilters.css';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FilterSelect from './FilterSelect.jsx';

const EventFilters = ({
                          craftsListed,
                          activitiesListed,
                          selectedCrafts,
                          setSelectedCrafts,
                          selectedActivities,
                          setSelectedActivities,
                          selectedShowEvents,
                          setSelectedShowEvents,
                      }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleArrow = useCallback(() => {
        setIsExpanded(prev => !prev);
    }, []);

    const filterBoxStyle = isExpanded ? { padding: '0px 10px 10px 10px' } : { padding: '0px 10px 0px 10px' };

    const showEvents = ["keine Auswahl verfügbar"]; // Will be fetched from API

    const sharedStyles = {
        selectStyle: {
            height: '40px',
            width: '300px',
            borderRadius: '4px',
            fontSize: '15px',
            backgroundColor: 'white',
            border: '1px solid lightgray',
            textAlign: 'left',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            '& .MuiOutlinedInput-notchedOutline': {
                border: 'none',
            },
            '& .MuiSelect-icon': {
                right: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                padding: '0px',
            },
            '& .MuiSelect-select': {
                padding: '0px',
                paddingLeft: '5px',
            },
        },
        menuItemStyle: {
            fontSize: '15px',
            padding: '0px',
            paddingLeft: '5px',
            '&:hover': {
                backgroundColor: '#facdcd',
            },
            '&.Mui-selected': {
                backgroundColor: '#ffffff',
                fontWeight: 'bold',
                '&:hover': {
                    backgroundColor: '#facdcd',
                },
            },
        },
        chipStyle: {
            margin: '0px',
            height: '20px',
            width: '80px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            borderRadius: '4px',
            backgroundColor: '#ccc',
            fontSize: '12px',
        },
    };

    return (
        <div className="filtercontent-animated" style={filterBoxStyle}>
            <div className="filter-title" onClick={toggleArrow}>
                <div className="filter-title-text">Welche Programmpunkte möchten Sie besuchen? (optional)</div>
                <div className="arrow-icon">
                    {isExpanded ? (
                        <KeyboardArrowUpIcon sx={{ fontSize: '40px', color: 'red' }} />
                    ) : (
                        <KeyboardArrowDownIcon sx={{ fontSize: '40px', color: 'red' }} />
                    )}
                </div>
            </div>
            {isExpanded && (
                <div style={{ display: 'flex', flexDirection: 'row', alignContent: 'space-between', width: '930px' }}>
                    <FilterSelect
                        key="crafts"
                        title="Handwerks-Demonstration"
                        options={craftsListed}
                        selectedValues={selectedCrafts}
                        onChange={(event) => setSelectedCrafts(event.target.value)}
                        {...sharedStyles}
                    />
                    <FilterSelect
                        key="activities"
                        title="Mitmachaktivität"
                        options={activitiesListed}
                        selectedValues={selectedActivities}
                        onChange={(event) => setSelectedActivities(event.target.value)}
                        {...sharedStyles}
                    />
                    <FilterSelect
                        key="events"
                        title="Veranstaltung"
                        options={showEvents}
                        selectedValues={selectedShowEvents}
                        onChange={(event) => setSelectedShowEvents(event.target.value)}
                        {...sharedStyles}
                    />
                </div>
            )}
        </div>
    );
};

EventFilters.propTypes = {
    craftsListed: PropTypes.array.isRequired,
    activitiesListed: PropTypes.array.isRequired,
    selectedCrafts: PropTypes.array.isRequired,
    setSelectedCrafts: PropTypes.func.isRequired,
    selectedActivities: PropTypes.array.isRequired,
    setSelectedActivities: PropTypes.func.isRequired,
    selectedShowEvents: PropTypes.array.isRequired,
    setSelectedShowEvents: PropTypes.func.isRequired,
};

export default EventFilters;
