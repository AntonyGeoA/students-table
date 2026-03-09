import React, { useState, useEffect } from "react";
import "./App.css";
import StudentForm from "./components/StudentForm";
import StudentTable from "./components/StudentTable";
import { initialStudents } from "./data";

function App() {

  const [students, setStudents] = useState([]);
  const [editStudent, setEditStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Load students (with loading simulation)
  useEffect(() => {

    const storedStudents = localStorage.getItem("students");

    if (storedStudents) {
      setStudents(JSON.parse(storedStudents));
    } else {
      setStudents(initialStudents);
    }

    setTimeout(() => {
      setLoading(false);
    }, 1500);

  }, []);

  // Save students to localStorage
  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  // Add student
  const addStudent = (student) => {
    setStudents([...students, { ...student, id: Date.now() }]);
  };

  // Update student
  const updateStudent = (updatedStudent) => {
    setStudents(
      students.map((student) =>
        student.id === updatedStudent.id ? updatedStudent : student
      )
    );
    setEditStudent(null);
  };

  // Delete student
  const deleteStudent = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      setStudents(students.filter((student) => student.id !== id));
    }
  };

  // Search filter
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase()) ||
    student.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">

      <h1>Students Table</h1>

      {/* Form Card */}
      <div className="card">
        <StudentForm
          addStudent={addStudent}
          editStudent={editStudent}
          updateStudent={updateStudent}
        />
      </div>

      {/* Table Card */}
      <div className="card">

        {/* Search */}
        <input
          type="text"
          placeholder="🔍 Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginBottom: "15px", padding: "8px", width: "250px" }}
        />

        {loading ? (
          <p>Loading students...</p>
        ) : (
          <StudentTable
            students={filteredStudents}
            deleteStudent={deleteStudent}
            setEditStudent={setEditStudent}
          />
        )}

      </div>

    </div>
  );
}

export default App;