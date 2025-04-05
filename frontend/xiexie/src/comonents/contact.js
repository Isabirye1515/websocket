import  {  useEffect, useState } from 'react';

const Contact = () => {

    const urlString ="http://localhost:4000/";
    const [data, setData] = useState([]);
    const  fetchData = async ()=>{
        const response = await fetch(urlString);
        const data = await response.json();
        console.log(data);
        setData(data);

    }
    useEffect(() => {
        fetchData();
    },[])

    return (
        <div className="App">
            <header className="App-header">
                <h1>Contacts</h1>
                {data.map((item) => (
                    <div key={item.id} className="contact-card">
                        <img src={item.profileImage} alt={item.name} className='contact-image' />
                        <h2>{item.name}</h2>
                    </div>
                ))}
            </header>
        </div>
    );
    

}
export default Contact;