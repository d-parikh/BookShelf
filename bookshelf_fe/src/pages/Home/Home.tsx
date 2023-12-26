import React from 'react';
import "./HomeCSS.css";
import { Col, Row } from 'react-bootstrap';
import Header from '../../components/Header';

const Home: React.FC = () => {
    return (
        <>
            <Header linkColor='#ffffff'/>
            <Row>
                <Col className='p-0' lg={7}>
                    <div className='imageContainer' >
                        <div className='overlayContainer'>
                            <div className='overlayContent'>
                                <p className='imageQuote' >A book is a dream that you hold in your hand.</p>
                                <p className='imageHeader'>KEEP READING</p>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col className='p-0' lg={5}>
                    <div className="textContainer">
                        <div style={{
                            boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                            padding: "80px 100px"
                        }}>
                            <p className='bigText'>THE</p>
                            <p className='bigText' style={{fontWeight: 500}}>IDEA</p>
                            <p className='bigText'>HUNTER</p>
                        </div>
                    </div>
                </Col>
            </Row>
        </>
    );
};

export default Home;
