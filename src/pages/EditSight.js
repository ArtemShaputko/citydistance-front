import React from 'react';
import AddSight from '../components/sight/AddSight';
import UpdateSight from '../components/sight/UpdateSight';
import DeleteSight from '../components/sight/DeleteSight';

function EditSight() {   
    return (
        <div>
            <AddSight />
            <UpdateSight />
            <DeleteSight />
        </div>
    );
}

export default EditSight;