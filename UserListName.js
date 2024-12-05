import React, { useState, useEffect } from "react";

// Reusable component to display a list of users
interface User {
  id: number;
  name: { first: string; last: string };
  gender: string;
}

const UserListName: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]); // Holds all fetched users
  const [visibleCount, setVisibleCount] = useState(5); // Number of users to display

  // Fetch users from an API
  useEffect(() => {
    fetch("https://randomuser.me/api/?results=20") // Random User API for sample data
      .then((response) => response.json())
      .then((data) => setUsers(data.results))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  // Function to load more users
  const loadMoreUsers = () => {
    setVisibleCount((prevCount) => prevCount + 5); // Increment visible users by 5
  };

  return (
    <div>
      <h1>User List</h1>
      <ul aria-label="User List">
        {users.slice(0, visibleCount).map((user, index) => (
          <li key={user.id} aria-label={`User ${index + 1}`}>
            <p>
              <strong>Name:</strong> {user.name.first} {user.name.last}
            </p>
            <p>
              <strong>Gender:</strong> {user.gender}
            </p>
          </li>
        ))}
      </ul>
      {visibleCount < users.length && (
        <button onClick={loadMoreUsers} aria-label="Load More Users">
          Load More Users
        </button>
      )}
    </div>
  );
};

export default UserListName;
