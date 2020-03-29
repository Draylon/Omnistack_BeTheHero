import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Cases from "./pages/Cases";
import Detail from "./pages/Detail";

const AppStack = createStackNavigator();

export default function Routes(){
    return (
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{headerShown: false}}>
                <AppStack.Screen name="Cases" component={Cases}/>
                <AppStack.Screen name="Detail" component={Detail}/>
            </AppStack.Navigator>
        </NavigationContainer>
    );
}