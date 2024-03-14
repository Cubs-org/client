import { AxiosResponse } from "axios";
import API from ".";

export async function getDatahubId(wkspId:string): Promise<AxiosResponse>{
    
    const { data } = await API.get(`/workspace/datahub?workspaceId=${wkspId}`);

    // console.log(data.dataHubId);

    if (!data.dataHubId) console.error("DatahubId not found");

    return data.dataHubId;
}