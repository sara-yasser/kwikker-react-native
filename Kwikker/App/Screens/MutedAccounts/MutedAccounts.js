import React from 'react';
import { Text, View, Image, ScrollView, RefreshControl, TouchableOpacity, TouchableNativeFeedback } from 'react-native';
import axios from 'axios';
import MutedAccount from '../../Components/MutedAccount/MutedAccount';
import Styles from './Styles';

/** @module MutedAccounts **/

export default class MutedAccounts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usersList: [],
      refreshing: true,
      mutedOrNot: true,
    };
  }


  componentDidMount() {
    this.pullRefresh();
    this.willFocusListener = this.props.navigation.addListener(
      'willFocus',
      () => {
        this.pullRefresh();
      }
    );
  }

  /** pull to refresh functionality.
   * update mute list.
   * @memberof MutedAccounts
  */
  pullRefresh= () => {
    this.setState({ refreshing: false },
      () => {
        this.muted();
      });
  }

  /** content of muted list.
  * check if there is any muted account or not.
  * @memberof MutedAccounts
  */
  isThereMutedAccounts() {
    if (this.state.mutedOrNot) {
      return (
        <ScrollView
          refreshControl={(
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.pullRefresh}
            />
          )}
          style={{ flex: 1 }}
        >
          {this.state.usersList.map((item, index) => (

            <MutedAccount
              key={item.username}
              profileUrl={item.profile_image_url}
              screenName={item.screen_name}
              following={item.following}
              followsYou={item.follows_you}
              userName={item.username}
              navigation={this.props.navigation}
              pullRefresh={this.pullRefresh.bind(this)}
            />
          ))
          }
        </ScrollView>
      );
    }

    return (
      <View style={{ fles: 1, alignContent: 'center', alignItems: 'center', backgroundColor: '#E1E8ED', height: '100%' }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000', marginVertical: 10, paddingTop: '70%' }}>
          You aren't muting anyone
        </Text>
        <Text style={{ color: '#657786' }}>
          When you mute accounts you won't see
        </Text>
        <Text style={{ color: '#657786' }}>
          thier kweeks in your timeline
        </Text>
      </View>
    );
  }

  /** muted accounts.
  * gets list of muted account.
  * @memberof MutedAccounts
  */
  muted() {
    axios.get('interactions/mutes', {

    })
      .then((response) => {
        this.setState({
          usersList: response.data, mutedOrNot: true,
        });
        if (response.data.length === 0) {
          this.setState({
            mutedOrNot: false,
          });
        }
      })
      .catch((error) => {
        this.setState({ mutedOrNot: false });
        // handle error
        // console.log(error);
      })
      .then(() => {
        // always executed
      });
  }

  render() {
    return (

      <View style={{ flex: 1 }}>


        <View style={Styles.header}>
          <View style={Styles.backButtonContainer}>
            <TouchableNativeFeedback onPress={() => this.props.navigation.goBack(null)}>
              <Image
                style={Styles.backButton}
                source={require('./../../Assets/Images/back_button.png')}
              />
            </TouchableNativeFeedback>
          </View>
          <View style={Styles.titleContainer}>
            <Text style={Styles.title}>Muted Accounts</Text>
          </View>
          <View />
          <View style={Styles.dummyElement} />
        </View>

        {this.isThereMutedAccounts()}
      </View>
    );
  }
}
