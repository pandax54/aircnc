// aula 04 27:00 - tipos de navegação
import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import Login from './pages/Login';
import List from './pages/List';
import Book from './pages/Book';


const Routes = createAppContainer(
    createSwitchNavigator({
        Login,
        List,
        Book
    })
);

export default Routes;