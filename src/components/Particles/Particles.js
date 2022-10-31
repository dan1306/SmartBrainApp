import React from "react";
import Particles from "react-tsparticles";

import "./particles.css"




const Paps = () => {
        
        return (

                <Particles 
                params={{
                    polygon: {
                        enable: true,
                        type: 'inside',
                        move: {
                            radius: 10
                        },
                        url: 'path/to/svg.svg'
                    }
                }} />
        
        );
};
    


export default Paps