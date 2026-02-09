import { useState } from "react";

function AddResource() {
  const [form, setForm] = useState({
    title: "",
    topic: "",
    description: "",
    url: "",
    type: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:3000/add-resource", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      alert(data.message);
    } catch {
      alert("Error adding resource");
    }
  };

  return (
    <div style={{ marginTop: 30 }}>
      <h2>Add Resource</h2>

      <input name="title" placeholder="Title" onChange={handleChange} /><br/>
      <input name="topic" placeholder="Topic" onChange={handleChange} /><br/>
      <input name="description" placeholder="Description" onChange={handleChange} /><br/>
      <input name="url" placeholder="URL" onChange={handleChange} /><br/>
      <input name="type" placeholder="Type (video/ppt/article)" onChange={handleChange} /><br/>

      <button onClick={handleSubmit}>Add Resource</button>
    </div>
  );
}

export default AddResource;
