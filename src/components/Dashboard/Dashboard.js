import { useContext } from 'react';
import { AuthContext } from '../Auth/AuthContext';
import { AdminDashboard } from './AdminDashboard';
import { ManagerDashboard } from './ManagerDashboard';
import { UserDashboard } from './UserDashboard';

const Dashboard = () => {
    const { user } = useContext(AuthContext);

    if (user.role === 1) {
        return <AdminDashboard />;
    } else if (user.role === 2) {
        return <ManagerDashboard />;
    } else if (user.role === 3) {
        return <UserDashboard />;
    } else {
        return <p>No dashboard available for your role</p>
    }
};

export default Dashboard;
