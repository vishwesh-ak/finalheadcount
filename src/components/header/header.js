import React, { useState } from 'react';
import {
  HeaderContainer,
  Header,
  SkipToContent, 
  HeaderMenuButton,
  HeaderName,
  HeaderGlobalBar,
  HeaderGlobalAction,
  SideNav,
  SideNavItems,
  SideNavLink,
  Theme,  
} from '@carbon/react';
import { Switcher, Fade, Home } from '@carbon/icons-react';
import { Link } from 'react-router-dom';
import { Table } from 'carbon-components-react';
import { UserAvatar } from '@carbon/icons-react';

const CarbonHeader = () => {
  const [isSideNavExpanded, setIsSideNavExpanded] = useState(false);

  const toggleSideNav = () => {
    setIsSideNavExpanded(!isSideNavExpanded);
  };

  return (
    <Theme theme="g100"> 
      <HeaderContainer
        render={({ onClickSideNavExpand }) => (
          <Header aria-label="IBM Platform Name">
            <SkipToContent />
            <HeaderMenuButton
              aria-label={isSideNavExpanded ? 'Close menu' : 'Open menu'}
              onClick={() => {
                onClickSideNavExpand();
                toggleSideNav();
              }}
              isActive={isSideNavExpanded}
              aria-expanded={isSideNavExpanded}
            />
            <HeaderName prefix="IBM">
              Headcount
            </HeaderName>

           
            <SideNav
              aria-label="Side navigation"
              expanded={isSideNavExpanded}
              onOverlayClick={onClickSideNavExpand}
              onSideNavBlur={onClickSideNavExpand}
              isRail
            >
            <SideNavItems>
  <SideNavLink renderIcon={Home} as={Link} to="/home">
    Home
  </SideNavLink>
  <SideNavLink renderIcon={Fade} as={Link} to="/emppage">
    BluePage
  </SideNavLink>
  <SideNavLink renderIcon={Switcher} as={Link} to="/dashboard">
    Dashboard
  </SideNavLink>
  <SideNavLink renderIcon={UserAvatar} as={Link} to="/">
    Logout
  </SideNavLink>
</SideNavItems>

    
            </SideNav>
          </Header>
        )}
      />
    </Theme>
  );
};

export default CarbonHeader;
