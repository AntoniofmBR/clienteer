import { ClientForTable } from '@/@types/clients';

export async function deleteClientFn( clientId: string ) {
  const res = await fetch('/api/clients/delete', {
    method: 'POST',
    body: JSON.stringify({ id: clientId }),
    headers: { 'Content-Type': 'application/json' },
  });
  
  if ( res.status === 204 ) {
    return;
  }

  if ( !res.ok ) {
    const errorData = await res.json();
    throw new Error(errorData.error || 'Falha ao deletar o cliente');
  }
  return res.json();
}

export async function fetchClients(): Promise<ClientForTable[]> {
  const res = await fetch('/api/clients');
  if ( !res.ok ) {
    throw new Error('Network response was not ok');
  }
  return res.json();
}