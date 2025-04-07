import { Grid } from "@carbon/react";
import { useEffect, useState } from "react";
import { getFromXiexie } from "../../content";

const Admin = ()=>{
    const urlString = "http://localhost:4000"
    const [info,setInfo] = useState([])
    
    useEffect(()=>{
        const getAdmin = async ()=>{
            const data = await getFromXiexie(urlString);
            setInfo(data)
        }
        
    },[])
    return(
        <Grid>
            <Column lg={16} sm={4} md={8}>

            </Column>
        </Grid>
    )
    
}
export default Admin;