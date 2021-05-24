import React from "react";


function Table({header, entities})
{
    console.log("entities", entities)

    return (
        // <div className="rounded-container double-shadowed table">
        //     <div className="table-header">
        //         {header.map((h)=>(<div>{h}</div>))}
        //     </div>
        //     <div>
        //         {entities.map((row)=>
        //             (<div>
        //                 {row.map((e)=>
        //                     (<div>
        //                         {e}
        //                     </div>))}
        //                 <div>изменить</div>
        //                 <div>удалить</div>
        //             </div>))}
        //     </div>
        // </div>
        <table>
            <thead>
                {header.map((h)=>(<td>{h}</td>))}
            </thead>
            <tbody>
                {entities.map((row) => (
                    <tr>
                        {Object.values(row).map((e) => (
                            <td>{
                                typeof e === 'object' ? JSON.stringify(Object.values(e).map((obj) => typeof obj === 'object' ? obj.id : obj)) : e
                            }</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}


export default Table
