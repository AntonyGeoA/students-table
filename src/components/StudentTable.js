import React from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function StudentTable({ students, deleteStudent, setEditStudent }) {

  const downloadExcel = () => {

    const worksheet = XLSX.utils.json_to_sheet(students);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array"
    });

    const file = new Blob([excelBuffer], {
      type: "application/octet-stream"
    });

    saveAs(file, "students.xlsx");
  };

  return (
    <div>

      <button className="download-btn" onClick={downloadExcel}>
  📥 Download Students Excel
</button>
      <div style={{ overflowX: "auto" }}>
  <table className="student-table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Age</th>
        <th>Actions</th>
      </tr>
    </thead>

    <tbody>
      {students.map((student) => (
        <tr key={student.id}>
          <td>{student.name}</td>
          <td>{student.email}</td>
          <td>{student.age}</td>
          <td>
  <div style={{ display: "flex", gap: "8px" }}>
           <button
  onClick={() => setEditStudent(student)}
  style={{
    backgroundColor: "#22c55e",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    marginRight: "6px",
    cursor: "pointer"
  }}
>
  Edit
</button>

<button
  onClick={() => deleteStudent(student.id)}
  style={{
    backgroundColor: "#ef4444",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer"
  }}
>
  Delete
</button>
            </div>
</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

    </div>
  );
}

export default StudentTable;