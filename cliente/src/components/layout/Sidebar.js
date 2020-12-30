import React from 'react';
import Newproject from '../projects/Newproject';
import ListProjects from '../projects/ListProjects';

const Sidebar = () => {
    return (

        <aside>
            <h1>MERN<pan>Tasks</pan></h1>
            
            <Newproject/>
            
            <div className="proyectos">
                <h2>Yours Projects</h2>
                <ListProjects />
            </div>
        </aside>
    );
}

export default Sidebar;