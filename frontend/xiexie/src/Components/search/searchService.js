import { Column, Form, Grid,  Search } from "@carbon/react";
import { useEffect, useState } from "react";
import { getFromXiexie } from "../../content";
import { useNavigate } from "react-router";


const SearchService = () => {
    const navigate = useNavigate()
  const StringUrl = "http://localhost:4000";
  const [data, setData] = useState([]);
  const [criteria, setCriteria] = useState("");
  const [info, setInfo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getFromXiexie(StringUrl);
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = data.filter(item =>
      item.name.toLowerCase().trim().includes(criteria.toLowerCase().trim())
    );
    setInfo(filtered);
  }, [criteria, data]);

  const handleChange = (e) => {
    setCriteria(e.target.value);
  };
  const handleClick =(id)=>{
    navigate(`/person/${id}`)
    
  }
  return (
    <Grid>
      <Column  lg={16} md={8} sm={4} >
        <Form >
          <Search
            labelText="Search"
            placeholder="Search a person"
            name="criteria"
            value={criteria}
            onChange={handleChange}
          />
          
        </Form>

        {/* Display search results */}
        <Column lg={16} md={8} sm={4}  >
        {info.map((item) => (
        <Column
          lg={8}
          md={8}
          sm={4}
          key={item.id}
          className="bod-1"
          onClick={() => handleClick(item.id)}
        >
          <Column className="image-f" lg={4} md={4} sm={2}>
            <img
              className="image"
              height={70}
              width={70}
              src={item.profileImage}
              alt="profile"
            />
          </Column>
          <Column className="id" lg={4} md={4} sm={2}>
            <b>{item.id}</b>
          </Column>
          <Column className="name" lg={4} md={4} sm={2}>
            {item.name}
          </Column>
        </Column>
      ))}
        </Column>
      </Column>
    </Grid>
  );
};

export default SearchService;
