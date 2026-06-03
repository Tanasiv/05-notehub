import '../style.css';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';

import { fetchNotes } from '../services/noteService';
import { getToken } from '../services/authService';

import NoteList from './NoteList';
import Pagination from './Pagination';
import SearchBox from './SearchBox';
import Modal from './Modal';
import NoteForm from './NoteForm';

export default function App() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);


  useEffect(() => {
    const initAuth = async () => {
      const token = await getToken('tanasivsnizhana@gmail.com');
      localStorage.setItem('token', token);
    };

    initAuth();
  }, []);

  const debounced = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 500);

  const { data, isLoading } = useQuery({
    queryKey: ['notes', page, search],
    queryFn: () => fetchNotes(page, search),
  });

  return (
    <div>
      <header>
        <SearchBox onSearch={debounced} />
        {data?.totalPages! > 1 && (
         
<Pagination
  pageCount={10}
  currentPage={page}
  onPageChange={setPage}
/>
        )}
        <button onClick={() => setIsOpen(true)}>
          Create note +
        </button>
      </header>

      {isLoading && <p>Loading...</p>}
      {data?.notes.length! > 0 && (
        <NoteList notes={data.notes} />
      )}

      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <NoteForm onClose={() => setIsOpen(false)} />
        </Modal>
      )}
    </div>
  );
}