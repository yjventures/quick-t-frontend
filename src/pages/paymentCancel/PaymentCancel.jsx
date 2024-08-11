import { Button } from 'flowbite-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function PaymentCancel() {
    const navigate = useNavigate()
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh'
        }}>
            <p className='mb-3'>Opps payment canceled! Please try again</p>
            <Button onClick={()=> {
                navigate('/')
            }}>Go Home</Button>
        </div>
    )
}
