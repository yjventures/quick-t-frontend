import React, { useState } from 'react'
import logo from "../../assets/images/logo.png";
import areebaLogo from "../../assets/images/areeba.svg";
import { useNavigate } from 'react-router-dom';

const DummyPayment = () => {

    const [amountData, setAmountData] = useState(JSON.parse(localStorage.getItem('amountData')))
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        cardholderName: '',
        cardNumber: '',
        expiryDate: '',
        securityCode: '',
        country: '',
        address: '',
        city: '',
        postcode: '',
        state: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        // Perform validation here before navigating
        if (formData.cardholderName.trim() === '' ||
            formData.cardNumber.trim() === '' ||
            formData.expiryDate.trim() === '' ||
            formData.securityCode.trim() === '' ||
            formData.country.trim() === '' ||
            formData.address.trim() === '' ||
            formData.city.trim() === '' ||
            formData.postcode.trim() === '' ||
            formData.state.trim() === '') {
            // Handle validation error
            alert('Please fill in all required fields.');
            return;
        }

        // If validation passes, navigate to payment processing
        navigate('/paymentProcessing?session_id=2321312341');
    };


    return (
        <div style={{
            maxWidth: '900px',
            margin: '0 auto',
            padding: "50px 10px"
        }}>
            <img src={areebaLogo} alt="logo" style={{ width: '150px', height: '70px', objectFit: 'cover' }} />
            <div className="row justify-content-md-center mt-5">
                <div className="col-md-6">
                    <div className="mb-4">
                        <h2 className="fw-bold">Credit or Debit card</h2>
                    </div>
                    <div className="mb-3" >
                        <p className="form-label">
                            <span className='font-semibold'>
                                Cardholder name
                            </span>
                            (exactly as shown on card) *
                        </p>
                        <input type="text" className="form-control" id="cardholder-name" placeholder="" style={{
                            width: "100%",
                            border: '1px solid #000',
                            marginTop: '10px',
                            padding: '10px',
                            outline: 'none',
                            borderRadius: '5px'
                        }} />
                    </div>
                    {/* card number */}
                    <div className="mb-3" >
                        <p className="form-label">
                            <span className='font-semibold'>
                                Card number *
                            </span>
                            (exactly as shown on card) *
                        </p>
                        <input type="text" className="form-control" id="cardholder-name" placeholder="" style={{
                            width: "100%",
                            border: '1px solid #000',
                            marginTop: '10px',
                            padding: '10px',
                            outline: 'none',
                            borderRadius: '5px'
                        }} />
                    </div>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                        gap: '10px'
                    }}>
                        <div className="mb-3" style={{ width: '100%' }} >
                            <p className="form-label">
                                <span className='font-semibold'>
                                    Expiry date *
                                </span>
                            </p>
                            <input type="text" className="form-control" id="cardholder-name" placeholder="MM / YY"
                                style={{
                                    width: "100%",
                                    border: '1px solid #000',
                                    marginTop: '10px',
                                    padding: '10px',
                                    outline: 'none',
                                    borderRadius: '5px'
                                }}
                            />
                        </div>
                        {/* card number */}
                        <div className="mb-3" style={{ width: '100%' }}>
                            <p className="form-label">
                                <span className='font-semibold'>
                                    Security code *
                                </span>
                            </p>
                            <input type="text" className="form-control" id="cardholder-name" placeholder="" style={{
                                width: "100%",
                                border: '1px solid #000',
                                marginTop: '10px',
                                padding: '10px',
                                outline: 'none',
                                borderRadius: '5px'
                            }} />
                        </div>
                    </div>

                    <div className="mb-3" style={{ width: '100%' }}>
                        <p className="form-label">
                            <span className='font-semibold'>
                                Country *
                            </span>
                        </p>
                        <select className="form-select form-select-lg mb-3 border-1"
                            style={{
                                width: "100%",
                                border: '1px solid #000',
                                marginTop: '10px',
                                padding: '10px',
                                outline: 'none',
                                borderRadius: '5px',
                                appearance: 'none'
                            }}

                            aria-label="Large select example">
                            <option selected>Open this select menu</option>
                            <option value="1">UK</option>
                            <option value="2">Canada</option>
                            <option value="3">Australia</option>
                        </select>
                    </div>

                    <div className="mb-3" style={{ width: '100%' }}>
                        <p className="form-label">
                            <span className='font-semibold'>
                                Address *
                            </span>
                        </p>
                        <input type="text" className="form-control" id="cardholder-name" placeholder="Add fllor, unit, suit etc" style={{
                            width: "100%",
                            border: '1px solid #000',
                            marginTop: '10px',
                            padding: '10px',
                            outline: 'none',
                            borderRadius: '5px'
                        }} />
                    </div>

                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                        gap: '10px'
                    }}>
                        <div className="mb-3" style={{ width: '100%' }} >
                            <p className="form-label">
                                <span className='font-semibold'>
                                    City *
                                </span>
                            </p>
                            <input type="text" className="form-control" id="cardholder-name" placeholder=""
                                style={{
                                    width: "100%",
                                    border: '1px solid #000',
                                    marginTop: '10px',
                                    padding: '10px',
                                    outline: 'none',
                                    borderRadius: '5px'
                                }}
                            />
                        </div>
                        {/* card number */}
                        <div className="mb-3" style={{ width: '100%' }}>
                            <p className="form-label">
                                <span className='font-semibold'>
                                    Postcode / ZIP Code *
                                </span>
                            </p>
                            <input type="text" className="form-control" id="cardholder-name" placeholder="" style={{
                                width: "100%",
                                border: '1px solid #000',
                                marginTop: '10px',
                                padding: '10px',
                                outline: 'none',
                                borderRadius: '5px'
                            }} />
                        </div>
                    </div>


                    <div className="mb-3" style={{ width: '100%' }}>
                        <p className="form-label">
                            <span className='font-semibold'>
                                State / Province *
                            </span>
                        </p>
                        <input type="text" className="form-control" id="cardholder-name" placeholder="Add fllor, unit, suit etc" style={{
                            width: "100%",
                            border: '1px solid #000',
                            marginTop: '10px',
                            padding: '10px',
                            outline: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }} />
                    </div>


                    <div style={{ width: '100%' }}>
                        <button
                            onClick={() => {
                                navigate('/paymentProcessing?session_id=2321312341')
                            }}  
                            type="button"
                            style={{
                                background: '#ccc',
                                padding: "10px 25px",
                                borderRadius: '5px',
                                marginLeft: '85%',
                            }}>
                            Pay ${amountData?.transfer_total}</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default DummyPayment