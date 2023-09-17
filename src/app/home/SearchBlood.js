import React, { useEffect, useState } from 'react';

const SearchBlood = () => {
    const [areas, setAreas] = useState([]);
    const [selectedDivision, setSelectedDivision] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');

    useEffect(() => {
        // Load data from your JSON file
        fetch('/demo.json')
            .then((res) => res.json())
            .then((data) => setAreas(data.bangladesh));
    }, []);

    const handleDivisionChange = (event) => {
        setSelectedDivision(event.target.value);
        setSelectedDistrict(''); // Reset the selected district when changing division
    };

    const handleDistrictChange = (event) => {
        setSelectedDistrict(event.target.value);
    };

    const divisionOptions = areas.map((area) => (
        <option key={area.division_name} value={area.division_name}>
            {area.division_name}
        </option>
    ));

    const districtOptions = areas.find((area) => area.division_name === selectedDivision)?.districts.map((district) => (
        <option key={district.district_name} value={district.district_name}>
            {district.district_name}
        </option>
    ));

    const thanaOptions = areas
        .find((area) => area.division_name === selectedDivision)
        ?.districts.find((district) => district.district_name === selectedDistrict)
        ?.thana_or_upazila.map((thana) => (
            <option key={thana} value={thana}>
                {thana}
            </option>
        ));

    return (
        <section className="flex justify-center my-12">
            <div>
                <select name="division" value={selectedDivision} onChange={handleDivisionChange}>
                    <option value="">Select Division</option>
                    {divisionOptions}
                </select>
                <select name="district" value={selectedDistrict} onChange={handleDistrictChange}>
                    <option value="">Select District</option>
                    {districtOptions}
                </select>
                <select name="thana" defaultValue="">
                    <option value="">Select Thana/Upazila</option>
                    {thanaOptions}
                </select>
            </div>
        </section>
    );
};

export default SearchBlood;
