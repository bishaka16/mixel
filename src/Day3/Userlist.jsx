import React, { useEffect, useState } from "react";

function Userlist() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("id");
  const [sortAsc, setSortAsc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [previewUserIndex, setPreviewUserIndex] = useState(null);

  const usersPerPage = 5;

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  }, []);

  // Sorting & filtering
  const filteredUsers = users.filter((user) =>
    `${user.name} ${user.username} ${user.email} ${user.address.city}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const valA = sortBy === "address"
      ? `${a.address.street}, ${a.address.city}`
      : a[sortBy];
    const valB = sortBy === "address"
      ? `${b.address.street}, ${b.address.city}`
      : b[sortBy];

    if (typeof valA === "string") {
      return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
    }
    return sortAsc ? valA - valB : valB - valA;
  });

  const totalPages = Math.ceil(sortedUsers.length / usersPerPage);
  const currentUsers = sortedUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortAsc(!sortAsc);
    } else {
      setSortBy(column);
      setSortAsc(true);
    }
  };

  const toggleUserSelection = (id) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((u) => u !== id) : [...prev, id]
    );
  };

  const exportUser = (user) => {
    const headers = ["ID", "Name", "Username", "Email", "Address"];
    const row = [
      user.id,
      user.name,
      user.username,
      user.email,
      `${user.address.street}, ${user.address.city}, ${user.address.zipcode}`
    ];
    const csv = [headers.join(","), row.join(",")].join("\n");
    downloadCSV(csv, `user_${user.id}.csv`);
  };

  const exportSelected = () => {
    selectedUsers.forEach((id) => {
      const user = users.find((u) => u.id === id);
      if (user) exportUser(user);
    });
  };

  const downloadCSV = (content, filename) => {
    const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openModal = (index) => {
    setPreviewUserIndex(index);
  };

  const closeModal = () => {
    setPreviewUserIndex(null);
  };

  const nextModal = () => {
    if (previewUserIndex < selectedUsers.length - 1) {
      setPreviewUserIndex(previewUserIndex + 1);
    }
  };

  const prevModal = () => {
    if (previewUserIndex > 0) {
      setPreviewUserIndex(previewUserIndex - 1);
    }
  };

  const getPreviewUser = () => {
    const id = selectedUsers[previewUserIndex];
    return users.find((u) => u.id === id);
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>📋 User List</h2>

      <div style={toolbarStyle}>
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={inputStyle}
        />
        <button onClick={exportSelected} style={exportBtnStyle}>
          📤 Export Selected
        </button>
        <button
          onClick={() => openModal(0)}
          disabled={selectedUsers.length === 0}
          style={{
            ...exportBtnStyle,
            backgroundColor: selectedUsers.length ? "#2196f3" : "#ccc",
            cursor: selectedUsers.length ? "pointer" : "not-allowed"
          }}
        >
          🖼 Preview Selected
        </button>
      </div>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th></th>
            <th style={thStyle} onClick={() => handleSort("id")}>ID ⬍</th>
            <th style={thStyle} onClick={() => handleSort("name")}>Name ⬍</th>
            <th style={thStyle} onClick={() => handleSort("username")}>Username ⬍</th>
            <th style={thStyle} onClick={() => handleSort("email")}>Email ⬍</th>
            <th style={thStyle} onClick={() => handleSort("address")}>Address ⬍</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.id} style={rowStyle}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user.id)}
                  onChange={() => toggleUserSelection(user.id)}
                />
              </td>
              <td style={tdStyle}>{user.id}</td>
              <td style={tdStyle}>{user.name}</td>
              <td style={tdStyle}>{user.username}</td>
              <td style={tdStyle}>{user.email}</td>
              <td style={tdStyle}>
                {user.address.street}, {user.address.city}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div style={paginationStyle}>
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
        >
          ⬅ Prev
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next ➡
        </button>
      </div>

      {/* Modal Preview */}
      {previewUserIndex !== null && (
        <div style={modalOverlay}>
          <div style={modalBox}>
            <button onClick={closeModal} style={modalCloseBtn}>❌</button>
            <div>
              <h3>User Preview</h3>
              <pre style={modalContent}>
                {JSON.stringify(getPreviewUser(), null, 2)}
              </pre>
              <div style={{ marginTop: "10px" }}>
                <button onClick={() => exportUser(getPreviewUser())} style={exportBtnStyle}>📤 Export This</button>
                <button onClick={prevModal} disabled={previewUserIndex === 0} style={navBtn}>⬅ Prev</button>
                <button onClick={nextModal} disabled={previewUserIndex === selectedUsers.length - 1} style={navBtn}>Next ➡</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// 🔧 Styles
const containerStyle = {
  padding: "30px",
  maxWidth: "1000px",
  margin: "50px auto",
  background: "#fff",
  borderRadius: "15px",
  boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
  fontFamily: "Segoe UI, sans-serif",
};

const headingStyle = {
  color: "#00bcd4",
  marginBottom: "20px",
  textAlign: "center",
};

const toolbarStyle = {
  display: "flex",
  justifyContent: "space-between",
  gap: "10px",
  marginBottom: "15px",
};

const inputStyle = {
  padding: "10px",
  fontSize: "16px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  flex: "1",
};

const exportBtnStyle = {
  backgroundColor: "#00c853",
  color: "#fff",
  padding: "10px 16px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  fontWeight: "bold",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
};

const thStyle = {
  backgroundColor: "#00bcd4",
  color: "white",
  padding: "12px",
  textAlign: "left",
  cursor: "pointer",
};

const tdStyle = {
  padding: "10px",
  borderBottom: "1px solid #ddd",
};

const rowStyle = {
  transition: "background-color 0.2s ease",
};

const paginationStyle = {
  display: "flex",
  justifyContent: "center",
  marginTop: "20px",
  gap: "15px",
  alignItems: "center",
  fontSize: "16px",
};

const modalOverlay = {
  position: "fixed",
  top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: "rgba(0,0,0,0.6)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

const modalBox = {
  backgroundColor: "#fff",
  padding: "25px",
  borderRadius: "12px",
  width: "500px",
  position: "relative",
};

const modalContent = {
  backgroundColor: "#f5f5f5",
  padding: "15px",
  borderRadius: "8px",
  fontSize: "14px",
  overflowX: "auto",
};

const modalCloseBtn = {
  position: "absolute",
  top: "10px",
  right: "15px",
  background: "none",
  border: "none",
  fontSize: "20px",
  cursor: "pointer",
};

const navBtn = {
  marginLeft: "10px",
  padding: "8px 14px",
  backgroundColor: "#2196f3",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

export default Userlist;
