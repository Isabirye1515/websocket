import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { getFromXiexie } from "../../content";
import { Column, Form, Grid, TextInput } from "@carbon/react";
import "../../App.css";

const Person = () => {
  const { id } = useParams(); // this will act as client ID
  const [person, setPerson] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [onlineClients, setOnlineClients] = useState([]);
  const [selectedReceiver, setSelectedReceiver] = useState(null);
  const socketRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const allContacts = await getFromXiexie("http://localhost:4000");
      const selected = allContacts.find((item) => String(item.id) === id);
      setPerson(selected);
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    socketRef.current = new WebSocket("ws://localhost:8080");

    socketRef.current.onopen = () => {
      console.log("WebSocket connected.");

      socketRef.current.send(
        JSON.stringify({
          type: "register",
          id: id,
        })
      );
    };

    socketRef.current.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);

        if (msg.type === "clients") {
          setOnlineClients(msg.clients.filter((u) => String(u.id) !== id));
        } else if (msg.type === "message") {
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: msg.from === id ? "me" : msg.from, message: msg.message },
          ]);
        }
      } catch (err) {
        console.error("Failed to parse message:", event.data);
      }
    };

    socketRef.current.onclose = () => {
      console.log("WebSocket disconnected.");
    };

    return () => {
      socketRef.current.close();
    };
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (socketRef.current && message.trim() && selectedReceiver) {
      socketRef.current.send(
        JSON.stringify({
          type: "message",
          to: selectedReceiver,
          message,
        })
      );

      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "me", message },
      ]);
      setMessage("");
    }
  };

  if (!person) return <p>Loading...</p>;

  return (
    <>
      <Grid>
        <Column lg={8} sm={4} md={4} className="person">
          <Column lg={4} sm={2} md={4}>
            <img
              src={person.profileImage}
              height={100}
              width={100}
              alt={`${person.name}'s profile`}
            />
          </Column>
          <Column lg={2} sm={2} md={2}>
            <h2>{person.name}</h2>
            <h4>{person.email}</h4>
            <h4>{person.bio}</h4>
          </Column>
        </Column>
      </Grid>

      <Grid>
        <Column lg={16} sm={4} md={8}>
          <Column lg={8} sm={4} md={4}>
            <div className="screen">
              <p>Talk with {person.name}</p>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`message ${msg.sender === "me" ? "sent" : "received"}`}
                >
                  <p>
                    <strong>{msg.sender === "me" ? "You" : msg.sender}:</strong> {msg.message}
                  </p>
                </div>
              ))}
            </div>
          </Column>

          <Column lg={8} sm={4} md={4} className="bod-1">
            <Form onSubmit={handleSubmit}>
              <TextInput
                name="message"
                labelText="Message Input"
                placeholder="Type a message"
                value={message}
                size="sm"
                onChange={(e) => setMessage(e.target.value)}
              />
              <select
                value={selectedReceiver || ""}
                onChange={(e) => setSelectedReceiver(e.target.value)}
              >
                <option value="" disabled>
                  Select a user to message
                </option>
                {onlineClients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.name}
                  </option>
                ))}
              </select>
              <button type="submit">Send</button>
            </Form>
          </Column>
        </Column>
      </Grid>
    </>
  );
};

export default Person;
