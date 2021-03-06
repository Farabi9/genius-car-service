import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useServiceDetail from '../../../hooks/useServiceDetail';
import {useAuthState} from 'react-firebase-hooks/auth'
import auth from '../../../firebase.init';
import axios from 'axios';
import { toast } from 'react-toastify';

const CheckOut = () => {
    const {serviceId} = useParams();
    const [service] = useServiceDetail(serviceId);
    const [user] = useAuthState(auth);
    if(user){
        console.log(user)
    }
    // const [user, setUser] = useState({
    //     name :'akbaer the great',
    //     email: 'akbor@gmail.com',
    //     address: 'tajmoholroad',
    //     phone: '01888888888'
    // })
    // const handleAdressChange = event =>{
    //  const  {address, ...rest} = user;
    //  const newAddress = event.target.value;
    //  const newUser = {address: newAddress, ...rest};
    // setUser(newUser)
    // }
    const handlePlaceOrder = event =>{
        event.preventDefault();
        const order = {
            email: user.email,
            service: service.name,
            serviceId: serviceId,
            address: event.target.address.value,
            phone: event.target.phone.value
        }
        axios.post('http://localhost:5000/order', order)
        .then(res =>{
            const {data} = res;
            if(data.insertedId){
                toast('Your order is booked');
                event.target.reset();
            }
        })

    }
    return (
        <div className='w-50 mx-auto'>
            <h2>
                Please Order: {service.name}
            </h2>
            <form onSubmit={handlePlaceOrder}>
                <input className='w-100 mb-2' type="text" value={user?.displayName} name='name' placeholder='name' required readOnly disabled/>
                <br />
                <input className='w-100 mb-2' type="email" value={user?.email} name='email' placeholder='email' required readOnly disabled />
                <br />
                <input className='w-100 mb-2' type="text" value={service.name} name='service' placeholder='service' required readOnly disabled />
                <br />
                <input className='w-100 mb-2' type="text" name='address' placeholder='address' autoComplete="off"  required />
                <br />
                <input className='w-100 mb-2' type="phone"name="phone" placeholder='phone' required />
                <br />
                <input className='btn btn-warning w-100 mx-auto' type="submit" value="Place order" />
            </form> 
        </div>
    );
};

export default CheckOut;