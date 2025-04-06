import { Column, Grid } from "@carbon/react";
import { getFromXiexie } from "../../content";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";

const Body = () => {
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/person/${id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getFromXiexie("http://localhost:4000");
        setContacts(data);
      } catch (err) {
        console.error("Failed to fetch contacts:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <Grid className="bod">
      {contacts.map((item) => (
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
    </Grid>
  );
};

export default Body;
