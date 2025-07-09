import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from './ui/resizable';
import { SidebarUI } from './sidebarUi';

export function Sidebar({ children }: { children: React.ReactNode }) {
  return (
    <ResizablePanelGroup direction="horizontal" className="min-h-screen">
      <ResizablePanel defaultSize={ 12 } minSize={ 10 } maxSize={ 17 } className="bg-cards-primary">
        <SidebarUI />
      </ResizablePanel>

      <ResizableHandle className='bg-gray' />

      <ResizablePanel defaultSize={ 85 }>
        { children }
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}