import PropTypes from 'prop-types';  // Import PropTypes
import './FilterSelect.css';
import { Select, MenuItem, Chip } from '@mui/material';

// Gemeinsame Stile für Wiederverwendbarkeit
const commonStyles = {
    select: {
        width: '300px',
        height: '40px',
        borderRadius: '4px',
        fontSize: '15px',
        backgroundColor: 'white',
        border: '1px solid lightgray',
        textAlign: 'left',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
        '& .MuiSelect-icon': { right: 0, top: '50%', transform: 'translateY(-50%)', padding: '0px' },
        '& .MuiSelect-select': { padding: '0px', paddingLeft: '5px' },
    },
    menuItem: {
        fontSize: '15px',
        padding: '0px 5px',
        '&:hover': { backgroundColor: '#facdcd' },
        '&.Mui-selected': {
            backgroundColor: '#ffffff',
            fontWeight: 'bold',
            '&:hover': { backgroundColor: '#facdcd' },
        },
    },
    chip: {
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
    menuProps: {
        PaperProps: {
            sx: {
                borderRadius: '4px',
                maxHeight: 200,
                backgroundColor: 'white',
                boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
            },
        },
        MenuListProps: { sx: { padding: '0', fontSize: '15px' } },
    },
};

const FilterSelect = ({
                          title,
                          options,
                          selectedValues,
                          onChange,
                          maxDisplayedChips = 3,
                      }) => {  // Removed TypeScript type annotations
    const renderChips = (selected) => {  // Removed TypeScript type annotations
        const displayedChips = selected.length > maxDisplayedChips ? selected.slice(0, maxDisplayedChips - 1) : selected;
        const extraChipCount = selected.length - displayedChips.length;

        return (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                {displayedChips.map((value) => (
                    <Chip key={value} label={value} sx={commonStyles.chip} />
                ))}
                {extraChipCount > 0 && <Chip label={`+${extraChipCount}`} sx={commonStyles.chip} />}
            </div>
        );
    };

    return (
        <div className="filter-element">
            <div className="select-title">{title}</div>
            <Select
                variant="outlined"
                multiple
                value={selectedValues}
                onChange={onChange}
                sx={commonStyles.select}
                MenuProps={commonStyles.menuProps}
                renderValue={renderChips}
            >
                {options.map((option, index) => (
                    <MenuItem key={index} value={option} sx={commonStyles.menuItem}>
                        {option}
                    </MenuItem>
                ))}
            </Select>
        </div>
    );
};

// Add PropTypes validation
FilterSelect.propTypes = {
    title: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectedValues: PropTypes.arrayOf(PropTypes.string).isRequired,
    onChange: PropTypes.func.isRequired,
    maxDisplayedChips: PropTypes.number,
};

export default FilterSelect;
