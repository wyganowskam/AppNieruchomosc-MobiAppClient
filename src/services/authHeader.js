import deviceStorage from "./deviceStorage";

export default function authHeader() {
    deviceStorage.getItem('userToken')
        .then((userTokenVal)=>{
    deviceStorage.getItem('hoaId')
        .then((hoaIdVal)=>{
            const userToken = JSON.parse(userTokenVal);
            const currentHoa = hoaIdVal;
            if (userToken) {
                return { Authorization: 'Bearer ' + userToken, hoaId: currentHoa};
              } else {
                return {};
              }


        });
        });

  }