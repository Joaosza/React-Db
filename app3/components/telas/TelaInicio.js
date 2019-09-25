import React, { Component } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { Actions } from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';
import { thisExpression } from '@babel/types';
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
                <Text style={{ fontSize: 25 }}>Olá, {this.state.nome}</Text>
                <Button title='Adicionar Nome'
                    onPress={() => Actions.telaNome()}
                ></Button>

                <FlatList
                    data={this.state.listaTarefas}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => {
                        return (
                            <View>
                                <Text>{item.tarefa}</Text>
                                <Button title='E' />
                                <Button title='D' />
                            </View>
                        );
                    }}
                    ItemSeparatorComponent={() => {
                        return (
                            <View style={{ backgroundColor: '#ccc', height: 2, width: '100%' }} />
                        );
                    }}
                />
                <Button title='Adicionar Tarefa'
                    onPress={() => Actions.telaAdicionar()}
                />

            </View>
        );
    }
}