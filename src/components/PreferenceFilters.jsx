import React, { useState, useEffect } from 'react';
import './PreferenceFilters.css';
import { Select, MenuItem, Chip } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const PreferenceFilters = ({
                               selectedAnimalSpecies,
                               setSelectedAnimalSpecies,
                               selectedBuildingChambers,
                               setSelectedBuildingChambers,
                               selectedAnimalBreeds,
                               setSelectedAnimalBreeds,
                               selectedBuildingYears,
                               setSelectedBuildingYears,
                               selectedBuildingConstructionMethods,
                               setSelectedBuildingConstructionMethods,
                           }) => {

    const [isExpanded, setIsExpanded] = useState(false);
    const [moreFilters, setMoreFilters] = useState(false);
    const [animalSpecies, setAnimalSpecies] = useState([]);
    const [animalBreeds, setAnimalBreeds] = useState([]);
    const [buildingYears, setBuildingYears] = useState([]);
    const [buildingConstructionMethods, setBuildingConstructionMethods] = useState([]);

    // Hardcoded List for the buildingchambers:
    const buildingChambers = [
        "Wallis",
        "Ostschweiz",
        "Tessin",
        "Graubünden",
        "Zentralschweiz",
        "Westschweiz",
        "Brandboden",
        "Zentrales Mittelland",
        "Jura",
        "Berner Oberland",
        "Alpwirtschaft",
        "Östliches Mittelland",
        "Berner Mittelland"
    ];

    const toggleArrow = () => {
        setIsExpanded(!isExpanded);
    };

    const toggleMoreFilters = () => {
        setMoreFilters(!moreFilters);
    };

    const filterBoxStyle = {
        padding: isExpanded ? '0px 10px 10px 10px' : '0px 10px 0px 10px',
    };

    useEffect(() => {
        const fetchAnimalSpecies = async () => {
            try {
                const response = await fetch('http://10.35.4.64:8000/api/filter/animal_species');
                const data = await response.json();
                setAnimalSpecies(data);
            } catch (error) {
                console.error("Fehler beim Abrufen der Daten:", error);
            }
        };

        fetchAnimalSpecies();
    }, []);

    useEffect(() => {
        const fetchAnimalBreeds = async () => {
            try {
                const response = await fetch('http://10.35.4.64:8000/api/filter/animal_breed');
                const data = await response.json();
                setAnimalBreeds(data);
            } catch (error) {
                console.error("Fehler beim Abrufen der Daten:", error);
            }
        };

        fetchAnimalBreeds();
    }, []);

    useEffect(() => {
        const fetchBuildingYears = async () => {
            try {
                const response = await fetch('http://10.35.4.64:8000/api/filter/building_year');
                const data = await response.json();
                const years = data.map(item => item.building_year);
                setBuildingYears(years);
            } catch (error) {
                console.error("Fehler beim Abrufen der Daten:", error);
            }
        };

        fetchBuildingYears();
    }, []);


    useEffect(() => {
        const fetchBuildingConstructionMethods = async () => {
            try {
                const response = await fetch('http://10.35.4.64:8000/api/filter/building_construction_method');
                const data = await response.json();
                const methods = data.map(item => item.building_construction_method);
                setBuildingConstructionMethods(methods);
            } catch (error) {
                console.error("Fehler beim Abrufen der Daten:", error);
            }
        };

        fetchBuildingConstructionMethods();
    }, []);

// Select styles
    const selectStyle = {
        height: '40px',
        width: '300px',
        borderRadius: '4px',
        fontSize: '15px',
        backgroundColor: 'white',
        border: '1px solid lightgray',
        textAlign: 'left',
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
    };

    const menuItemStyle = {
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
    };

    const chipStyle = {
        margin: '2px',
        height: '20px',
        width: 'auto',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        borderRadius: '4px',
        backgroundColor: '#ccc',
        fontSize: '12px',
    };

    const maxDisplayedChips = 3;

    const handleSelectChangeAnimalSpecies = (event) => {
        setSelectedAnimalSpecies(event.target.value);
    };

    const handleSelectChangeBuildingChambers = (event) => {
        setSelectedBuildingChambers(event.target.value);
    };

    const handleSelectChangeAnimalBreeds = (event) => {
        setSelectedAnimalBreeds(event.target.value);
    };

    const handleSelectChangeBuildingYears = (event) => {
        setSelectedBuildingYears(event.target.value);
    };

    const handleSelectChangeBuildingConstructionMethods = (event) => {
        setSelectedBuildingConstructionMethods(event.target.value);
    };

    return (
        <div className="filtercontent-animated" style={filterBoxStyle}>
            <div className="filter-title" onClick={toggleArrow}>
                <div className="filter-title-text">Was möchten Sie auf Ihrer Tour sehen? Wofür interessieren Sie sich? (optional)</div>
                <div className="arrow-icon">
                    {isExpanded ? (
                        <KeyboardArrowUpIcon sx={{ fontSize: '40px', color: 'red' }} />
                    ) : (
                        <KeyboardArrowDownIcon sx={{ fontSize: '40px', color: 'red' }} />
                    )}
                </div>
            </div>
            {isExpanded && (
                <div style={{display: 'flex', flexDirection: 'row', alignContent: 'space-between', width: '930px'}}>
                    {/* filter 1 */}
                    <div className="filter-element">
                        <div className="select-title">Tierarten</div>
                        <Select
                            variant="outlined"
                            multiple
                            value={selectedAnimalSpecies}
                            onChange={handleSelectChangeAnimalSpecies}
                            sx={selectStyle}
                            MenuProps={{PaperProps: {
                                    sx: {
                                        borderRadius: '4px',
                                        maxHeight: 200,
                                        backgroundColor: 'white',
                                        boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
                                    },
                                },
                                MenuListProps: {
                                    sx: {
                                        padding: '0',
                                        fontSize: '15px',
                                    },
                                },
                            }}
                            renderValue={(selected) => {
                                const displayedChips = selected.length > maxDisplayedChips ? selected.slice(0, 2) : selected;
                                const extraChipCount = selected.length - displayedChips.length;
                                return (
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                                        {displayedChips.map((value) => (
                                            <Chip
                                                key={value}
                                                label={value}
                                                sx={chipStyle}
                                            />
                                        ))}
                                        {extraChipCount > 0 && (
                                            <Chip
                                                label={`+${extraChipCount}`}
                                                sx={chipStyle}
                                            />
                                        )}
                                    </div>
                                );
                            }}
                        >
                            {animalSpecies.map((entrance, index) => (
                                <MenuItem key={index} value={entrance} sx={menuItemStyle}>
                                    {entrance}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>
                    {/* filter 2 */}
                    <div className="filter-element">
                        <div className="select-title">Geländekammern</div>
                        <Select
                            variant="outlined"
                            multiple
                            value={selectedBuildingChambers}
                            onChange={handleSelectChangeBuildingChambers}
                            sx={selectStyle}
                            MenuProps={{PaperProps: {
                                    sx: {
                                        borderRadius: '4px',
                                        maxHeight: 200,
                                        backgroundColor: 'white',
                                        boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
                                    },
                                },
                                MenuListProps: {
                                    sx: {
                                        padding: '0',
                                        fontSize: '15px',
                                    },
                                },
                            }}
                            renderValue={(selected) => {
                                const displayedChips = selected.length > maxDisplayedChips ? selected.slice(0, 2) : selected;
                                const extraChipCount = selected.length - displayedChips.length;
                                return (
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                                        {displayedChips.map((value) => (
                                            <Chip
                                                key={value}
                                                label={value}
                                                sx={chipStyle}
                                            />
                                        ))}
                                        {extraChipCount > 0 && (
                                            <Chip
                                                label={`+${extraChipCount}`}
                                                sx={chipStyle}
                                            />
                                        )}
                                    </div>
                                );
                            }}
                        >
                            {buildingChambers.map((chamber, index) => (
                                <MenuItem key={index} value={chamber} sx={menuItemStyle}>
                                    {chamber}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>
                    {/* button "mehr Filter" */}
                    <div className="filter-element more-filter-button-container">
                        <button className='more-filter-button' onClick={toggleMoreFilters}>
                            {moreFilters ? '- weniger Filter' : '+ mehr Filter'}
                        </button>
                    </div>
                </div>

            )}
            {moreFilters && isExpanded && (
                <div style={{display: 'flex', flexDirection: 'row', alignContent: 'space-between', width: '930px', marginTop: '20px'}}>
                    {/* filter 3 */}
                    <div className="filter-element">
                        <div className="select-title">Tierrassen</div>
                        <Select
                            variant="outlined"
                            multiple
                            value={selectedAnimalBreeds}
                            onChange={handleSelectChangeAnimalBreeds}
                            sx={selectStyle}
                            MenuProps={{PaperProps: {
                                    sx: {
                                        borderRadius: '4px',
                                        maxHeight: 200,
                                        backgroundColor: 'white',
                                        boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
                                    },
                                },
                                MenuListProps: {
                                    sx: {
                                        padding: '0',
                                        fontSize: '15px',
                                    },
                                },
                            }}
                            renderValue={(selected) => {
                                const displayedChips = selected.length > maxDisplayedChips ? selected.slice(0, 2) : selected;
                                const extraChipCount = selected.length - displayedChips.length;
                                return (
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                                        {displayedChips.map((value) => (
                                            <Chip
                                                key={value}
                                                label={value}
                                                sx={chipStyle}
                                            />
                                        ))}
                                        {extraChipCount > 0 && (
                                            <Chip
                                                label={`+${extraChipCount}`}
                                                sx={chipStyle}
                                            />
                                        )}
                                    </div>
                                );
                            }}
                        >
                            {animalBreeds.map((entrance, index) => (
                                <MenuItem key={index} value={entrance} sx={menuItemStyle}>
                                    {entrance}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>
                    {/* filter 4 */}
                    <div className="filter-element">
                        <div className="select-title">Gebäudebaujahr</div>
                        <Select
                            variant="outlined"
                            multiple
                            value={selectedBuildingYears}
                            onChange={handleSelectChangeBuildingYears}
                            sx={selectStyle}
                            MenuProps={{PaperProps: {
                                    sx: {
                                        borderRadius: '4px',
                                        maxHeight: 200,
                                        backgroundColor: 'white',
                                        boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
                                    },
                                },
                                MenuListProps: {
                                    sx: {
                                        padding: '0',
                                        fontSize: '15px',
                                    },
                                },
                            }}
                            renderValue={(selected) => {
                                const displayedChips = selected.length > maxDisplayedChips ? selected.slice(0, 2) : selected;
                                const extraChipCount = selected.length - displayedChips.length;
                                return (
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                                        {displayedChips.map((value) => (
                                            <Chip
                                                key={value}
                                                label={value}
                                                sx={chipStyle}
                                            />
                                        ))}
                                        {extraChipCount > 0 && (
                                            <Chip
                                                label={`+${extraChipCount}`}
                                                sx={chipStyle}
                                            />
                                        )}
                                    </div>
                                );
                            }}
                        >
                            {buildingYears.map((entrance, index) => (
                                <MenuItem key={index} value={entrance} sx={menuItemStyle}>
                                    {entrance}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>
                    {/* filter 5 */}
                    <div className="filter-element">
                        <div className="select-title">Konstruktionsweise</div>
                        <Select
                            variant="outlined"
                            multiple
                            value={selectedBuildingConstructionMethods}
                            onChange={handleSelectChangeBuildingConstructionMethods}
                            sx={selectStyle}
                            MenuProps={{PaperProps: {
                                    sx: {
                                        borderRadius: '4px',
                                        maxHeight: 200,
                                        backgroundColor: 'white',
                                        boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
                                    },
                                },
                                MenuListProps: {
                                    sx: {
                                        padding: '0',
                                        fontSize: '15px',
                                    },
                                },
                            }}
                            renderValue={(selected) => {
                                const displayedChips = selected.length > maxDisplayedChips ? selected.slice(0, 2) : selected;
                                const extraChipCount = selected.length - displayedChips.length;
                                return (
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                                        {displayedChips.map((value) => (
                                            <Chip
                                                key={value}
                                                label={value}
                                                sx={chipStyle}
                                            />
                                        ))}
                                        {extraChipCount > 0 && (
                                            <Chip
                                                label={`+${extraChipCount}`}
                                                sx={chipStyle}
                                            />
                                        )}
                                    </div>
                                );
                            }}
                        >
                            {buildingConstructionMethods.map((entrance, index) => (
                                <MenuItem key={index} value={entrance} sx={menuItemStyle}>
                                    {entrance}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PreferenceFilters;