import './MandatoryFilters.css';
import { useEffect } from 'react';
import DatePicker from "react-datepicker";
import { registerLocale } from 'react-datepicker';
import { de } from 'date-fns/locale';
import "react-datepicker/dist/react-datepicker.css";
import {Select, MenuItem, Slider, css} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessibleIcon from '@mui/icons-material/Accessible';
import PropTypes from 'prop-types';

// Registriere die deutsche Lokalisierung
registerLocale('de', de);

function valuetext(value) {
  const hours = Math.floor(value / 60);
  const minutes = value % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

const MandatoryFilters = ({
                            startDate,
                            setStartDate,
                            startPlace,
                            setStartPlace,
                            endPlace,
                            setEndPlace,
                            timeRange,
                            setTimeRange,
                            duration,
                            setDuration,
                            isAccessible,
                            setIsAccessible,
                          }) => {

  // Update duration when time range changes
  useEffect(() => {
    const newDuration = timeRange[1] - timeRange[0];
    setDuration(newDuration);
  }, [timeRange, setDuration]);

  // Marks for slider
  const marks = [
    { value: timeRange[0], label: valuetext(timeRange[0]) },
    { value: timeRange[1], label: valuetext(timeRange[1]) },
  ];

  const startTimeMin = 540; // 09:00
  const endTimeMax = 1020; // 17:00

  // Select styles
  const selectStyle = {
    height: '40px',
    width: '140px',
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

  // Menu item styles
  const menuItemStyle = {
    fontSize: '15px',
    padding: '0px',
    paddingLeft: '5px',
    '&:hover': {
      backgroundColor: '#facdcd',
    },
    '&.Mui-selected': {
      backgroundColor: '#ffffff',
      '&:hover': {
        backgroundColor: '#facdcd',
      },
    },
  };

  // Slider change handler
  const handleSliderChange = (event, newValue) => {
    const minDuration = 90; // 90 minutes
    const duration = newValue[1] - newValue[0];
    if (duration < minDuration) {
      if (newValue[0] + minDuration <= endTimeMax) {
        setTimeRange([newValue[0], newValue[0] + minDuration]);
      }
    } else {
      setTimeRange(newValue);
    }
  };

  // Place change handlers
  const handleChangeStartPlace = (event) => {
    setStartPlace(event.target.value);
  };

  const handleChangeEndPlace = (event) => {
    setEndPlace(event.target.value);
  };

  return (
      <div className="filtercontent">
        <div className="mandatoryfilters-container">

          {/* Row 1: Date Picker */}
          <div className="mandatoryfilters-line">
            <div className="grid-0">
              <CalendarTodayIcon className="custom-icon" />
            </div>
            <div className="grid-1">
              <div>Besuchstag:</div>
            </div>
            <div className="grid-2">
              <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  dateFormat="dd.MM.yyyy"
                  locale="de"
                  onKeyDown={(e) => e.preventDefault()}
                  customInput={
                    <div className="date-input-field">
                      {startDate.toDateString() === new Date().toDateString() ? (
                          <div>Heute</div>
                      ) : (
                          startDate.toLocaleDateString("de-DE", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })
                      )}
                    </div>
                  }
              />
            </div>
          </div>

          {/* Row 2: Start/End Place Selection */}
          <div className="mandatoryfilters-line">
            <div className="grid-0">
              <AccessTimeIcon className="custom-icon" />
            </div>
            <div className="grid-1">
              <div>Start-/Schlussort:</div>
            </div>
            <div className="grid-2" style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
              <Select
                  value={startPlace}
                  onChange={handleChangeStartPlace}
                  sx={{ ...selectStyle, width: '150px' }}
              >
                <MenuItem value="Eingang West" sx={{ ...menuItemStyle, paddingLeft: '10px' }}>
                  Eingang West
                </MenuItem>
                <MenuItem value="Eingang Ost" sx={{ ...menuItemStyle, paddingLeft: '10px' }}>
                  Eingang Ost
                </MenuItem>
              </Select>
              <Select
                  value={endPlace}
                  onChange={handleChangeEndPlace}
                  sx={{ ...selectStyle, width: '150px' }}
              >
                <MenuItem value="Eingang West" sx={{ ...menuItemStyle, paddingLeft: '10px' }}>
                  Eingang West
                </MenuItem>
                <MenuItem value="Eingang Ost" sx={{ ...menuItemStyle, paddingLeft: '10px' }}>
                  Eingang Ost
                </MenuItem>
              </Select>
            </div>
          </div>

          {/* Row 3: Time Range & Duration */}
          <div className="mandatoryfilters-line">
            <div className="grid-0">
              <LocationOnIcon className="custom-icon" />
            </div>
            <div className="grid-1">
              <div>Start-/Endzeit:</div>
            </div>
            <div className="grid-2">
              <Slider
                  value={timeRange}
                  onChange={handleSliderChange}
                  valueLabelDisplay="off"
                  valueLabelFormat={(value) => `${valuetext(value)}`}
                  min={startTimeMin}
                  max={endTimeMax}
                  step={15}
                  marks={marks}
                  sx={{
                    margin: '0px 8px',
                    paddingBottom: '25px',
                    '& .MuiSlider-rail': {
                      backgroundColor: '#555',
                    },
                    '& .MuiSlider-track': {
                      backgroundColor: '#666',
                      border: "none",
                    },
                    '& .MuiSlider-thumb': {
                      backgroundColor: '#555',
                      width: 16,
                      height: 16,
                      '&:hover': {
                        boxShadow: '0px 0px 8px rgba(80, 80, 80, 1)',
                        width: 20,
                        height: 20,
                      },
                    },
                    '& .MuiSlider-mark': {
                      backgroundColor: '#555',
                      width: 6,
                      height: 6,
                    },
                    '& .MuiSlider-markLabel': {
                      color: '#000',
                      fontSize: '15px',
                    },
                  }}
              />
            </div>
            <div className="grid-3" style={{ marginLeft: '20px' }}>
              Dauer:
            </div>
            <div className="grid-4">
              <div className="timeduration">
                {`${Math.floor(duration / 60)}:${String(duration % 60).padStart(2, '0')}h`}
              </div>
            </div>
          </div>

          {/* Row 4: Accessibility */}
          <div className="mandatoryfilters-line">
            <div className="grid-0">
              <AccessibleIcon className="custom-icon" />
            </div>
            <div className="grid-1">
              <div>Barrierefreie Route:</div>
            </div>
            <div className="grid-2">
              <input
                  className="checkbox"
                  type="checkbox"
                  checked={isAccessible}
                  onChange={(e) => setIsAccessible(e.target.checked)}
              />
            </div>
          </div>
        </div>
      </div>
  );
};

MandatoryFilters.propTypes = {
  startDate: PropTypes.instanceOf(Date).isRequired,
  setStartDate: PropTypes.func.isRequired,
  startPlace: PropTypes.string.isRequired,
  setStartPlace: PropTypes.func.isRequired,
  endPlace: PropTypes.string.isRequired,
  setEndPlace: PropTypes.func.isRequired,
  timeRange: PropTypes.arrayOf(PropTypes.number).isRequired,
  setTimeRange: PropTypes.func.isRequired,
  duration: PropTypes.number.isRequired,
  setDuration: PropTypes.func.isRequired,
  isAccessible: PropTypes.bool.isRequired,
  setIsAccessible: PropTypes.func.isRequired,
};

export default MandatoryFilters;
