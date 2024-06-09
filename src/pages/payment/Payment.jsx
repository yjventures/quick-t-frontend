import React, { useState } from 'react'

const Payment = () => {
    const [sessionId, setSessionId] = useState(localStorage.getItem("sessionId") || null);
    console.log(sessionId);

    function errorCallback(error) {
        console.log(JSON.stringify(error));
    }
    function cancelCallback() {
        console.log('Payment cancelled');
    }

    Checkout.configure({
        session: {
            id: 'SESSION0002996462188N91484713F7'
        },
    });

    return (
        <>
            <div id="embed-target"></div>

            {/* <input type="button" value="Pay with Embedded Page" onclick="Checkout.showEmbeddedPage('#embed-target');" /> */}
            {/* <input type="button" value="Pay with Payment Page" onclick="Checkout.showPaymentPage();" /> */}

            <button onClick={()=> {
                Checkout.showEmbeddedPage('#embed-target');
            }}>
                pay with embedded page
            </button>

        </>
    )
}

export default Payment