import deviceStorage from "./deviceStorage";

export default function authHeader() {
    deviceStorage.getItem('id_token')
        .then((userTokenVal)=>{
    deviceStorage.getItem('hoaId')
        .then((hoaIdVal)=>{
            // console.log("usertokenval:");
            // console.log(userTokenVal);
            const userToken = userTokenVal;
            const currentHoa = hoaIdVal;
            if (userToken) {
                return { Authorization: 'Bearer ' + userToken, hoaId: currentHoa};
              } else {
                return {};
              }


        });
        });

  }