import React, {useState, useCallback, useRef} from 'react';
import PerfectScrollbar from 'perfect-scrollbar';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import Sidebar from '../components/Admin/Sidebar';
import Navbar from '../components/Admin/Navbar';

const StyledDivWrapper = styled.div`
    position: relative;
    top: 0;
    height: 100vh;
    
`;
const StyledDivMainPanel = styled.div`
    ${breakpoint('md')`
        width: calc(100% - 260px);
    `};
    overflow: auto;
    position: relative;
    float: left;
    max-height: 100%;
    width: 100%;
    overflow-scrolling: touch;
`;

const AdminLayout = (props) => {
    const { children, ...others } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
    const mainPanel = useRef();
    const handleDrawertoggle = useCallback(() => {
        setMobileOpen(!mobileOpen);
    }, [mobileOpen])

    return (
        <StyledDivWrapper>
            <Sidebar
                handleDrawertoggle={handleDrawertoggle}
                open={mobileOpen}
            />
            {/* <StyledDivMainPanel 
                ref={mainPanel}
            >
                <Navbar
                    handleDrawertoggle={handleDrawertoggle}
                    {...others}
                >

                </Navbar> 
             </StyledDivMainPanel> */}
            {children}
        </StyledDivWrapper>
    )
}

export default AdminLayout;
