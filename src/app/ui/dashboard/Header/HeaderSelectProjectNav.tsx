'use client';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCheck } from '@fortawesome/free-solid-svg-icons';
import {
  Nav,
  NavItem,
  NavLink,
  Modal,
  Button,
  ListGroup,
  ListGroupItem,
} from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import styles from './HeaderSelectProjectNav.module.css'; // Import the custom CSS
import Cookies from 'js-cookie';

export default function HeaderSelectProjectNav() {
  const [showModal, setShowModal] = useState(false);
  const [projects, setProjects] = useState([]);
  const [selectedProjectName, setSelectedProjectName] =
    useState('Select Project');
  const [selectedProjectId, setSelectedProjectId] = useState(
    Cookies.get('project')
  );
  const router = useRouter();

  // useEffect(() => {
  // Function to fetch projects from API
  const fetchProjects = async () => {
    try {
      const auth = Cookies.get('auth');
      if (!auth) {
        return;
      }
      const authParsed = JSON.parse(auth);
      const { token } = authParsed;
      const response = await fetch(
        'https://api.antrein.com/bc/dashboard/project/list',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setProjects(data.data.projects);
      if (selectedProjectId) {
        const selectedProject = data?.data?.projects?.find(
          (p: any) => p.id === selectedProjectId
        );
        if (selectedProject) {
          setSelectedProjectName(selectedProject.name);
        }
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  //   fetchProjects();
  // }, []);

  const handleShow = () => {
    fetchProjects();
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);
  const handleNewProject = () => {
    setShowModal(false);
    router.push('/project/create');
  };

  const handleProjectSelect = (projectName: string, projectId: string) => {
    setSelectedProjectId(projectId);
    setSelectedProjectName(projectName);
    Cookies.set('project', projectId);
    setShowModal(false);
    router.refresh();
  };

  return (
    <>
      <Nav>
        <NavItem>
          <NavLink
            className='p-2 border border-gray-300 rounded'
            onClick={handleShow}
            style={{ cursor: 'pointer' }}
          >
            {selectedProjectName} <FontAwesomeIcon icon={faCaretDown} />
          </NavLink>
        </NavItem>
      </Nav>

      <Modal
        show={showModal}
        onHide={handleClose}
        dialogClassName={styles.modalCentered} // Apply the custom class
        centered
      >
        <Modal.Header>
          <Modal.Title>Select Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            {projects.map((project: any, index) => (
              <ListGroupItem
                key={index}
                onClick={() => handleProjectSelect(project.name, project.id)}
                style={{ cursor: 'pointer' }}
              >
                <div className='d-flex justify-content-between align-items-center'>
                  <div className='d-flex align-items-center'>
                    {selectedProjectId === project.id && (
                      <FontAwesomeIcon icon={faCheck} className='me-2' />
                    )}
                    <span>{project.name}</span>
                  </div>

                  <span>{project.id}</span>
                </div>
              </ListGroupItem>
            ))}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            CANCEL
          </Button>
          <Button variant='primary' onClick={handleNewProject}>
            New Project
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
