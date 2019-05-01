import React from 'react';
import { Text, View, TouchableOpacity, Image, TouchableNativeFeedback } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import Styles from './Styles';


export default class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentUsername: '', Email: '' };
  }


  componentDidMount() {
    AsyncStorage.getItem('@app:id').then((id) => {
      this.setState({ currentUsername: id });
    });
  }

  /**
   * Redirects the user to the update Username form
   */
  Username() {
    this.props.navigation.push('Username');
  }

  /**
   * Redirects the user to the update Email form
   */
  Email() {
    this.props.navigation.push('Email');
  }

  /**
   * Redirects the user to the update Password form
   */
  Password() {
    this.props.navigation.push('Password');
  }


  getEmail() {
    axios.get('user/email')
      .then((res) => {
        this.setState({
          Email: res.data,
        });
      })
      .catch((error) => {
        this.setState({
          Email: 'error loading email',
        });
      })
      .then(() => {
      });
  }

  render() {
    return (

      <View style={Styles.container}>
        <View>

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
              <Text style={Styles.title}>Account</Text>
              <Text style={Styles.username}>@{this.state.currentUsername}</Text>
            </View>
            <View />
            <View style={Styles.dummyElement} />
          </View>

          <View style={Styles.TitleContainer}>
            <Text style={Styles.Title}>
              Login and security
            </Text>
          </View>


          <View style={Styles.box}>
            <TouchableOpacity onPress={this.Username.bind(this)}>
              <Text style={Styles.blackFont}> Username </Text>
              <Text style={Styles.grayFont}> @{this.state.currentUsername} </Text>
            </TouchableOpacity>
          </View>
          <View style={Styles.box}>
            <TouchableOpacity onPress={this.Email.bind(this)}>
              <Text style={Styles.blackFont}> Email </Text>
              <Text style={Styles.grayFont}> {this.state.Email} </Text>
            </TouchableOpacity>
          </View>
          <View style={Styles.box}>
            <TouchableOpacity onPress={this.Password.bind(this)}>
              <Text style={Styles.blackFont}> Password </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
