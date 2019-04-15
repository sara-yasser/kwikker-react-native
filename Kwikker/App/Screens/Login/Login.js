import React, { Component } from 'react';
import { Text, View, Button, Image, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import styles from './Styles';
import CustomTextInput from '../../Components/CustomTextInput/CustomTextInput';
import CustomButton from '../../Components/CustomButton/CustomButton';
import Loader from '../../Components/Loader/Loader';

/** @module Login **/

export default class Login extends Component {
  state = { username: '', password: '', loading: false, message: '' };

  /**
   * Shows a toast message "Authentication Failed" and turns off the loading screen
   * @memberof Login
   */
  onLoginFail() {
    this.setState({ message: 'Authentication Failed', loading: false });
    ToastAndroid.show(this.state.message, ToastAndroid.SHORT);
  }

  /**
   * Specifies header config defaults that will be applied to every request and redirects the user to the Home screen
   * @memberof Login
   */
  onLoginSuccess() {
    AsyncStorage.getItem('@app:session').then((token) => {
      axios.defaults.headers.common['TOKEN'] = token;
    });
    this.props.navigation.navigate('DrawerNavigator');
  }

  /**
  * Redirects the user to the signing up form
   * @memberof Login
  */
  signUp() {
    this.props.navigation.push('Signup');
  }

  /**
  * Processes the user's credentials and either calls {@link #onloginsuccess|onLoginSuccess} or calls {@link #onloginfail|onLoginFail}
   * @memberof Login
  */
  logInButtonPress() {
    this.setState({
      loading: true,
      message: ''
    });
    axios.post('account/login', {
      username: this.state.username,
      password: this.state.password
    })
      .then((res) => {
        AsyncStorage.multiSet([['@app:session', res.data.token], ['@app:id', this.state.username]]);
        return this.onLoginSuccess();
      })
      .catch((err) => {
        return this.onLoginFail();
      });
  // this.onLoginSuccess(); // THIS SHOULD BE REMOVED AND THE ABOVE CODE SECTION GETS UNCOMMENTED
  }

  /**
  * Redirects the user to the 'forgot password' form
   * @memberof Login
  */
  forgotPassword() {
    this.props.navigation.push('ForgotPassword');
  }

  render() {
    const { parentView, header, dummyElement, imageContainer, headerImage, signUpButton, logInText, logInButtonStyle, loginButtonContainer, loginButtonBorder, forgotPasswordStyle } = styles;
    const buttonDisabled = (this.state.username === '') || (this.state.password === '');
    return (
      <View style={parentView}>
        <Loader loading={this.state.loading} loadingMessage="Logging In" />
        <View style={header}>
          <View style={dummyElement} />
          <View style={imageContainer}>
            <Image
              style={headerImage}
              source={require('./../../Assets/Images/Twitter_Logo_Blue.png')}
            />
          </View>
          <Text style={signUpButton} onPress={this.signUp.bind(this)}>Sign up</Text>
        </View>

        <Text style={logInText}>Log in to Twitter.</Text>

        <View>
          <CustomTextInput
            placeholder=""
            label="Username"
            secureTextEntry={false}
            value={this.state.username}
            onChangeText={(username) => this.setState({ username })}
            autoFocus={false}
            autoCapitalize="none"
          />
          <CustomTextInput
            placeholder=""
            label="Password"
            secureTextEntry
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}
            autoFocus={false}
          />
        </View>
        <Text style={forgotPasswordStyle} onPress={this.forgotPassword.bind(this)}>Forgot password?</Text>
        <View style={loginButtonContainer}>
          <View style={loginButtonBorder}>
            <View style={logInButtonStyle}>
              <CustomButton onPress={this.logInButtonPress.bind(this)} marginSize={15} customFontSize={17} disabled={buttonDisabled}>Log in</CustomButton>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
