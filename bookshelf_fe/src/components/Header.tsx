import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { UserTokenContext } from '../App';
interface HeaderProps {
    linkColor?: string;
}

const Header: React.FC<HeaderProps> = ({ linkColor }) => {
    const navigate = useNavigate();
    const contextValue = useContext(UserTokenContext);
    const handleLogout = () => {
        contextValue?.setToken('');
        navigate('/login');
    };
    return (
        <>
            <div>
                <Link to="/">
                    <Button className="text-muted px-0" variant="link" style={{ textDecoration:"none", marginRight: 15, color: linkColor }}>
                        <span className='headerLink' style={{ color: linkColor, fontSize:20 }}>Home</span>
                    </Button>
                </Link>
                <Link to="/list-books">
                    <Button className="text-muted px-0" variant="link" style={{ textDecoration:"none", marginRight: 30, color: linkColor }}>
                        <span className='headerLink' style={{ color: linkColor, fontSize:20}}>Show Books</span>
                    </Button>
                </Link>
                {
                    contextValue?.userToken ? (
                        <>
                            <Button className="text-muted" variant="link" onClick={handleLogout} style={{ textDecoration:"none", color: linkColor, backgroundColor:"#91cecf", borderWidth:0, borderRadius: 30 }}>
                                <span style={{ color: "#ffffff", fontSize:20}}>Logout</span>
                            </Button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">
                                <Button className="text-muted " style={{ textDecoration:"none", color: linkColor, backgroundColor:"#91cecf", borderWidth:0, borderRadius: 30 }}>
                                    <span className='headerLink' style={{ color: "#ffffff",fontSize:20 }}>Login</span>
                                </Button>
                            </Link>
                        </>
                    )
                }
            </div>
        </>
    );
};

export default Header;
