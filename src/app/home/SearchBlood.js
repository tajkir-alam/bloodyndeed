import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';

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
        <div className="flex flex-col gap-2 justify-center">
            <select
                name="division"
                value={selectedDivision}
                onChange={handleDivisionChange}
                className='select select-error focus:outline-none'
            >
                <option value="">Select Division</option>
                {divisionOptions}
            </select>

            <select
                name="district"
                value={selectedDistrict}
                onChange={handleDistrictChange}
                className='select select-error focus:outline-none'
            >
                <option value="">Select District</option>
                {districtOptions}
            </select>
            <select
                name="thana"
                defaultValue=""
                className='select select-error focus:outline-none'
            >
                <option value="">Select Thana/Upazila</option>
                {thanaOptions}
            </select>
            
            <select
                name="bloodGroup"
                // value={selectedDivision}
                // onChange={handleDivisionChange}
                className='select select-error focus:outline-none'
            >
                <option value="">Select Blood Group</option>
                {thanaOptions &&
                    <>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                    </>
                }
            </select>

            <div className='text-center text-white'>
                <Link href="/"
                    className="btn btn-ghost glass mt-2 tracking-widest bg-red-600 hover:bg-red-700 hover:scale-105 duration-500"
                >
                    <FaSearch />
                    Find Donor
                </Link>
            </div>
        </div>
    );
};

export default SearchBlood;
