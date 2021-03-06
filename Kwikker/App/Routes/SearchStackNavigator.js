import React, { Component } from 'react';
import { createStackNavigator, CreateAppContainer } from 'react-navigation';
import Search from '../Screens/Search/Search';
import SearchBar from '../Screens/SearchBar/SearchBar';
import KweekExtendedView from '../Screens/KweekExtendedView/KweekExtendedView';
import CreateTweet from '../Screens/CreateTweet/CreateTweet';
import ProfileStackNavigator from './ProfileStackNavigator';
import FollowerList from '../Screens/FollowerList/FollowersList';
import FollowingList from '../Screens/FollowingList/FollowingList';


const SearchStackNavigator = createStackNavigator({
  Search: { screen: Search,
    navigationOptions: {
      headerStyle: {
        backgroundColor: 'transparent'
      },
      headerTitleStyle: {
        fontWeight: 'bold',
        color: '#fff',
        zIndex: 1,
        fontSize: 18,
        lineHeight: 23,
        fontFamily: 'CircularStd-Bold'
      },
      headerTintColor: '#fff'
    }
  },
  SearchBar: { screen: SearchBar,
    navigationOptions: {
      headerStyle: {
        backgroundColor: 'transparent'
      },
    }
  },
  Profile: { screen: ProfileStackNavigator,
    navigationOptions: {
      header: null,
    }, },
  FollowerList: { screen: FollowerList,
    navigationOptions: {
      header: null,
    }, },
  FollowingList: { screen: FollowingList,
    navigationOptions: {
      header: null,
    }, },
  KweekExtendedView: {
    screen: KweekExtendedView,
    navigationOptions: {
      title: 'Kweek',
    }
  },
  CreateTweet: { screen: CreateTweet },
});
SearchStackNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};
export default SearchStackNavigator;