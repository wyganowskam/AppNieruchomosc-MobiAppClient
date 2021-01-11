import {apiClient} from "../api/ApiClient";
import deviceStorage from "./deviceStorage";
import authHeader from "./authHeader";

const path = 'hoa/';


export const getHoasRoles = () => {
  return apiClient.get(path)
  .then((response) => {
    if ( response.data) {
        deviceStorage.setItem("hoas", JSON.stringify(response.data));
        deviceStorage.getItem("hoaId")
          .then((resHoaId) => {
            var hoaId=resHoaId; 
            if(response.data.length > 0 && (!hoaId || !response.data.find(e => e.hoaId === hoaId))){
              deviceStorage.setItem("hoaId", response.data[0].hoaId);
                    }
            refreshRoles();
           

          });
        
      
    }
   
    return response.data;
  });
};

export const refreshRoles = async () => {
        deviceStorage.getItem("hoaId")
          .then((resHoaId) => {
            var hoaId = resHoaId;
            console.log(resHoaId);
            deviceStorage.getItem("hoas")
              .then((resHoas)=>{
              var hoas=JSON.parse(resHoas);
              if(hoaId) {
                const roles= hoas.find(e => e.hoaId === hoaId)?.roles.map(x=>x.name);
                if(roles){
                   deviceStorage.setItem("isAppAdmin", roles.includes("AppAdmin"));
                   deviceStorage.setItem("isBuildingAdmin", roles.includes("Administrator"));
                   deviceStorage.setItem("isBoard" , roles.includes("BoardMember"));
                   deviceStorage.setItem("isResident", roles.includes("HomeOwner"));
                  authHeader();
                }
               
                };
              });
          });
  };



export const createHoa = (data) => {
  return api.post(path, data);
};

