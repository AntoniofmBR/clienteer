import { ManagerForTable } from '@/@types/users';

export async function deleteServerFn( serverId: string ) {
  const res = await fetch('/api/managers/delete', {
    method: 'POST',
    body: JSON.stringify({ id: serverId }),
    headers: { 'Content-Type': 'application/json' },
  });
  
  if ( res.status === 204 ) {
    return;
  }

  if ( !res.ok ) {
    const errorData = await res.json();
    throw new Error(errorData.error || 'Falha ao deletar o gerente');
  }
  return res.json();
}

export async function fetchManagers(): Promise<ManagerForTable[]> {
  const res = await fetch('/api/managers');
  if ( !res.ok ) {
    throw new Error('Network response was not ok');
  }
  return res.json();
}