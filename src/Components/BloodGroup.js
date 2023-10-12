import React from 'react';

const BloodGroup = ({ className }) => {
    return (
        <>
            <option value="A+" className={className}>A+</option>
            <option value="A-" className={className}>A-</option>
            <option value="B+" className={className}>B+</option>
            <option value="B-" className={className}>B-</option>
            <option value="AB+" className={className}>AB+</option>
            <option value="AB-" className={className}>AB-</option>
            <option value="O+" className={className}>O+</option>
            <option value="O-" className={className}>O-</option>
        </>
    );
};

export default BloodGroup;