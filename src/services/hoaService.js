import {apiClient} from "../api/ApiClient";
import deviceStorage from "./deviceStorage";

const path = 'hoa/';


export const getHoasRoles = () => {
  return apiClient.get(path)
  .then((response) => {
    if (response.data) {
        deviceStorage.setItem("hoas", JSON.stringify(response.data));
        var hoaId =  deviceStorage.getItem("hoaId");
        if(response.data.length > 0 && (!hoaId || !response.data.find(e => e.hoaId === hoaId))){
            deviceStorage.setItem("hoaId", response.data[0].hoaId)
                  }
        refreshRoles();
    }
    return response.data;
  });
};

export const refreshRoles = () => {
        var hoaId =  deviceStorage.getItem("hoaId");
        var hoas = JSON.parse( deviceStorage.getItem("hoas"));
        if(hoaId) {
        const roles= hoas.find(e => e.hoaId === hoaId)?.roles.map(x=>x.name);
        if(roles){
           deviceStorage.setItem("isAppAdmin", roles.includes("AppAdmin"));
           deviceStorage.setItem("isBuildingAdmin", roles.includes("Administrator"));
           deviceStorage.setItem("isBoard" , roles.includes("BoardMember"));
           deviceStorage.setItem("isResident", roles.includes("HomeOwner"));
        }

        };
        
  };



export const createHoa = (data) => {
  return api.post(path, data);
};

