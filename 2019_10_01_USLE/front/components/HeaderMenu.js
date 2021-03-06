import React from 'react';
import Link from 'next/link';
import { Menu, Input } from 'antd';
import styled from 'styled-components';
 
const Wrapper = styled.div`
    
`;

const HeaderMenu = () => {
    return(
        <div>
           <Wrapper mode="horizontal">
                <Menu.Item key="home"><Link href="/index"><a>노드버드</a></Link></Menu.Item>
                <Menu.Item key="profile"><Link href="/profile"><a>프로필</a></Link></Menu.Item>
                <Menu.Item key="mail">
                    <Input.Search enterButton style={{ verticalAlign: 'middle' }}/>
                </Menu.Item> 
            </Wrapper>
        </div> 
    )
}

export default HeaderMenu;