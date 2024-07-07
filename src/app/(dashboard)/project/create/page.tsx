'use client';
import { Col, Row, Form, Button } from 'react-bootstrap';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function Page() {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const auth = Cookies.get('auth');
      if (!auth) {
        return;
      }
      const authParsed = JSON.parse(auth);
      const { token } = authParsed;
      const response = await fetch(
        'https://api.antrein.com/bc/dashboard/project',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        // Handle successful creation (e.g., show a success message or redirect)
        console.log('Project created successfully');
        router.push('/');
      } else {
        // Handle errors
        console.error('Failed to create project', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Row className='justify-content-md-center'>
      <Col md={6}>
        <h1>Create Project</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId='id'>
            <Form.Label>Project ID</Form.Label>
            <Form.Control
              type='text'
              name='id'
              value={formData.id}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              name='name'
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button variant='primary' type='submit' className='mt-4'>
            Submit
          </Button>
        </Form>
      </Col>
    </Row>
  );
}
