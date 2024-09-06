import { useState } from 'react';
import { socket } from '../socket';

type msg = {
  message: string 
  room: string
}

export function MyForm() {
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function onSubmit(event: any) {
    event.preventDefault();
    setIsLoading(true);

    const message: msg = {
      message: value,
      room: 'default'
    }

    socket.timeout(5000).emit('create-something', message, () => {
      setIsLoading(false);
    });
  }

  return (
    <form onSubmit={ onSubmit }>
      <input onChange={ e => setValue(e.target.value) } />

      <button type="submit" disabled={ isLoading }>Submit</button>
    </form>
  );
}