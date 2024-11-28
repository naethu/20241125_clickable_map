import PropTypes from 'prop-types';
import { useEffect, useState, useRef } from 'react';
import Layer8Image from '../public/data/ebene8.png';
import Layer7Image from '../public/data/ebene7.svg';
import Layer6Image from '../public/data/ebene6.svg';
import Layer5Image from '../public/data/ebene5.png';
import Layer4Image from '../public/data/ebene4.svg';
import Layer3Image from '../public/data/ebene3.png';
import Layer2Image from '../public/data/ebene2.svg';
import Layer1Image from '../public/data/ebene1.png';
import './LiveAnimals.css';

const CombinedMap = ({ visiblePaths }) => {
    const [visibleAnimals, setVisibleAnimals] = useState([]);
    const [visibleGrazes, setVisibleGrazes] = useState([]);

    const layerRefs = useRef([]);

    useEffect(() => {
        const fetchAnimalData = async () => {
            try {
                const response = await fetch('http://10.35.4.64:8000/api/graze/combined');
                if (!response.ok) throw new Error('Error loading animal data from the API');
                const data = await response.json();
                setVisibleAnimals(data);
            } catch (error) {
                console.error('Error loading animal data:', error);
            }
        };
        fetchAnimalData();
    }, []);

    useEffect(() => {
        const fetchWeidenData = async () => {
            try {
                const response = await fetch('http://10.35.4.64:8000/api/graze/id');
                if (!response.ok) throw new Error('Error loading weiden data from the API');
                const data = await response.json();
                const grazeIds = data.map((item) => item.graze_id);
                setVisibleGrazes(grazeIds);
            } catch (error) {
                console.error('Error loading weiden data:', error);
            }
        };
        fetchWeidenData();
    }, []);

    useEffect(() => {
        const updateVisibility = (svgDocument, type) => {
            if (!svgDocument) return;

            const setVisibilityRecursively = (element, visible) => {
                element.style.display = visible ? 'block' : 'none';
                Array.from(element.children).forEach((child) => {
                    if (child.tagName === 'g' || child.tagName === 'path') {
                        setVisibilityRecursively(child, visible);
                    }
                });
            };

            if (type === 'animals') {
                const tiereGroup = svgDocument.getElementById('5230_Tiere');
                if (tiereGroup) {
                    const animalElements = tiereGroup.querySelectorAll('g[id]');
                    animalElements.forEach((element) => {
                        const id = element.getAttribute('id') || '';
                        setVisibilityRecursively(element, visibleAnimals.includes(id));
                    });
                }
            } else if (type === 'paths') {
                const wegeGroup = svgDocument.getElementById('5230_Wege');
                if (wegeGroup) {
                    const pathElements = wegeGroup.querySelectorAll('path[id]');
                    pathElements.forEach((element) => {
                        const id = element.getAttribute('id') || '';
                        element.style.display = visiblePaths.includes(id) ? 'block' : 'none';
                    });
                }
            } else if (type === 'weiden') {
                const weidenGroup = svgDocument.getElementById('5230_Weiden');
                if (weidenGroup) {
                    const weidenElements = weidenGroup.querySelectorAll('path[id]');
                    weidenElements.forEach((element) => {
                        const id = element.getAttribute('id') || '';
                        const isVisible = visibleGrazes.includes(Number(id));
                        element.style.display = isVisible ? 'block' : 'none';
                    });
                }
            }
        };

        layerRefs.current.forEach((ref) => {
            if (ref && ref.contentDocument) {
                updateVisibility(ref.contentDocument, 'animals');
                updateVisibility(ref.contentDocument, 'paths');
                updateVisibility(ref.contentDocument, 'weiden');
            }
        });
    }, [visibleAnimals, visiblePaths, visibleGrazes]);

    return (
        <div>
            <div>
                <img src={Layer1Image} alt="Layer 1" className="layer"/>
                <object
                    ref={(el) => (layerRefs.current[0] = el)}
                    data={Layer2Image}
                    type="image/svg+xml"
                    className="layer"
                />
                <img src={Layer3Image} alt="Layer 3" className="layer"/>
                <object
                    ref={(el) => (layerRefs.current[1] = el)}
                    data={Layer4Image}
                    type="image/svg+xml"
                    className="layer"
                />
                <img src={Layer5Image} alt="Layer 5" className="layer"/>
                <object
                    ref={(el) => (layerRefs.current[2] = el)}
                    data={Layer6Image}
                    type="image/svg+xml"
                    className="layer"
                />
                <object
                    ref={(el) => (layerRefs.current[3] = el)}
                    data={Layer7Image}
                    type="image/svg+xml"
                    className="layer"
                />
                <img src={Layer8Image} alt="Layer 8" className="layer"/>
            </div>
        </div>
    );
};

CombinedMap.propTypes = {
    visiblePaths: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CombinedMap;
