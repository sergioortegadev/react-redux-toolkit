import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchUsers } from "../redux/usersSlice";

const UsersList = () => {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        //console.log(res);
        dispatch(fetchUsers(res.data));
      })
      .catch((error) => {
        console.error(error);
      });
  }, [dispatch]);

  return (
    <>
      <h2>Lista de Users de JSON Placeholders</h2>
      <div className="cards">
        {users.map((user) => (
          <figure key={user.id}>
            <img
              src={`https://i.pravatar.cc/200?u=${user.name}`}
              alt={user.name}
            />
            <figcaption>{user.name}</figcaption>
            <h4>{user.email}</h4>
          </figure>
        ))}
      </div>
    </>
  );
};

export default UsersList;
