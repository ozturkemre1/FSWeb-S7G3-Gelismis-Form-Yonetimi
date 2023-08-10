import "./App.css";
import { useEffect, useState } from "react";
import Form from "./components/Form";
import axios from "axios";

export default function App() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    axios
      .get("https://reqres.in/api/users")
      .then(function (response) {
        setMembers(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const addMember = (member) => {
    axios
      .post("https://reqres.in/api/users", member)
      .then(function (response) {
        setMembers([...members, response.data]);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <h1>Add Member</h1>
      <Form addMember={addMember} />

      <h2>Members:</h2>
      <ul>
        {members.map((member) => (
          <li key={member.id}>
            {member.first_name} {member.last_name}
          </li>
        ))}
      </ul>
    </div>
  );
}