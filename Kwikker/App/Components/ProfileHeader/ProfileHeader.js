import React from 'react';
import { TouchableOpacity, Text, View,ScrollView,Image} from 'react-native';
import styles from './Styles';
export default class App extends React.Component {

  Follower() {
    this.props.navigation.push('FollowersListNavigator');
  }

  Following() {
    this.props.navigation.push('FollowingListNavigator');
  }

  EditProfile() {
    this.props.navigation.push('EditProfileNavigator');
  }

  render() {
    return (
      
      <View style={{flex:1}} >
          <View style={styles.Cover} >
          </View>
        
          <ScrollView style={{flex:1}}>
          <View style={{flex:1,flexDirection:'row'}}>
            <View style={styles.ProfileImageContainer}>
              <Image style={styles.ProfileImage}
                source={{
                  uri: 'https://www.sparklabs.com/forum/styles/comboot/theme/images/default_avatar.jpg'
                  }}/>
            </View>
            <TouchableOpacity style={styles.EditProfile} 
            onPress={this.EditProfile.bind(this)}>
            <Text>
            Edit Profile
            </Text>
            </TouchableOpacity>
          </View>

              <View style={{marginLeft :10,marginTop:4}}>
                <Text style={{ fontWeight :"bold", fontSize: 20, }}>
                  NAME
                </Text>
                <Text style={styles.Gray}>
                USERNAME
                </Text>
                <Text >
                ABOUT
                </Text>
                <View style={{flex:1,flexDirection:'row'}}> 
                  <Text style={styles.Gray}>Joined </Text>
                  <Text style={styles.Gray}>date</Text>
                </View>
               
                <View style={{flex:1,flexDirection:'row'}}>
                <Text>0</Text>
                <TouchableOpacity onPress={this.Following.bind(this)}>
                  <Text style={styles.Gray}> Following   </Text>
                  </TouchableOpacity>
                  <Text>0</Text>
                  <TouchableOpacity onPress={this.Follower.bind(this)}>
                  <Text style={styles.Gray}> Followers   </Text>
                  </TouchableOpacity>
                </View>
              </View>
              
          
          
          </ScrollView>
        
      </View>
    );
  }
}