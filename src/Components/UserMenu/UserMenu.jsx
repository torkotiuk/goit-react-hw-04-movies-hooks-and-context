import { useContext } from 'react';
import ctx from '../../context/authContext';

const UserMenu = () => {
  const { user, logIn, logOut } = useContext(ctx);

  return (
    <div>
      {user ? (
        <button onClick={logOut}>Log out</button>
      ) : (
        <button onClick={logIn}>Log in</button>
      )}
      <p>{user}</p>
    </div>
  );
};

export default UserMenu;
