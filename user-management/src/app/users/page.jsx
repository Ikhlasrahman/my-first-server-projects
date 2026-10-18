import React, { Suspense } from 'react';
import Users from '../components/Users';

const UserDataShow = async () => {
    const usersPromise = async () => {
        const data = await fetch('http://localhost:5000/users')
        return data.json()
    }
    return (
        <div>
            <h2 className='text text-2xl'>User length:</h2>
            <Suspense fallback={<h2>Loading...</h2>}>
            <Users usersPromise={usersPromise}></Users>
            </Suspense>
            
        </div>
    );
};

export default UserDataShow;