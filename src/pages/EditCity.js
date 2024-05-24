import React from 'react';
import AddCity from '../components/city/AddCity';
import UpdateCity from '../components/city/UpdateCity';
import DeleteCity from '../components/city/DeleteCity';

function EditCity() {
    return (
        <div>
            <AddCity />
            <UpdateCity />
            <DeleteCity />
        </div>
    );
}

export default EditCity;