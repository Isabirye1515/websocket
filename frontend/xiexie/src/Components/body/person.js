import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { getFromXiexie } from "../../content";
import { Column, Form, Grid, TextInput } from "@carbon/react";
import "../../App.css"; // Add custom styles if you want

const Person = () => {
  const { id } = useParams();
  const [person, setPerson] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]); // To store chat history
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
    socketRef.current = new WebSocket("ws://localhost:4000");

    socketRef.current.onopen = () => {
      console.log("WebSocket connected.");
    };

    socketRef.current.onmessage = (event) => {
      // Add received message to the chat history
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "other", message: event.data },
      ]);
    };

    socketRef.current.onclose = () => {
      console.log("WebSocket disconnected.");
    };

    return () => {
      socketRef.current.close();
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (socketRef.current && message.trim()) {
      // Send the message to the WebSocket server
      socketRef.current.send(message);

      // Add the sent message to the chat history
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "me", message: message },
      ]);
      setMessage(""); // Clear input field after sending
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
              Talk with {person.name}
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`message ${msg.sender === "me" ? "sent" : "received"}`}
                >
                  <p>{msg.message}</p>
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
              <button type="submit">Send</button>
            </Form>
          </Column>
        </Column>
      </Grid>
    </>
  );
};

export default Person;
