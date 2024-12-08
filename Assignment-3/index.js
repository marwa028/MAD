import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Image,
  FlatList,
  ImageBackground,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';


const profileData = {
  name: "Marwa",
  avatar: 'https://i.imgur.com/56WrMzH.jpeg',
  productSells: "14.850",
  earnings: "50bil+",
};

const ordersData = [
  {
    id: '1',
    title: 'Beef Burger, Ice Cream, Berries',
    date: '21 Thu 10.00',
    price: '$38.15',
    images: [
      'https://i.imgur.com/NtwIus3.png',
      'https://i.imgur.com/7p0d7ZP.png',
      'https://i.imgur.com/dJOohu2.png',
    ],
  },
  {
    id: '2',
    title: 'Beef Burger, Pepperoni Moo, Cheese Bust',
    date: '15 Fri 18.00',
    price: '$38.15',
    images: [
      'https://i.imgur.com/o6cPGYi.png',
      'https://i.imgur.com/9srqTxP.png',
      'https://i.imgur.com/mpnL9Ot.png',
    ],
  },
  {
    id: '3',
    title: 'Beef Burger, Ketchup, French Fries',
    date: '18 Mon 10.00',
    price: '$30.50',
    images: [
      'https://i.imgur.com/o6cPGYi.png',
      'https://i.imgur.com/4CeAMnp.png',
      'https://i.imgur.com/trd0N3k.png',
    ],
  },
];

const Stack = createStackNavigator();

// Common Background Component
const ScreenWrapper = ({ children }) => (
  <ImageBackground
    source={{ uri: 'https://i.imgur.com/qhulaCG.png' }}
    style={styles.background}
  >
    {children}
  </ImageBackground>
);

// Signup Screen
function SignupScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const validateAndNavigate = () => {
    const usernameRegex = /^[A-Za-z]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+92-3\d{2}-\d{7}$/;

    if (password.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters long.');
    } else if (!usernameRegex.test(username)) {
      Alert.alert('Error', 'Username must contain only alphabets.');
    } else if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Invalid email format.');
    } else if (!phoneRegex.test(phone)) {
      Alert.alert('Error', 'Phone number must match +92-3xx-xxxxxxx format.');
    } else {
      navigation.navigate('Login');
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text style={styles.title}>Signup</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={setUsername}
          value={username}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={setPassword}
          value={password}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          onChangeText={setEmail}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone (+92-3xx-xxxxxxx)"
          keyboardType="phone-pad"
          onChangeText={setPhone}
          value={phone}
        />
        <Button title="Signup" onPress={validateAndNavigate} />
      </View>
    </ScreenWrapper>
  );
}

// Login Screen
function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username && password) {
      navigation.navigate('Profile');
    } else {
      Alert.alert('Error', 'Please enter both username and password.');
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={setUsername}
          value={username}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={setPassword}
          value={password}
        />
        <Button title="Login" onPress={handleLogin} />
      </View>
    </ScreenWrapper>
  );
}

// Profile Screen
function ProfileScreen() {
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <View style={styles.profileHeader}>
            <Text style={styles.profileTitle}>My Profile</Text>
          </View>
          <View style={styles.profileCard}>
            <Image source={{ uri: profileData.avatar }} style={styles.avatar} />
            <Text style={styles.name}>{profileData.name}</Text>
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Ionicons name="cube-outline" size={20} color="#f5a623" />
                <Text style={styles.statValue}>{profileData.productSells}</Text>
                <Text style={styles.statLabel}>Product Sells</Text>
              </View>
              <View style={styles.statItem}>
                <Ionicons name="cash-outline" size={20} color="#f5a623" />
                <Text style={styles.statValue}>{profileData.earnings}</Text>
                <Text style={styles.statLabel}>Earnings</Text>
              </View>
            </View>
          </View>
        </View>
        <Text style={styles.ordersTitle}>Recent Orders</Text>
        <FlatList
          data={ordersData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.orderItem}>
              <View style={styles.imageRow}>
                {item.images.map((img, index) => (
                  <Image key={index} source={{ uri: img }} style={styles.orderImage} />
                ))}
              </View>
              <Text style={styles.orderTitle}>{item.title}</Text>
              <Text style={styles.orderDate}>{item.date}</Text>
              <Text style={styles.orderPrice}>{item.price}</Text>
            </View>
          )}
        />
      </View>
    </ScreenWrapper>
  );
}

// App Navigation
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Signup">
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Styles
const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  profileContainer: {
    marginBottom: 20,
  },
  profileHeader: {
    marginBottom: 10,
  },
  profileTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileCard: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  statItem: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    color: '#888',
  },
  ordersTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  orderItem: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  imageRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  orderImage: {
    width: 50,
    height: 50,
    borderRadius: 7,
    marginRight: 3,
  },
  orderTitle: {
    fontSize: 19,
    fontWeight: 'bold',
  },
  orderDate: {
    fontSize: 14,
    color: '#888',
  },
  orderPrice: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});