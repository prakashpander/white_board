import React from 'react';
import { BsVectorPen } from "react-icons/bs";
import { VscTextSize } from "react-icons/vsc";
import { AiOutlineLine } from "react-icons/ai";
import { TbRectangle } from "react-icons/tb";
import { IoEllipseOutline } from "react-icons/io5";
import { TiLocationArrowOutline } from "react-icons/ti";
import { LuEraser } from "react-icons/lu";
import { GiLaserBurst } from "react-icons/gi";
import { GiClick } from "react-icons/gi";

function Tools({ currentTool, onClick }) {

    const tools = [
        { name: "Pen", tool: BsVectorPen, type: 1 },
        { name: "Text", tool: VscTextSize, type: 2 },
        { name: "Line", tool: AiOutlineLine, type: 4 },
        { name: "Rectangle", tool: TbRectangle, type: 8 },
        { name: "Ellipse", tool: IoEllipseOutline, type: 16 },
        { name: "Selector", tool: TiLocationArrowOutline, type: 32 },
        { name: "Eraser", tool: LuEraser, type: 64 },
        { name: "Laser", tool: GiLaserBurst, type: 128 },
        { name: "Click", tool: GiClick, type: 256 },
    ];

    return (

        <div className='block h-auto overflow-hidden'>
            <div className='w-[80px] h-auto bg-white rounded-2xl shadow-xl absolute top-2 left-3 flex-col items-center py-0.5 sm:gap-2 md:gap-5 z-[100]'>
                {
                    tools.map((tool, index) => {
                        const isSelected = currentTool === tool.type;

                        return <div className={`p-1.5 rounded-xl cursor-pointer transition-all duration-200 ease-in-out group shadow-xl shadow-gray-300 
                            ${isSelected ? "bg-blue-100" : "hover:bg-gray-100"}
                            `} key={index}
                            onClick={() => onClick(tool)}>
                            <div className='p-1'>
                                <tool.tool className={`w-10 h-10 transition-colors duration-200 pl-4
                                    ${isSelected ? "text-blue-600" : "text-gray-60 group-hover:text-blue-600"}
                                    `} />
                            </div>
                        </div>
                    })
                }
            </div>
        </div>

    )
}

export default Tools