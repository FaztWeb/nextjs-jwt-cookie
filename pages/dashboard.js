import axios from "axios";

function Dashboard() {
  const getProfile = async () => {
    const profile = await axios.get("/api/profile");
    console.log(profile);
  };

  const logout = async () => {
    const logout = await axios.get("/api/auth/logout");
    console.log(logout);
  };
  return (
    <div>
      Personal data
      <button onClick={() => getProfile()}>profile</button>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
}

export default Dashboard;
