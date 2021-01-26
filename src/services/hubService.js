const baseURL='https://appnieruchomoscapi.azurewebsites.net/api/'
import { HubConnectionBuilder } from '@microsoft/signalr';

const getConnection = (token) => new HubConnectionBuilder()
            .withUrl(baseURL + 'chathub?Authorization=' + token)
            .withAutomaticReconnect()
            .build();

const MethodName = 'receiveMessage'

export default{
    getConnection,
    MethodName
}