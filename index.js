const express = require('express');
const http = require('http');
const cors = require('cors');
const WebSocket = require('ws');
const app = express();
app.use(cors({
    origin: ["http://localhost:3001", "http://localhost:3000"], // Array of allowed origins
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

const server = http.createServer(app); // shared server
const wss = new WebSocket.Server({ server }); // attach WebSocket to the same server

const clients = {};

wss.on('connection', (ws) => {
    const id = Date.now();
    clients[id] = ws;

    ws.on('message', (message) => {
        console.log(`Message from client ${id}:`, message);

        // Broadcast to other clients
        Object.entries(clients).forEach(([clientId, clientWs]) => {
            if (Number(clientId) !== id && clientWs.readyState === WebSocket.OPEN) {
                clientWs.send(message);
            }
        });
    });

    ws.on('close', () => {
        delete clients[id];
    });
});

// Middleware
app.use(cors());
app.use(express.json());

// HTTP Route
app.get('/', (req, res) => {
    res.json( [
            {
                "id": 1,
                "name": "John Doe",
                "email": "john.doe@example.com",
                "profileImage": "https://i.postimg.cc/CLKdy89w/a.jpg",
                "bio": "Software engineer with a passion for open-source projects."
            },
            {
                "id": 2,
                "name": "Jane Smith",
                "email": "jane.smith@example.com",
                "profileImage": "https://i.postimg.cc/TYG2GDSK/b.jpg",
                "bio": "Graphic designer and digital artist."
            },
            {
                "id": 3,
                "name": "Alice Johnson",
                "email": "alice.johnson@example.com",
                "profileImage": "https://i.postimg.cc/28PwVCQL/c.jpg",
                "bio": "Marketing specialist with expertise in social media strategies."
            },
            {
                "id": 4,
                "name": "Bob Brown",
                "email": "bob.brown@example.com",
                "profileImage": "https://i.postimg.cc/4yY6x0n1/e.jpg",
                "bio": "Freelance writer and content creator."
            },
            {
                "id": 5,
                "name": "Charlie Davis",
                "email": "charlie.davis@example.com",
                "profileImage": "https://i.postimg.cc/ZqJ6dnCn/d.jpg",
                "bio": "Data scientist with a love for machine learning."
            },
            {
                "id": 6,
                "name": "Emily White",
                "email": "emily.white@example.com",
                "profileImage": "https://i.postimg.cc/fLLX8P7h/f.jpg",
                "bio": "Photographer and visual storyteller."
            },
            {
                "id": 7,
                "name": "Michael Green",
                "email": "michael.green@example.com",
                "profileImage": "https://i.postimg.cc/J0HXLBd6/g.jpg",
                "bio": "Entrepreneur and business consultant."
            },
            {
                "id": 8,
                "name": "Sophia Black",
                "email": "sophia.black@example.com",
                "profileImage": "https://i.postimg.cc/sgxMdWQp/h.jpg",
                "bio": "Web developer specializing in front-end technologies."
            },
            {
                "id": 9,
                "name": "Daniel Gray",
                "email": "daniel.gray@example.com",
                "profileImage": "https://i.postimg.cc/DZTfZ4Zp/m.jpg",
                "bio": "Cybersecurity expert and ethical hacker."
            },
            {
                "id": 10,
                "name": "Olivia Brown",
                "email": "olivia.brown@example.com",
                "profileImage": "https://i.postimg.cc/jqvqx5rv/l.jpg",
                "bio": "Content strategist and SEO specialist."
            },
            {
                "id": 11,
                "name": "Liam Wilson",
                "email": "liam.wilson@example.com",
                "profileImage": "https://i.postimg.cc/rFmVKkVT/k.jpg",
                "bio": "Mobile app developer with a focus on user experience."
            },
            {
                "id": 12,
                "name": "Emma Taylor",
                "email": "emma.taylor@example.com",
                "profileImage": "https://i.postimg.cc/2SLC77LX/j.jpg",
                "bio": "Digital marketer and brand strategist."
            },
           
        ]);
});

// Start server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Server (HTTP + WebSocket) running on port ${PORT}`);
});
