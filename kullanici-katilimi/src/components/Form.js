import React, { useState } from "react";
import axios from "axios";
import * as Yup from "yup";

const schema = Yup.object().shape({
  first_name: Yup.string().required("First Name is required"),
  last_name: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
  term: Yup.boolean().oneOf([true], "You must accept the terms and conditions"),
});

export default function Form({ addMember }) {
  const [member, setMember] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    term: false,
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get("https://reqres.in/api/users");

      // email kontrolü
      const existingMember = response.data.data.find(
        (m) => m.email === member.email
      );
      if (existingMember) {
        setErrors({ email: "This email is already registered" });
        return; // işlemi durdur
      }

      // form validasyonu
      await schema.validate(member, { abortEarly: false });

      // yeni üye ekleme isteği
      const newMember = await axios.post("https://reqres.in/api/users", member);
      console.log(newMember);
      addMember(newMember.data); // yeni üye nesnesini geçirin
      setMember({
        // formdaki verileri sıfırlayın
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        term: false,
      });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const validationErrors = {};
        error.inner.forEach((e) => {
          validationErrors[e.path] = e.message;
        });
        setErrors(validationErrors);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <span>First Name:</span>
        <input
          type="text"
          name="first_name"
          value={member.first_name}
          onChange={(e) => setMember({ ...member, first_name: e.target.value })}
        />
        {errors.first_name && <div className="error">{errors.first_name}</div>}
      </label>
      <br />
      <label>
        <span>Last Name:</span>
        <input
          type="text"
          name="last_name"
          value={member.last_name}
          onChange={(e) => setMember({ ...member, last_name: e.target.value })}
        />
        {errors.last_name && <div className="error">{errors.last_name}</div>}
      </label>
      <br />
      <label>
        <span>Email:</span>
        <input
          type="text"
          name="email"
          value={member.email}
          onChange={(e) => setMember({ ...member, email: e.target.value })}
        />
        {errors.email && <div className="error">{errors.email}</div>}
      </label>
      <br />
      <label>
        <span>Password:</span>
        <input
          type="password"
          name="password"
          value={member.password}
          onChange={(e) => setMember({ ...member, password: e.target.value })}
        />
        {errors.password && <div className="error">{errors.password}</div>}
      </label>
      <br />
      <label className="checkbox">
        <input
          type="checkbox"
          id="term"
          name="term"
          value="term"
          checked={member.term}
          onChange={(e) => setMember({ ...member, term: e.target.checked })}
        />
        Terms of Service
      </label>
      {errors.term && <div className="error">{errors.term}</div>}
      <button type="submit">Submit</button>
    </form>
  );
}