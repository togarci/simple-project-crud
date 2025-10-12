import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useProjectStore, type Project } from '../project';

const mockUUID = 'mock-uuid-123';
vi.stubGlobal('crypto', {
  randomUUID: () => mockUUID,
});

describe('useProjectStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should have an empty projects array on initial state', () => {
    const store = useProjectStore();
    expect(store.projects).toEqual([]);
  });

  it('should add a project to the store with a generated ID', () => {
    const store = useProjectStore();
    const newProjectData = {
      name: 'New Project',
      client: 'New Client',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      image: null,
    };

    store.addToData(newProjectData as Project);

    expect(store.projects).toHaveLength(1);
    expect(store.projects[0]).toEqual({
      ...newProjectData,
      id: mockUUID,
    });
  });

  it('should update an existing project', () => {
    const store = useProjectStore();
    const projectId = 'project-to-update';
    store.projects = [
      {
        id: projectId,
        name: 'Initial Name',
        client: 'Initial Client',
        startDate: '2024-01-01',
        endDate: '2024-01-31',
        image: null,
      },
    ];

    const updatedData = {
      name: 'Updated Name',
      client: 'Updated Client',
      startDate: '2025-02-02',
      endDate: '2025-03-03',
      image: 'new-image.png',
    };

    store.updateData(projectId, updatedData as Project);

    const updatedProject = store.projects.find((p) => p.id === projectId);
    expect(updatedProject).toBeDefined();
    expect(updatedProject?.name).toBe(updatedData.name);
    expect(updatedProject?.client).toBe(updatedData.client);
    expect(updatedProject?.startDate).toBe(updatedData.startDate);
    expect(updatedProject?.endDate).toBe(updatedData.endDate);
    expect(updatedProject?.image).toBe(updatedData.image);
  });

  it('should remove a project from the store', () => {
    const store = useProjectStore();
    const projectIdToRemove = 'project-abc';
    const projectIdToKeep = 'project-def';
    store.projects = [
      { id: projectIdToRemove, name: 'To Remove', client: 'Client A', startDate: '', endDate: '' },
      { id: projectIdToKeep, name: 'To Keep', client: 'Client B', startDate: '', endDate: '' },
    ];

    store.removeFromData(projectIdToRemove);

    expect(store.projects).toHaveLength(1);
    expect(store.projects.find((p) => p.id === projectIdToRemove)).toBeUndefined();
    expect(store.projects[0]?.id).toBe(projectIdToKeep);
  });

  it('should not remove any project if id is not provided', () => {
    const store = useProjectStore();
    store.projects = [{ id: '1', name: 'Project 1', client: 'Client', startDate: '', endDate: '' }];

    store.removeFromData();

    expect(store.projects).toHaveLength(1);
  });
});
