import AddUser from "../components/user/AddUser";
import UpdateUser from "../components/user/UpdateUser";
import DeleteUser from "../components/user/DeleteUser";
import SetLikeCity from "../components/user/SetLikeCity";

function EditUser() {
    return (
        <div>
            <AddUser />
            <UpdateUser />
            <DeleteUser />
            <SetLikeCity />
        </div>
    );
}

export default EditUser;