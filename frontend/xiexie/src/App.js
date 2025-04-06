import {Routes,Route} from "react-router-dom"
import {Content} from "@carbon/react"
import Body from "./Components/body/body"
import Person from "./Components/body/person"
const App =()=>{
  return(
    
    <Content>
    <Routes>
      <Route>
        <Route path="/body" element={<Body />} />
        <Route path="/person/:id" element={<Person />} />
      </Route>

    </Routes>
    </Content>
  )
}
export default App