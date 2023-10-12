import BloodGroup from '@/Components/BloodGroup';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBlood = ({ className }) => {
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

    const handleBloodGroup = (event) => {
        console.log(event.target.value);
    }

    const divisionOptions = areas.map((area) => (
        <option key={area.division_name} value={area.division_name} className='text-black'>
            {area.division_name}
        </option>
    ));

    const districtOptions = areas.find((area) => area.division_name === selectedDivision)?.districts.map((district) => (
        <option key={district.district_name} value={district.district_name} className='text-black'>
            {district.district_name}
        </option>
    ));

    const thanaOptions = areas
        .find((area) => area.division_name === selectedDivision)
        ?.districts.find((district) => district.district_name === selectedDistrict)
        ?.thana_or_upazila.map((thana) => (
            <option key={thana} value={thana} className='text-black'>
                {thana}
            </option>
        ));

    return (
        <>
            <select
                name="division"
                value={selectedDivision}
                onChange={handleDivisionChange}
                className={className}
            >
                <option value="">Division</option>
                {divisionOptions}
            </select>

            <select
                name="district"
                value={selectedDistrict}
                onChange={handleDistrictChange}
                className={className}
            >
                <option value="">District</option>
                {districtOptions}
            </select>

            <select
                name="thana"
                defaultValue=""
                className={className}
            >
                <option value="">Thana/Upazila</option>
                {thanaOptions}
            </select>
        </>
    );
};

export default SearchBlood;
