import React from "react";
import "../assets/css/admin.css";


function Table({header,entities})
{



    return (
        <div className="table">
            <div className="table-header">
                {header.map((h)=>(<div>{h}</div>))}
            </div>
            <div>
                {entities.map((row)=>
                    (<div>
                        {row.map((e)=>
                            (<div>
                                {e}
                            </div>))}
                        <div>изменить</div>
                        <div>удалить</div>
                    </div>))}
            </div>
        </div>
    )
}


export default Table