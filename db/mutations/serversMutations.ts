import { ServerForTable } from '@/@types/servers';

export async function deleteServerFn( serverId: string ) {
  const res = await fetch('/api/servers/delete', {
    method: 'POST',
    body: JSON.stringify({ id: serverId }),
    headers: { 'Content-Type': 'application/json' },
  });
  
  if ( res.status === 204 ) {
    return;
  }

  if ( !res.ok ) {
    const errorData = await res.json();
    throw new Error(errorData.error || 'Falha ao deletar o servidor');
  }
  return res.json();
}


export async function fetchServers(): Promise<ServerForTable[]> {
  const res = await fetch('/api/servers');
  if ( !res.ok ) {
    throw new Error('Network response was not ok');
  }
  return res.json();
}