import React from 'react';
import { Router, Scene } from 'react-native-router-flux';
import TelaInicio from './components/telas/TelaInicio';
import TelaNome from './components/telas/TelaNome';
import TelaAdicionar from './components/telas/TelaAdicionar';
import TelaAlterar from './components/telas/TelaAlterar';

const Routes = () => {
    return(
        <Router>
            <Scene>
                <Scene key='telaInicio' component={TelaInicio} initial hideNavBar></Scene>
                <Scene key='telaNome' component={TelaNome}  hideNavBar></Scene>
                <Scene key='telaAdicionar' component={TelaAdicionar}  hideNavBar></Scene>
                <Scene key='telaAlterar' component={TelaAlterar}  hideNavBar></Scene>
            </Scene>
        </Router>
    );
}

export default Routes;