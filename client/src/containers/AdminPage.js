import React from "react";
import AdminHeader from "../components/AdminHeader";
import EntityNavigator from "./EntityNavigator";


function AdminPage()
{
    return (
        <div className="content">
            <AdminHeader/>

            <div className="admin-page">
                <EntityNavigator/>
            </div>

        </div>
    )
}


export default AdminPage
