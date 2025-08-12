import { Outlet } from "react-router";

const AdminLayout = () => {
    return (
        <div>
            admin Layout 
            <Outlet></Outlet>
        </div>
    );
};

export default AdminLayout;