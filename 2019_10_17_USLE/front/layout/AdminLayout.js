import React, {useState, useCallback, useRef} from 'react';
import PropTypes from 'prop-types';
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
    :after {
        display: table;
        clear: both;
        content: "";
    }
    
`;
const StyledDivMainPanel = styled.div`
    ${breakpoint('md')`
        width : ${props => props.miniActive ? `calc(100% - 80px)` : `calc(100% - 230px)`}
        
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

const StyledDivContent = styled.div`
    margin-top: 70px;
    padding: 30px 15px;
    min-height: calc(100vh - 123px);
`;
const StyledDivContainer = styled.div`
    ${props => props.theme.conatinerFluid}
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
                miniActive={miniActive ? true : false} 
                ref={mainPanel}
            >
                <Navbar
                    routes={AdminRoutes}
                    sidebarMinimize={sidebarMinimize}
                    miniActive={miniActive}
                    handleDrawerToggle={handleDrawerToggle}
                    {...others}
                />
                <StyledDivContent>
                    <StyledDivContainer>
                        {children}
                    </StyledDivContainer>     
                </StyledDivContent>
             </StyledDivMainPanel>
            
        </StyledDivWrapper>
    )
}

AdminLayout.proptype = {
    children: PropTypes.node,
}

export default AdminLayout;
