import React, { Component } from 'react'

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';


import AppStyles from './src/styles/AppStyles'

import Home from './src/screens/Home'
import ListScreen from './src/screens/ListScreen'
import ListOverview from './src/screens/ListOverview'
import Settings from './src/screens/Settings'
import Study from './src/screens/Study'
import StudyConfig from './src/screens/StudyConfig'


const getTabIcon = (iconName, color=AppStyles.color.primaryLightUI) => {
  return (
    <Icon name={iconName} size={AppStyles.UI.tabIconSize} color={color} />
  )
}


const defaultStackNavigationOptions = {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: AppStyles.color.primary,
      borderBottomWidth: 0,
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 30,
      color: AppStyles.color.textLight,
    },
  },
  headerLayoutPreset: 'center'
};


const StudyStack = createStackNavigator(
  {
    Home: Home,
    StudyConfig: StudyConfig,
    Study: Study,
  },
  {
    initialRouteName: 'Home',
    ...defaultStackNavigationOptions
  }
);

const ListStack = createStackNavigator(
  {
    ListOverview: {
      screen: ListOverview,
      navigationOptions: ({ navigation }) => ({
        headerStyle: {
          backgroundColor: navigation.getParam('backgroundColor') || AppStyles.color.alternateMid
        }
      })
    },
    List: {
      screen: ListScreen,
      navigationOptions: ({ navigation }) => ({
        headerStyle: {
          backgroundColor: navigation.getParam('backgroundColor') || AppStyles.color.alternateMid
        }
      })
    }
  },
  {
    initialRouteName: 'ListOverview',
    ...defaultStackNavigationOptions
  }
)

const SettingsStack = createStackNavigator(
  {
    Settings: Settings,
  },
  {
    initialRouteName: 'Settings',
    ...defaultStackNavigationOptions
  }
)


const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: StudyStack,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({tintColor}) => getTabIcon('home', tintColor),
      },
    },
    Lists: {
      screen: ListStack,
      navigationOptions: {
        tabBarLabel: 'Lists',
        tabBarIcon: ({tintColor}) => getTabIcon('list-ul', tintColor),
      },
    },
    Settings: {
      screen: SettingsStack,
      navigationOptions: {
        tabBarLabel: 'Settings',
        tabBarIcon: ({tintColor}) => getTabIcon('cog', tintColor),
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: AppStyles.color.primaryLightUI,
      activeBackgroundColor: AppStyles.color.activeTab,
      inactiveTintColor: 'gray',
      labelStyle: {
        fontSize: AppStyles.fontSize.tabLabel,
      },
      style: {

      },
      tabStyle: {
        paddingVertical: 3,
      }
    },
  }
);

const AppContainer = createAppContainer(TabNavigator);

class Navigator extends Component {
  render() {
    return (
      <AppContainer />
    )
  }
}

export default Navigator;
