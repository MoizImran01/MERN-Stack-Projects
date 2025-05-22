import React, { useEffect, useRef } from 'react';
import locomotiveScroll from 'locomotive-scroll';
import './ScrollWrapper.css'; 

const ScrollWrapper = ({ children }) => {
    const scrollRef = useRef(null);

    useEffect(() => {
        const scroll = new locomotiveScroll({
            el: scrollRef.current,
            smooth: true, 
            smoothSpeed: 0.1,
           
        });

        return () => {
            if (scroll) {
                scroll.destroy(); 
            }
        };
    }, []);

    return <div className="scroll-container" ref={scrollRef}>{children}</div>;
};

export default ScrollWrapper;
