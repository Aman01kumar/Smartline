import React, { useEffect, useState } from 'react';

function AdminDashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setUsers(data);
        } else {
          alert('Unauthorized or failed to fetch users');
        }
      } catch (err) {
        console.error(err);
        alert('Server error');
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <ul>
        {users.map((u) => (
          <li key={u._id}>{u.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboard;
