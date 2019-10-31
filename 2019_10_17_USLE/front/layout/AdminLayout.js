import React, {useState, useCallback, useRef} from 'react';
import PerfectScrollbar from 'perfect-scrollbar';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import Sidebar from '../components/Admin/Sidebar';
import Navbar from '../components/Admin/Navbar';

import AdminRoutes from '../routes/AdminSidebarRoutes';

const StyledDivWrapper = styled.div`
    position: relative;
    top: 0;
    height: 100vh;
    
`;
const StyledDivMainPanel = styled.div`
    ${breakpoint('md')`
        width: calc(100% - 260px);
    `};
    height: 1000px;
    overflow: auto;
    position: relative;
    float: right;
    max-height: 100%;
    width: 100%;
    overflow-scrolling: touch;
    transition-property: top, bottom, width;
    transition-duration: .2s, .2s, .35s;
    transition-timing-function: linear, linear, ease;
`;

const AdminLayout = (props) => {
    const { children, ...others } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
    const [miniActive, setMiniActive] = useState(false);
    const mainPanel = useRef();

    const handleDrawerToggle = useCallback(() => {
        setMobileOpen(!mobileOpen);
    }, [mobileOpen]);

    const sidebarMinimize = useCallback(() => {
        setMiniActive(!miniActive);
    }, [miniActive]);

    const getRoutes = () => {
        return AdminRoutes.map((prop, index) => {
            if(prop.collapse) {
                return 
            }
        })
    }

    return (
        <StyledDivWrapper>
            <Sidebar
                routes={AdminRoutes}
                handleDrawerToggle={handleDrawerToggle}
                open={mobileOpen}
                miniActive={miniActive}
                {...others}
            />
            <StyledDivMainPanel 
                ref={mainPanel}
            >
                <Navbar
                    routes={AdminRoutes}
                    sidebarMinimize={sidebarMinimize}
                    miniActive={miniActive}
                    handleDrawerToggle={handleDrawerToggle}
                    {...others}
                >

                </Navbar> 
             </StyledDivMainPanel>
            {children}
        </StyledDivWrapper>
    )
}

export default AdminLayout;
