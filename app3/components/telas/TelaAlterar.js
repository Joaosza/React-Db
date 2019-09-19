import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';


export default class TelaAlterar extends Component {
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'gray' }}>
                <Text>Tela Alterar</Text>
                <Button title='Ir tela Inicio'
                    onPress={() => Actions.telaInicio()}
                ></Button>
            </View>
        );
    }
}