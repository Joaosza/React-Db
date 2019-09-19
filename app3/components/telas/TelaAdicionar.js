import React, { Component } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { Actions } from 'react-native-router-flux';
import SQlite from 'react-native-sqlite-storage';

const db = SQlite.openDatabase({ name: 'tarefas.db' });
export default class TelaAdicionar extends Component {
    state = {
        tarefa: ''
    }
    
    async salvarTarefa() {
        const afazeres = this.state.tarefa
        await db.transaction((tx) => {
            tx.executeSql('INSERT INTO tarefas (tarefa) VALUES (?) ',
                [afazeres]
            );
        });
        await this.setState({ tarefa: '' })
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <Text style={{ fontSize: 20 }}>Adcionar Tarefa</Text>
                <TextInput style={{ fontSize: 15 }}
                    onChangeText={(texto) => this.setState({ tarefa: texto })}
                    value={this.state.tarefa}
                    multiline
                    numberOfLines={5}
                    textAlignVertical='top'
                />
                <Button title='salvar'
                    onPress={() => this.salvarTarefa()}
                />
                <Button title='Voltar'
                    onPress={() => Actions.telaInicio()}
                ></Button>
            </View>
        );
    }
}