const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 4000;
const app = express();
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.get('/', (req, res) => {
    res.json(
        [
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
           
        ]
    );
}
);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}
);