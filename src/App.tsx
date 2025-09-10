import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import TokensListPage from './pages/tokens-list';
import {Provider} from "react-redux";
import store from "./store/store";

setupIonicReact();

const App = () => (
  <IonApp>
    <IonReactRouter>
      <Provider store={store}>
        <IonRouterOutlet>
          <Route exact path="/tokens-list">
            <TokensListPage/>
          </Route>
          <Route exact path="/">
            <Redirect to="/tokens-list"/>
          </Route>
        </IonRouterOutlet>
      </Provider>
    </IonReactRouter>
  </IonApp>
);

export default App;
