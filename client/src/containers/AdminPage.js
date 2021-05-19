import React from "react";
import AdminHeader from "../components/AdminHeader";
import EntityNavigator from "./EntityNavigator";
import "../assets/css/admin.css";
import EntityExplorer from "./EntityExplorer";




function AdminPage()
{
    return (
        <div className="content admin-content">
            <AdminHeader/>

            <div className="admin-page">
                <EntityNavigator/>
                <EntityExplorer/>
            </div>

        </div>
    )
}


export default AdminPage
