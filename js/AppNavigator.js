'use strict';

import React, { Component } from 'react';
import { BackAndroid, Platform, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash/core';

import { closeDrawer } from './actions/drawer';
import { popRoute } from './actions/route';

import { Drawer } from 'native-base';
import Navigator from 'Navigator';
import Appointments from './components/appointments/';

import Settings from './components/settings/';
// import FavoriteDoctors from './components/favoriteDoctors/';
import PreviousAppointments from './components/previousAppointments/';
import Login from './components/login/';
import ForgotPassword from './components/forgotPassword/';
import News from './components/news/';
import Messages from './components/messages/';
import Groups from './components/groups/';
import Overview from './components/overview/';
import Logout from './components/logout/';
import SplashPage from './components/splashscreen/';
import Home from './components/home/';
import SignUp from './components/sign-up/';
import Contact from './components/contact/';
import Calendar from './components/calendar/';
import Form from './components/form/';
import Modal from './components/modal/';
import SideBar from './components/sideBar';
import { statusBarColor } from './themes/base-theme';

Navigator.prototype.replaceWithAnimation = function (route) {
    const activeLength = this.state.presentedIndex + 1;
    const activeStack = this.state.routeStack.slice(0, activeLength);
    const activeAnimationConfigStack = this.state.sceneConfigStack.slice(0, activeLength);
    const nextStack = activeStack.concat([route]);
    const destIndex = nextStack.length - 1;
    const nextSceneConfig = this.props.configureScene(route, nextStack);
    const nextAnimationConfigStack = activeAnimationConfigStack.concat([nextSceneConfig]);

    const replacedStack = activeStack.slice(0, activeLength - 1).concat([route]);
    this._emitWillFocus(nextStack[destIndex]);
    this.setState({
        routeStack: nextStack,
        sceneConfigStack: nextAnimationConfigStack,
    }, () => {
        this._enableScene(destIndex);
        this._transitionTo(destIndex, nextSceneConfig.defaultTransitionVelocity, null, () => {
            this.immediatelyResetRouteStack(replacedStack);
        });
    });
};

export var globalNav = {};

const searchResultRegexp = /^search\/(.*)$/;

const reducerCreate = params=>{
    const defaultReducer = Reducer(params);
    return (state, action)=>{
        var currentState = state;

        if(currentState){
            while (currentState.children){
                currentState = currentState.children[currentState.index]
            }
        }
        return defaultReducer(state, action);
    }
};

const drawerStyle  = { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3};

class AppNavigator extends Component {

    constructor(props){
        super(props);
    }

    componentDidMount() {
        globalNav.navigator = this._navigator;

        this.props.store.subscribe(() => {
            if(this.props.store.getState().drawer.drawerState == 'opened')
                this.openDrawer();

            if(this.props.store.getState().drawer.drawerState == 'closed')
                this._drawer.close();
        });

        BackAndroid.addEventListener('hardwareBackPress', () => {
            var routes = this._navigator.getCurrentRoutes();

            if(routes[routes.length - 1].id == 'home' || routes[routes.length - 1].id == 'login') {
                return false;
            }
            else {
                this.popRoute();
                return true;
            }
        });
    }

    popRoute() {
        this.props.popRoute();
    }

    openDrawer() {
        this._drawer.open();
    }

    closeDrawer() {
        if(this.props.store.getState().drawer.drawerState == 'opened') {
            this._drawer.close();
            this.props.closeDrawer();
        }
    }

    render() {
        return (
            <Drawer
                ref={(ref) => this._drawer = ref}
                type='overlay'
                content={<SideBar navigator={this._navigator} />}
                tapToClose={true}
                acceptPan={false}
                onClose={() => this.closeDrawer()}
                openDrawerOffset={0.2}
                panCloseMask={0.2}
                negotiatePan={true}>
                <StatusBar
                    backgroundColor={statusBarColor}
                    barStyle='light-content'
                />
                <Navigator
                    ref={(ref) => this._navigator = ref}
                    configureScene={(route) => {
                        return {
                            ...Navigator.SceneConfigs.FloatFromRight,
                            gestures: {}
                        };
                    }}
                    initialRoute={{id: (Platform.OS === 'android') ? 'splashscreen' : 'login', statusBarHidden: true}}
                    renderScene={this.renderScene}
                  />
            </Drawer>
        );
    }

    renderScene(route, navigator) {
        switch (route.id) {
            case 'splashscreen':
                return <SplashPage navigator={navigator} />;
            case 'login':
                return <Login navigator={navigator} />;
            case 'home':
                return <Home navigator={navigator} />;
            case 'signUp':
                return <SignUp navigator={navigator} />;
            case 'mail':
                return <Mail navigator={navigator} />;
            case 'lists':
                return <Lists navigator={navigator} />;
            case 'icons':
                return <Icons navigator={navigator} />;
            case 'contact':
                return <Contact navigator={navigator} />;
            case 'calendar':
                return <Calendar navigator={navigator} />;
            case 'form':
                return <Form navigator={navigator} />;
            case 'modal':
                return <Modal navigator={navigator} />;
            case 'appointments':
                return <Appointments navigator={navigator} />;
            case 'previousAppointments':
                return <PreviousAppointments navigator={navigator} />;                
            case 'settings':
                return <Settings navigator={navigator} />;                 
            case 'favoriteDoctors':
                return <FavoriteDoctors navigator={navigator} />;
            case 'logout':
                return <Logout navigator={navigator} />;   
            case 'news':
                  return <News navigator={navigator} />;   
            case 'overview':
                return <Overview navigator={navigator} />;  
            case 'groups':
                return <Groups navigator={navigator} />;  
            case 'messages':
                return <Messages navigator={navigator} />;     
            case 'forgotPassword':
                return <ForgotPassword navigator={navigator} />;                                                       
            default :
                return <Login navigator={navigator} />;
        }
    }
}

function bindAction(dispatch) {
    return {
        closeDrawer: () => dispatch(closeDrawer()),
        popRoute: () => dispatch(popRoute())
    }
}

const mapStateToProps = (state) => {
    return {
        drawerState: state.drawer.drawerState
    }
}

export default connect(mapStateToProps, bindAction) (AppNavigator);