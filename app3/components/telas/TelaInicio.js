import React, { Component } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';
import { thisExpression, identifier } from '@babel/types';
import SQlite from 'react-native-sqlite-storage';


const db = SQlite.openDatabase({ name: 'tarefas.db' });
export default class TelaInicio extends Component {

    state = {
        nome: '',
        listaTarefas: [],
    }

    async componentDidMount() {
        await this.getNome();
        await this.criarTabela();
        await this.exibirTarefas();
        await this.pegarId();
        await this.atualizar();
    }

    async getNome() {
        const valor = await AsyncStorage.getItem('nome');

        if (valor !== null) {
            await this.setState({ nome: valor });
        } else {
            await this.setState({ nome: 'Usuario' });
        }

    }

    async criarTabela() {
        await db.transaction((tx) => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS tarefas ' + '(id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, ' +
                'tarefa VARCHAR(1000) NOT NULL);'
            );
        });
    }

    async exibirTarefas() {
        await db.transaction((tx) => {
            tx.executeSql('SELECT * FROM tarefas ', [],
                (tx, results) => {
                    const lista = [];
                    for (i = 0; i < results.rows.length; i++) {
                        lista.push(results.rows.item(i));
                    }
                    this.setState({ listaTarefas: lista });
                    console.log(this.state.listaTarefas);
                });
        });
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>

                <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                    <Text style={{ fontSize: 25, marginLeft: 25 }}>Olá, {this.state.nome}</Text>
                    <View style={{ flexDirection: 'row', flex: 1, marginLeft: 60 }}>
                        <Button title='Novo Nome'
                            onPress={() => Actions.telaNome()}
                        ></Button>
                    </View>
                </View>

                <FlatList style={{ paddingTop: 35 }}
                    data={this.state.listaTarefas}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => {
                        return (
                            <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                                <Text style={{ flex: 8 }}> {item.tarefa} </Text>
                                <View style={{ flexDirection: 'row', flex: 2 }}>
                                    <Button title='D'></Button>
                                    <Button style={[styles.botao]} title='E'
                                        onPress={() => Actions.telaAlterar()}>
                                    </Button>
                                </View>
                            </View>
                        );
                    }}
                    ItemSeparatorComponent={() => {
                        return (
                            <View style={{ backgroundColor: '#ccc', height: 2, width: '100%' }} />
                        );
                    }}
                />

                <View style={[
                    styles.botao
                ]}>
                    <Button style={[styles.botao]} title='Adicionar Tarefa'
                        onPress={() => Actions.telaAdicionar()}>
                    </Button>
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
        marginLeft: 250,
        marginBottom: 20,
        borderRadius: 100
    },
    botaoNome: {
        marginLeft: 250,
    }
})