import React, { Component } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { Actions } from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';


export default class TelaNome extends Component {

    state={
        nome: ''
    }

    async salvarNome(){
        await AsyncStorage.setItem('nome', this.state.nome);
        await Actions.telaInicio();
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <Text style={{ fontSize: 25}}>Informe seu nome</Text>
                <TextInput style={{ fontSize:20, borderWidth: 1, borderColor: '#000' }}
                    onChangeText={(texto) => this.setState({nome: texto})}
                />
                <Button title='Ir tela Adicionar'
                    onPress={() => this.salvarNome()}
                ></Button>
            </View>
        );
    }
}