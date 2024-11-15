// src/components/AddressForm.js
import React from "react";

const AddressForm = ({ shippingInfo, handleInputChange }) => (
    <form>
        <label>
            Country:
            <input
                type="text"
                name="country"
                value={shippingInfo.country}
                onChange={handleInputChange}
                required
            />
        </label>
        <label>
            City:
            <input
                type="text"
                name="city"
                value={shippingInfo.city}
                onChange={handleInputChange}
                required
            />
        </label>
        <label>
            Street:
            <input
                type="text"
                name="street"
                value={shippingInfo.street}
                onChange={handleInputChange}
                required
            />
        </label>
        <label>
            Zip Code:
            <input
                type="text"
                name="zipCode"
                value={shippingInfo.zipCode}
                onChange={handleInputChange}
                required
            />
        </label>
        <label>
            Building Name:
            <input
                type="text"
                name="buildingName"
                value={shippingInfo.buildingName}
                onChange={handleInputChange}
                required
            />
        </label>
        <label>
            State:
            <input
                type="text"
                name="state"
                value={shippingInfo.state}
                onChange={handleInputChange}
                required
            />
        </label>
    </form>
);

export default AddressForm;
