import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image, TextInput, RefreshControl } from 'react-native';
import axios from 'axios';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import PeopleSearch from '../../Components/PeopleSearch/PeopleSearch';

export default class Search extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return params;
  };


  constructor(props) {
    super(props);
    this.state = {
      search: '',
      usersList: [],
      refreshing: true

    };
  }

  componentDidMount() {
    this.props.navigation.setParams({
      headerTitle: (
        <View style={{ width: '70%', marginTop: 8 }}>
          <TextInput
            onChangeText={(value) => { this.setState({ search: value }); this.searchList(); }}
            placeholder=" Search for People "
            clearButtonMode="always"
          />
        </View>
      ),
      headerRight: (
        <Text style={{ margin: 5, color: 'black', fontWeight: 'bold' }}> New message </Text>
      ),
      headerLeft: (
        <EvilIcons name="search" size={35} color="rgb(136, 153, 166)" style={{ margin: 5 }} />
      ),
    });
    this.updateList();
  }

/** Get more Lists when we get to the end of the scrollView.
 * Check we reached end of content
 * @param {int} layoutMeasurement - size of the layout .
 * @param  {int} contentOffset - position on screen
 * @param  {int} contentSize - size of all content
 */
moreLists=({ layoutMeasurement, contentOffset, contentSize }) => {
  if (layoutMeasurement.height + contentOffset.y >= contentSize.height - 1 && this.state.refreshing !== true) {
    if (this.state.search.length > 0) this.updateList(this.state.usersList[this.state.usersList.length - 1].username);
    else this.searchList(this.state.usersList[this.state.usersList.length - 1].username);
  }
}


/** Update List.
 * gets first 20 users With default parameter (id=null)
 * To retrieve more send the id of the last retrieved user.
 * @param {int} username - The username of user .
 */
updateList(username = null) {
  axios.get('direct_message/recent_conversationers', {
    params: {
      last_conversationers_retrieved_username: username,
    }
  })
    .then((response) => {
      this.setState({ refreshing: true });
      if (username === null) {
        this.setState({
          usersList: response.data
        });
      } else {
        this.setState((prevState) => ({ usersList: prevState.usersList.concat(response.data)
        }));
      }
      this.setState({ refreshing: false });
    })
    .catch((error) => {
      // handle error
      // console.log(error);
    })
    .then(() => {
      // always executed
    });
}

/** Search List.
 * gets first 20 users With default parameter (id=null)
 * To retrieve more send the id of the last retrieved user.
 * @param {int} username - The username of user .
 */
searchList(username = null) {
  axios.post('direct_message/recent_conversationers',
    {
      search_user: this.state.search
    },
    {
      params: {
        last_conversationers_retrieved_username: username,
      }
    })
    .then((response) => {
      this.setState({ refreshing: true });
      if (username === null) {
        this.setState({
          usersList: response.data
        });
      } else {
        this.setState((prevState) => ({ usersList: prevState.usersList.concat(response.data)
        }));
      }
      this.setState({ refreshing: false });
    })
    .catch((error) => {
      // handle error
      // console.log(error);
    })
    .then(() => {
      if (this.state.search.length === 0) this.updateList();
    });
}


render() {
  return (
    <ScrollView
      refreshControl={(
        <RefreshControl
          enabled={false}
          refreshing={this.state.refreshing}
        />
)} onScroll={({ nativeEvent }) => { this.moreLists(nativeEvent); }} style={{ flex: 1 }}
    >
      {this.state.usersList.map((item, index) => (
        <TouchableOpacity
          key={item.id}
          onPress={() => {
            this.props.navigation.navigate('ConversationScreen', {
              title: item.screen_name,
              profileUrl: item.profile_image_url,
              userName: item.username,
            });
          }}
        >
          <PeopleSearch
            profileUrl={item.profile_image_url}
            userName={item.username}
            screenName={item.screen_name}
            following={item.following}
            followsYou={item.follows_you}
            blocked={item.blocked}
            muted={item.muted}
          />
        </TouchableOpacity>
      ))
        }

    </ScrollView>
  );
}
}
