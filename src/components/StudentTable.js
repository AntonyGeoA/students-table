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
      <table border="1" style={{ marginTop: "20px" }}>

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

                <button
  className="edit-btn"
  onClick={() => setEditStudent(student)}
>
  ✏ Edit
</button>

                <button
  className="delete-btn"
  onClick={() => deleteStudent(student.id)}
>
  🗑 Delete
</button>

              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default StudentTable;