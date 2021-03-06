import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import styles from './Styles';

/** @module BlockedAccount **/

export default class BlockedAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
    };
  }

  /**
   * unblock user
   * @memberof BlockedAccount
   */
  unblock() {
    axios.delete('interactions/blocks', {
      params: {
        username: this.props.userName
      }
    }).then((response) => {
      this.props.pullRefresh();
    })
      .catch((error) => {
      });
  }


  render() {
    return (

      <TouchableOpacity
        onPress={() => {
          if (!this.state.clicked) {
            this.setState({ clicked: true }, () => {
              this.props.navigation.push('Profile', {
                username: this.props.userName,
              });
            });
          }
        }}
        style={styles.container}
      >
        <View style={styles.profilePicture}>
          <Image style={styles.ProfileImage} source={{ uri: this.props.profileUrl }} />
        </View>
        <View style={styles.textContainer}>
          <Text style={{ fontWeight: 'bold' }}>{this.props.screenName}</Text>
          <Text style={{ color: '#AAB8C2' }}>{this.props.userName}</Text>

        </View>
        <TouchableOpacity
          style={styles.following}
          onPress={() => {
            this.unblock();
          }}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>
            Unblock
          </Text>

        </TouchableOpacity>
      </TouchableOpacity>
    );
  }
}
