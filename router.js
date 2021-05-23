import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Grid from "./components/grid";
import Icon from "react-native-vector-icons/MaterialIcons";

import { Text, View } from "react-native";

import { Container, Header, Left, Right, Body } from "native-base";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home!</Text>
    </View>
  );
};

const Setting = () => {
  return <View></View>;
};

const TabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: "#353535",
        inactiveTintColor: "#cccccc",
        showIcon: true,
        showLabel: false,
        iconStyle: {
          width: 35,
          height: 30,
        },
        style: {
          backgroundColor: "white",
          opacity: 0.9,
        },
        pressColor: "0xf7d9aa",
        indicatorStyle: {
          backgroundColor: "white",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Grid}
        options={{
          tabBarLabel: false,
          tabBarIcon: ({ color }) => (
            <Icon name="public" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Feed"
        component={HomeScreen}
        options={{
          tabBarLabel: false,
          tabBarIcon: ({ color }) => (
            <Icon name="article" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={HomeScreen}
        options={{
          tabBarLabel: false,
          tabBarIcon: ({ color }) => (
            <Icon name="notifications" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{
          tabBarLabel: false,
          tabBarIcon: ({ color }) => (
            <Icon name="person" size={30} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const headerScreenOptions = (props) => {
  return {
    header: () => {
      return (
        <Container>
          <Header
            style={{
              backgroundColor: "transparent",
              borderWidth: 0,
              shadowOffset: { height: 0, width: 0 },
              shadowOpacity: 0,
              elevation: 0,
            }}
          >
            <Left>
              <Icon name="menu" size={30} color={"#353535"} />
            </Left>
            <Body></Body>
            <Right>
              <Icon name="search" size={30} color={"#353535"} />
            </Right>
          </Header>
        </Container>
      );
    },
  };
};

const StackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={headerScreenOptions}>
      <Stack.Screen name="Landing" component={TabNavigation} />
    </Stack.Navigator>
  );
};

export default StackNavigation;
