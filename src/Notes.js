import React, { useState, useEffect } from 'react';
import { Container, Typography, CircularProgress } from '@mui/material';
import axios from 'axios';

const NotesList = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get('https://api.gyanibooks.com/library/get_dummy_notes');
        setNotes(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching notes:', error);
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  if (loading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Notes List
      </Typography>
      {notes.map((note) => (
        <div key={note.id}>
          <Typography variant="h6">{note.title}</Typography>
          <Typography>{note.content}</Typography>
          <hr />
        </div>
      ))}
    </Container>
  );
};

export default NotesList;
