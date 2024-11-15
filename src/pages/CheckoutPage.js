import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserAddress, saveNewAddress } from "../redux/slices/addressSlice"; // Assuming saveNewAddress exists
import { placeOrder } from "../redux/slices/orderSlice";
import AddressForm from "../components/AddressForm";
import PaymentMethod from "../components/PaymentMethod";
import OrderSummary from "../components/OrderSummary";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../assets/styles/checkoutPage.css";

const CheckoutPage = () => {
    const { cartItems, totalPrice } = useSelector((state) => state.cart);
    const { addresses } = useSelector((state) => state.address);
    const [useNewAddress, setUseNewAddress] = useState(false);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const navigate = useNavigate();

    const [shippingInfo, setShippingInfo] = useState({
        addressId: null,
        country: "",
        city: "",
        street: "",
        zipCode: "",
        buildingName: "",
        state: "",
    });

    const [paymentMethod, setPaymentMethod] = useState("credit-card");
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserAddress());
    }, [dispatch]);

    const handleInputChange = (e) => {
        setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
    };

    const handleAddressSelect = (e) => {
        const addressId = e.target.value;
        setSelectedAddressId(addressId);
        if (addressId === "new") {
            setUseNewAddress(true);
            setShippingInfo({
                addressId: null,
                country: "",
                city: "",
                street: "",
                zipCode: "",
                buildingName: "",
                state: "",
            });
        } else {
            setUseNewAddress(false);
            const selectedAddress = addresses.find((addr) => addr.addressId === Number(addressId));
            if (selectedAddress) {
                setShippingInfo({
                    addressId: selectedAddress.addressId,
                    country: selectedAddress.country,
                    city: selectedAddress.city,
                    street: selectedAddress.street,
                    zipCode: selectedAddress.zipCode,
                    buildingName: selectedAddress.buildingName,
                    state: selectedAddress.state,
                });
            }
        }
    };

    const isAddressValid = () => {
        const { country, city, street, zipCode, buildingName, state } = shippingInfo;
        return country && city && street && zipCode && buildingName && state;
    };

    const handleOrderConfirmation = async () => {
        if (useNewAddress && !isAddressValid()) {
            toast.error("Please fill in all required address fields.");
            return;
        }
    
        try {
            let updatedShippingInfo = shippingInfo;
    
            if (useNewAddress) {
                const response = await dispatch(saveNewAddress(shippingInfo)); // Add `await`
                if (response.error) {
                    toast.error("Failed to save new address. Please try again.");
                    return;
                }
                updatedShippingInfo = { ...shippingInfo, addressId: response.payload.addressId };
            }
    
            const orderItems = cartItems.map(cartItem => ({
                productId: cartItem.productId,
                quantity: cartItem.quantity
            }));
    
            await dispatch(placeOrder({ address: updatedShippingInfo, orderItems })); // Add `await`
            toast.success("Order placed successfully!");
            navigate('/orders');
        } catch (error) {
            console.error("Order placement failed:", error);
            toast.error("Failed to place order. Please try again later.");
        }
    };
    

    return (
        <div className="checkout-page">
            <h1>Checkout</h1>
            <div className="checkout-container">
                {/* Shipping Information */}
                <div className="shipping-info">
                    <h2>Shipping Information</h2>
                    <label>
                        Select Address:
                        <select onChange={handleAddressSelect} value={selectedAddressId || ""}>
                            <option value="" disabled>Select an address</option>
                            {addresses.map((address) => (
                                <option key={address.addressId} value={address.addressId}>
                                    {`${address.buildingName}, ${address.street} (${address.city})`}
                                </option>
                            ))}
                            <option value="new">Use a New Address</option>
                        </select>
                    </label>
    
                    {useNewAddress && (
                        <AddressForm
                            shippingInfo={shippingInfo}
                            handleInputChange={handleInputChange}
                        />
                    )}
                </div>
    
                {/* Payment Method */}
                <PaymentMethod
                    paymentMethod={paymentMethod}
                    setPaymentMethod={setPaymentMethod}
                />
    
                {/* Order Summary */}
                <OrderSummary
                    cartItems={cartItems}
                    totalPrice={totalPrice}
                    handleOrderConfirmation={handleOrderConfirmation}
                />
            </div>
            <ToastContainer position="top-right" autoClose={20000} hideProgressBar={false} closeOnClick pauseOnHover draggable pauseOnFocusLoss />
        </div>
    );
    
};

export default CheckoutPage;
