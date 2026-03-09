import React, { useState, useEffect } from "react";

function StudentForm({ addStudent, editStudent, updateStudent }) {

  const [form, setForm] = useState({
    name: "",
    email: "",
    age: ""
  });

  useEffect(() => {
    if (editStudent) {
      setForm(editStudent);
    }
  }, [editStudent]);

  const handleChange = (e) => {

    const { name, value } = e.target;

    // Name validation (letters and spaces only)
    if (name === "name") {
      const regex = /^[A-Za-z ]*$/;
      if (!regex.test(value)) return;
    }

    // Age validation (numbers only)
    if (name === "age") {
      const regex = /^[0-9]*$/;
      if (!regex.test(value)) return;
    }

    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Required validation
    if (!form.name || !form.email || !form.age) {
      alert("All fields are required");
      return;
    }

    // Email validation (.com etc)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(form.email)) {
      alert("Please enter a valid email address");
      return;
    }

    // Age validation
    if (form.age < 1 || form.age > 120) {
      alert("Please enter a valid age");
      return;
    }

    if (editStudent) {
      updateStudent(form);
    } else {
      addStudent(form);
    }

    setForm({
      name: "",
      email: "",
      age: ""
    });
  };

  return (
    <form onSubmit={handleSubmit}>

      <input
        name="name"
        placeholder="Name (letters only)"
        value={form.name}
        onChange={handleChange}
      />

      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />

      <input
  type="number"
  name="age"
  placeholder="Age"
  value={form.age}
  onChange={handleChange}
/>

      <button type="submit">
        {editStudent ? "Update Student" : "Add Student"}
      </button>

    </form>
  );
}

export default StudentForm;