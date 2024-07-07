'use client'

import {
  Alert, Button, Form, FormControl, InputGroup,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUser } from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import { SyntheticEvent, useState } from 'react';
import axios from 'axios';
import InputGroupText from 'react-bootstrap/InputGroupText';

export default function Register() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    retype_password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const register = async (e: SyntheticEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await axios.post('https://api.antrein.com/bc/dashboard/auth/register', formData);
      if (res.status === 201) {
        router.push('/login');  // Redirect to login page after successful registration
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Alert variant="danger" show={error !== ''} onClose={() => setError('')} dismissible>{error}</Alert>
      <Form onSubmit={register}>
        <InputGroup className="mb-3">
          <InputGroupText><FontAwesomeIcon icon={faUser} fixedWidth /></InputGroupText>
          <FormControl
            name="name"
            required
            disabled={submitting}
            placeholder="Name"
            aria-label="Name"
            value={formData.name}
            onChange={handleChange}
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroupText>
            <FontAwesomeIcon icon={faEnvelope} fixedWidth />
          </InputGroupText>
          <FormControl
            type="email"
            name="email"
            required
            disabled={submitting}
            placeholder="Email"
            aria-label="Email"
            value={formData.email}
            onChange={handleChange}
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroupText><FontAwesomeIcon icon={faLock} fixedWidth /></InputGroupText>
          <FormControl
            type="password"
            name="password"
            required
            disabled={submitting}
            placeholder="Password"
            aria-label="Password"
            value={formData.password}
            onChange={handleChange}
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroupText><FontAwesomeIcon icon={faLock} fixedWidth /></InputGroupText>
          <FormControl
            type="password"
            name="retype_password"
            required
            disabled={submitting}
            placeholder="Repeat password"
            aria-label="Repeat password"
            value={formData.retype_password}
            onChange={handleChange}
          />
        </InputGroup>

        <Button type="submit" className="d-block w-100" disabled={submitting} variant="success">
          Create Account
        </Button>
      </Form>
    </>
  );
}
