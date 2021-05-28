import React from "react";

function UsersForm() {
  const [userName, setUserName] = React.useState("");
  const [roles, setRoles] = React.useState("");
  return (
    <div className="form">
      <div>
        <h3>Имя пользователя:</h3>
        <input
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
        />
      </div>
      <div>
        <h3>Роли:</h3>
        <input
          value={roles}
          onChange={(event) => setRoles(event.target.value)}
        />
      </div>
    </div>
  );
}

export default UsersForm;
