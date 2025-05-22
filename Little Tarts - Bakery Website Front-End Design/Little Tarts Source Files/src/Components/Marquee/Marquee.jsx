import React from 'react';
import './Marquee.css';

const Marquee = () => {
    return (
        <div className='marquee-container'>
            <div className='marquee-sec'>
                <div className="marquee">
                    <div className="marquee__group">
                        <span className='splend'>Splendid Taste ➺</span>
                        <span>Splendid Taste ➺</span>
                        <span>Splendid Taste ➺</span>
                    </div>
                    <div className="marquee__group" aria-hidden="true">
                        <span className='splend'>Splendid Taste ➺</span>
                        <span>Splendid Taste ➺</span>
                        <span>Splendid Taste ➺</span>
                    </div>
                </div>
                <div className="marqueesec">
                    <div className="marquee__groupsec">
                        <span className='flavourful'>Flavourful ➺</span>
                        <span>Flavourful ➺</span>
                        <span>Flavourful ➺</span>
                    </div>
                    <div className="marquee__groupsec" aria-hidden="true">
                        <span className='flavourful'>Flavourful ➺</span>
                        <span>Flavourful ➺</span>
                        <span>Flavourful ➺</span>
                    </div>
                </div>
            </div>
            <div className='marquee-enrich'>
                    <div className="marquee__groupenrich">
                        <span className='Enrich'>Enrich Yourself ➺</span>
                        <span>Enrich Yourself ➺</span>
                        <span>Enrich Yourself ➺</span>
                    </div>
                    <div className="marquee__groupenrich" aria-hidden="true">
                        <span className='Enrich'>Enrich Yourself ➺</span>
                        <span>Enrich Yourself ➺</span>
                        <span>Enrich Yourself ➺</span>
                    </div>
                </div>
            </div>
       
    );
}

export default Marquee;
