import { Column, Form, Grid, TextInput, Button } from "@carbon/react";
import { useState } from "react";
import { useNavigate } from "react-router";

const Register = () => {
    const navigate = useNavigate()
  const [form, setForm] = useState({
    name: "",
    profileImage: "",
    email: "",
    bio: ""
  });

  // Handle input changes
  const handleChange = (e) => {
    const { value, name } = e.target;
    setForm((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform your submit logic, such as sending the data to an API or WebSocket server
    console.log("Form Submitted:", form);
    // Reset the form after submission
    setForm({
      name: "",
      profileImage: "",
      email: "",
      bio: ""
    });
    navigate("/")
  };
  const goBack = (e)=>{
    e.preventDefault()
    navigate("/")
  }

  // Handle form clearing
  const handleClear = () => {
    setForm({
      name: "",
      profileImage: "",
      email: "",
      bio: ""
    });
  };

  return (
    <>
      <Grid  >
        <Column lg={16} sm={4} md={8} className="register" >
          <Form onSubmit={handleSubmit} className="form" >
          <Column lg={8} sm={4} md={4}>
            <TextInput
              labelText="Name"
              placeholder="Enter Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              style={{margin:"5px"}}
            />
            <TextInput
              type="email"
              labelText="Email"
              placeholder="Enter Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              style={{margin:"5px"}}
            />
            <TextInput
              labelText="Profile Picture"
              placeholder="Enter Profile Picture URL"
              name="profileImage"
              value={form.profileImage}
              onChange={handleChange}
              style={{margin:"5px"}}
            />
            <TextInput
              labelText="Bio"
              placeholder="Enter Your Speciality"
              name="bio"
              value={form.bio}
              onChange={handleChange}
              style={{margin:"5px"}}
            />
            </Column>
            <Column lg={8} sm={4} md={4}>
            <div className="guide" >
              <div className="document" >
              A new <b>LabAI</b> menu option is in the process being added to OpenELIS to integrate AI-powered functionalities into the system. This is implemented using a Liquibase database change set, ensuring that the menu item is only added if it does not already exist.

   <h3>Questions for Mentors Regarding AI Model Integration in OpenELIS</h3>
    
  <p>As you work on integrating AI into OpenELIS,  would like your guidance on selecting the most suitable models for different functionalities. Based on our use cases, here are some considerations:</p>
    <h5>1. Predictive Analytics & Diagnostics</h5>

   <ul>
       <li>Would machine learning models like <strong>Random Forest, XGBoost, or LightGBM</strong> be ideal for predicting lab test results and detecting anomalies?</li>
        <li>If we plan to analyze <strong>medical images</strong> (e.g., blood smears, pathology slides), would a <strong>CNN-based deep learning model</strong> be a viable approach?</li>
    </ul>
    
   <h5>2. Automated Result Validation</h5>
   <ul>
        <li>For identifying irregularities in test results, should we consider <strong>anomaly detection models</strong> like Autoencoders or Isolation Forests?</li>
   </ul>
    
   <h5>3. Natural Language Processing (NLP) for Clinical Data</h5>
   <ul>
        <li>Should we leverage <strong>BioBERT, ClinicalBERT, or Med7</strong> for extracting relevant information from <strong>lab reports, prescriptions, and doctor’s notes</strong>?</li>
        <li>Would a <strong>GPT-based model</strong> be useful for automating report generation and summarization?</li>
   </ul>
    
   <h5>4. Disease Surveillance & Outbreak Prediction</h5>
   <ul>
        <li>For tracking and predicting outbreaks, should we integrate <strong>time-series models like LSTMs</strong> or epidemiological models (SEIR)?</li>
        <li>Could <strong>Graph Neural Networks (GNNs)</strong> help in mapping disease spread across regions?</li>
    </ul>
    
   <h5>5. Workflow Optimization & Automation</h5>
   <ul>
        <li>Would reinforcement learning (RL) be effective in <strong>optimizing lab processes</strong>, such as sample processing and resource allocation?</li>
   </ul>
    
   <h5>Also</h5>
   <ul>
        <li>Do you recommend a specific approach or model for each use case?</li>
        <li>Are there existing AI models in the healthcare domain that OpenELIS could adopt or fine-tune?</li>
        <li>What challenges should contributors anticipate in integrating AI with current database and infrastructure?</li>
   </ul>
    
   <p>Your insights will help in refine the AI strategy and implementation roadmap. Looking forward to your guidance! 🚀</p>


              </div>
                <input type="radio"/> Agree
            </div>
            </Column>
            <div>
              <Button type="submit" style={{margin:"5px"}} >Submit</Button>
              <Button type="button" onClick={handleClear} style={{margin:"5px"}}>
                Clear
              </Button>
            </div>
          </Form>
          <Button onClick={goBack} style={{margin:"5px"}}>Back to Menu</Button>
        </Column>
      
      </Grid>
      
    </>
  );
};

export default Register;
