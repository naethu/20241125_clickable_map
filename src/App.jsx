import {useState, useEffect} from "react";
import "react-datepicker/dist/react-datepicker.css";
import './App.css';
import MandatoryFilters from './components/MandatoryFilters.jsx';
import EventFilters from './components/EventFilters.jsx';
import PreferenceFilters from "./components/PreferenceFilters.jsx";
import LayerInfo from "./components/LayerInfo.jsx";
import RouteIcon from '@mui/icons-material/Route';
import LiveAnimals from "./components/LiveAnimals.jsx";

function valuetext(value) {
    const hours = Math.floor(value / 60);
    const minutes = value % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

function Webmap() {
    const [startDate, setStartDate] = useState(new Date());
    const [startPlace, setStartPlace] = useState('Eingang West');
    const [endPlace, setEndPlace] = useState('Eingang West');
    const [duration, setDuration] = useState(0);
    const [isAccessible, setIsAccessible] = useState(false);
    const [timeRange, setTimeRange] = useState([540, 1020]);

    const [selectedCrafts, setSelectedCrafts] = useState([]);
    const [selectedActivities, setSelectedActivities] = useState([]);
    const [selectedShowEvents, setSelectedShowEvents] = useState([]);
    const [craftsListed, setCraftsListed] = useState([]);
    const [activitiesListed, setActivitiesListed] = useState([]);

    const [selectedAnimalSpecies, setSelectedAnimalSpecies] = useState([]);
    const [selectedBuildingChambers, setSelectedBuildingChambers] = useState([]);
    const [selectedAnimalBreeds, setSelectedAnimalBreeds] = useState([]);
    const [selectedBuildingYears, setSelectedBuildingYears] = useState([]);
    const [selectedBuildingConstructionMethods, setSelectedBuildingConstructionMethods] = useState([]);

    const [visiblePaths, setVisiblePaths] = useState([]);

    const updateActivities = async (date) => {
        const url = 'http://10.35.4.64:8000/api/filter/activities';
        const payload = {
            date: date,
            categories: ["Handwerk", "Mitmachen"]
        };

        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }

            const result = await response.json();

            // Initialize empty lists for each category
            const craftList = [];
            const activitiesList = [];

            // Sort the response data into the appropriate lists
            result.forEach(item => {
                const startTimeHour = item.events_start_time.slice(0, 5);
                const endTimeHour = item.events_end_time.slice(0, 5);
                if (item.category_name === "Handwerk") {
                    const formattedCraft = `${startTimeHour}-${endTimeHour}: ${item.descriptions_short_description_de}`;
                    craftList.push(formattedCraft);
                } else if (item.category_name === "Mitmachen") {
                    const formattedActivity = `${startTimeHour}-${endTimeHour}: ${item.descriptions_short_description_de}`;
                    activitiesList.push(formattedActivity);
                }
            });

            // Log the categorized lists
            setCraftsListed(craftList);
            setActivitiesListed(activitiesList);

        } catch (error) {
            console.error('Error updating activities:', error);
        }
    };

    const routingAPI = async (animalFilter, startPlace, endPlace) => {
        const url = 'http://10.35.4.64:8000/api/route/only_animals_starting_points';
        const payload = {
            animal_filter: animalFilter.map(animal => animal.toString()).join(", "),
            starting_point: startPlace.toString(),
            destination_point: endPlace.toString()
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorDetails = await response.text();
                throw new Error(`Error: ${response.status} - ${errorDetails}`);
            }

            const data = await response.json();
            setVisiblePaths(data.map(item => item.ways_svg_id.toString())); // Assumes response has 'ways_svg_id'
        } catch (error) {
            console.error('Fehler bei der Anfrage:', error);
        }
    };

    const handleGenerateRouteClick = () => {
        const startDateStr = `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')}-${String(startDate.getDate()).padStart(2, '0')}`;
        const startTime = valuetext(timeRange[0]);
        const endTime = valuetext(timeRange[1]);

        console.log('Besuchstag:', startDateStr);
        console.log('Startzeit:', startTime);
        console.log('Endzeit:', endTime);
        console.log('Startort:', startPlace);
        console.log('Schlussort:', endPlace);
        console.log('Barrierefreiheit:', isAccessible);
        console.log('Handwerks-Demonstration:', selectedCrafts);
        console.log('Mitmachaktivität:', selectedActivities);
        console.log('Veranstaltung:', selectedShowEvents);
        console.log('Tierarten:', selectedAnimalSpecies);
        console.log('Gebäudekammern:', selectedBuildingChambers);
        console.log('Tierrassen:', selectedAnimalBreeds);
        console.log('Gebäudebaujahr:', selectedBuildingYears);
        console.log('Gebäudestil:', selectedBuildingConstructionMethods);

        routingAPI(selectedAnimalSpecies, startPlace, endPlace);
    };

    useEffect(() => {
        const startDateStr = `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')}-${String(startDate.getDate()).padStart(2, '0')}`;
        console.log("Besuchstag geändert:", startDateStr);
        updateActivities(startDateStr)
    }, [startDate]);

    return (
        <div>
            <div className="filtergroup">
                <div className="Apptitle">Individuelle Routenplanung Ballenbergmuseum</div>
                <MandatoryFilters
                    startDate={startDate}
                    setStartDate={setStartDate}
                    startPlace={startPlace}
                    setStartPlace={setStartPlace}
                    endPlace={endPlace}
                    setEndPlace={setEndPlace}
                    timeRange={timeRange}
                    setTimeRange={setTimeRange}
                    duration={duration}
                    setDuration={setDuration}
                    isAccessible={isAccessible}
                    setIsAccessible={setIsAccessible}
                />
                <EventFilters
                    selectedCrafts={selectedCrafts}
                    setSelectedCrafts={setSelectedCrafts}
                    selectedActivities={selectedActivities}
                    setSelectedActivities={setSelectedActivities}
                    selectedShowEvents={selectedShowEvents}
                    setSelectedShowEvents={setSelectedShowEvents}
                    craftsListed={craftsListed}
                    activitiesListed={activitiesListed}
                />
                <PreferenceFilters
                    selectedAnimalSpecies={selectedAnimalSpecies}
                    setSelectedAnimalSpecies={setSelectedAnimalSpecies}
                    selectedBuildingChambers={selectedBuildingChambers}
                    setSelectedBuildingChambers={setSelectedBuildingChambers}
                    selectedAnimalBreeds={selectedAnimalBreeds}
                    setSelectedAnimalBreeds={setSelectedAnimalBreeds}
                    selectedBuildingYears={selectedBuildingYears}
                    setSelectedBuildingYears={setSelectedBuildingYears}
                    selectedBuildingConstructionMethods={selectedBuildingConstructionMethods}
                    setSelectedBuildingConstructionMethods={setSelectedBuildingConstructionMethods}
                />
                <button className="main-button" onClick={handleGenerateRouteClick}>
                    <RouteIcon className="icon" sx={{color: 'white'}}/>
                    Route erstellen
                </button>
            </div>
            <div className="app-container">
                <div className="layer-info">
                <LayerInfo visiblePaths={visiblePaths} setVisiblePaths={setVisiblePaths}/>
                </div>
                <div className="live-animals">
                <LiveAnimals visiblePaths={visiblePaths} setVisiblePaths={setVisiblePaths}/>
                </div>
            </div>
        </div>
    );
}

export default Webmap;