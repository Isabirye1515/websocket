import {Routes,Route, useNavigate} from "react-router-dom"
import { Content, Header, HeaderGlobalAction, HeaderGlobalBar, HeaderName} from "@carbon/react"
import Body from "./Components/body/body"
import Person from "./Components/body/person"
import Register from "./Components/register"
import { Pen, Search, User } from "@carbon/icons-react"
import SearchService from "./Components/search/searchService"
import Manager from "./Components/Admin/manager"
const App =()=>{
  const navigate = useNavigate()
  const handleClick = (e)=>{
    e.preventDefault()
    navigate("/register")
  }
  const handleSearch = ()=>{
    navigate("/search")
  }
  const handleUser=(e)=>{
    e.preventDefault()
    navigate("/manager")
  }
  return(
    <div className="App" >
    <Header className="header" >
      <HeaderName className="title" prefix="" >Xiexie</HeaderName>
     <h4 >Connecting my boss</h4>
      <HeaderGlobalBar className="bar" >
        <HeaderGlobalAction>
          <Search size={30} className="icon"  onClick={handleSearch} />
        </HeaderGlobalAction>
        <HeaderGlobalAction>
          <Pen size={30} className="icon"  onClick={handleClick} />
        </HeaderGlobalAction>
        <HeaderGlobalAction>
          <User  size={30} className="icon"  onClick={handleUser} />
        </HeaderGlobalAction>
      </HeaderGlobalBar>
      
    </Header>
    <Content>
    <Routes>

      <Route>
        <Route path="/" element={<Body />} />
        <Route path="/person/:id" element={<Person />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<SearchService />} />
        <Route path="/manager" element={<Manager />} />

      </Route>

    </Routes>
    </Content>
    </div>
  )
}
export default App