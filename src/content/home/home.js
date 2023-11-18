import React from 'react';
import { Content, Header, HeaderName } from 'carbon-components-react';
import { useLocation } from 'react-router-dom';
import {
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Grid,
  Column,
} from '@carbon/react';
const Home = () => {
  const location = useLocation();
  const username = location.state && location.state.username;

  return (
    <>

      <Content>
        <Grid className="home" fullWidth>
          <Column lg={16} md={8} sm={4} className="home__banner">
            <h1 className="home__heading">IBM Headcount </h1>
          </Column>


          <Column lg={16} md={8} sm={4} className="home__r2">
            <Tabs defaultSelectedIndex={0}>
              <TabList className="tabs-group">
              <Tab>Welcome</Tab>
                <Tab>About</Tab>
                <Tab> Key Features</Tab>
                <Tab>Get Started</Tab>
              </TabList>
              
              <TabPanels>
            
          {/* Welcome */}
              <TabPanel>
                <Grid className="tabs-group-content">
                
                  <Column md={4} lg={7} sm={4} className="home__tab-content">
                    <h2 className="home__subheading">       
                      Welcome to Headcount - Your Employee Management Dashboard
          </h2>
                    <p className="home__p">
                    At IBM, we understand the importance of managing your workforce efficiently. Introducing Headcount, your all-in-one solution for tracking employees and gaining valuable insights through interactive dashboards. With Headcount, managing your workforce has never been easier.
                            </p>
                  </Column>
                  <Column md={4} lg={{ span: 8, offset: 7 }} sm={4}>


          </Column>
                </Grid>



              </TabPanel>
              {/* About */}
              <TabPanel>
                <Grid className="tabs-group-content">
                  <Column md={4} lg={7} sm={4} className="home__tab-content">
                    <h2 className="home__subheading">What is Headcount?</h2>
                    <p className="home__p">
                      Headcount management is a fundamental aspect of organizational success. Whether you run a multinational corporation, a small business, or a non-profit, understanding and optimizing your headcount is essential.             
                    </p>
                  </Column>
                  <Column md={4} lg={{ span: 8, offset: 7 }} sm={4}>

                  </Column>
                </Grid>
              </TabPanel>

              {/* Key Features */}

              <TabPanel>
                <Grid className="tabs-group-content">
                  <Column lg={16} md={8} sm={4} className="landing-page__r3">
                    <Grid>
                      <Column md={4} lg={4} sm={4}>
                        <h3 className="landing-page__label"> Key Features</h3>
                      </Column>
                      <Column md={4} lg={4} sm={4}>
                        <h2 className="home__subheading"> Real-time Employee Tracking </h2>
                        <p className="home__p">
                          Keep an up-to-the-minute record of your workforce                      
                        </p>
                      </Column>
                      <Column md={4} lg={4} sm={4}>
                        <h2 className="home__subheading">   Effortless Data Editing </h2>
                        <p className="home__p">
                          Easily update employee details as needed.                    
                        </p>
                      </Column>
                      <Column md={4} lg={4} sm={4}>
                        <h2 className="home__subheading">    Data Visualization </h2>
                        <p className="home__p">
                          Gain insights through engaging charts and graphs.                    
                        </p>
                      </Column>
                    </Grid>
                  </Column>
                </Grid>
              </TabPanel>

              {/*   Get Start */}

              <TabPanel>
                <Grid className="tabs-group-content">
                  <Column md={4} lg={7} sm={4} className="home__tab-content">
                    <h2 className="home__subheading">Join Us in Streamlining Your Workforce Management</h2>
                    <p className="home__p">
                  
                    </p>
                    <p className="home__p">
                      1. Sign Up: Create your Headcount account in minutes.
                    </p>
                    <p className="home__p">
                      2.Import Employee Data: Easily import your existing employee data.
                    </p>
                    <p className="home__p">
                      3.Customize Dashboards: Tailor your dashboards to monitor what matters most.
                    </p>
                  </Column>
                  <Column md={4} lg={{ span: 8, offset: 7 }} sm={4}>
              
                  </Column>
                </Grid>
              </TabPanel>



              </TabPanels>
            </Tabs>
          </Column>
        </Grid>
      </Content>
    </>
  );
}

export default Home;

 