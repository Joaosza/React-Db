import React, { Component } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';


export default class TelaNome extends Component {

    state = {
        nome: ''
    }

    async salvarNome() {
        await AsyncStorage.setItem('nome', this.state.nome);
        await Actions.telaInicio();
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <Text style={{ fontSize: 25, marginTop: 5, marginLeft: 110 }}>Informe seu nome</Text>
                <TextInput style={{ fontSize: 20, borderWidth: 1, borderColor: 'black', marginTop: 25, marginLeft: 15, marginRight: 15, marginBottom: 25 }}
                    onChangeText={(texto) => this.setState({ nome: texto })}
                />
                <View style={[
                    styles.botao
                ]}>
                    <Button title='Salvar'
                        onPress={() => this.salvarNome()}
                    ></Button>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({

    editar: {

    },

    deletar: {

    },

    botao: {
        width: 140,
        height: 120,
        marginLeft: '35%',
        marginBottom: 20,
        borderRadius: 100
    }
})