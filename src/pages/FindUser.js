import GetLikedCities from "../components/user/GetLikedCities";
import GetUser from "../components/user/GetUser";


function FindUser() {
    return (
        <div>
            <GetUser />
            <GetLikedCities />
        </div>
    );
}

export default FindUser;