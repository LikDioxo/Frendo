import React from "react";
import change from "../assets/images/change.png";
import remove from "../assets/images/delete_table.png";


function Table({header, entities})
{

    let columnLength = (100 - 1 * header.length) / header.length;
    let style = (columnLength.toString() + "% ").repeat(header.length);

    return (
        <div className="table">
            <div className="table-header" style={{gridTemplateColumns: style}}>
                {header.map((h)=>(<div className="table-cell table-header-cell">{h}</div>))}
            </div>
            <div className="table-body">
                {entities.map((row)=>
                    (<div className="table-row" style={{gridTemplateColumns: style}}>
                        {Object.values(row).map((e)=>
                            (<div className="table-cell">
                                {typeof e === 'object' ? JSON.stringify(Object.values(e).map((obj) => typeof obj === 'object' ? obj.id : obj)) : e}
                            </div>))}
                        <div className="table-cell-controls">
                            <button>
                                <img src={change}/>
                            </button>
                            <button>
                                <img src={remove}/>
                            </button>
                        </div>
                    </div>))}
            </div>
        </div>
    )
}


export default Table
