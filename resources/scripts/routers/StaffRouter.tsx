import React from 'react';
import { NavLink, Route, RouteComponentProps, Switch } from 'react-router-dom';
import NavigationBar from '@/components/NavigationBar';
import NotFound from '@/components/elements/ScreenBlock';
import TransitionRouter from '@/TransitionRouter';
import SubNavigation from '@/components/elements/SubNavigation';
import StaffRequetsContainer from '@/components/dashboard/staff/StaffRequetsContainer';

export default ({ location }: RouteComponentProps) => (
    <>
        <NavigationBar/>
        {location.pathname.startsWith('/staff') &&
        <SubNavigation>
            <div>
                <NavLink to={'/staff'} exact>Request</NavLink>
            </div>
        </SubNavigation>
        }
        <TransitionRouter>
            <Switch location={location}>
                <Route path={'/staff'} component={StaffRequetsContainer} exact/>
                <Route path={'*'} component={NotFound}/>
            </Switch>
        </TransitionRouter>
    </>
);
