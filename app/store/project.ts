import { defineStore } from 'pinia';

export interface Project {
  id: string;
  name: string;
  client: string;
  startDate: string;
  endDate: string;
  image?: string | null;
}

interface ProjectState {
  projects: Project[];
  loading: boolean;
  error: string | null;
}

export const useProjectStore = defineStore('project', {
  state: (): ProjectState => ({
    projects: [],
    loading: false,
    error: null,
  }),

  getters: {
    getProjectById: (state) => (id: string) => {
      return state.projects.find((project) => project.id === id);
    },
  },

  actions: {
    async fetchProjects() {
      this.loading = true;
      this.error = null;
      try {
        // Simulação de chamada de API
        await new Promise((resolve) => setTimeout(resolve, 500));
        // Em um app real, você faria a chamada para sua API aqui.
        // Por enquanto, vamos popular com dados mocados se a lista estiver vazia.
        if (this.projects.length === 0) {
          this.projects = [
            {
              id: '1',
              name: 'Desenvolvimento de Website',
              client: 'Empresa ABC',
              startDate: '2024-01-15',
              endDate: '2024-06-30',
              image: 'https://i.imgur.com/rS2aC5s.png',
            },
          ];
        }
      } catch (error) {
        this.error = 'Falha ao buscar projetos.';
      } finally {
        this.loading = false;
      }
    },

    async createProject(projectData: Omit<Project, 'id'>) {
      const newProject: Project = {
        ...projectData,
        id: crypto.randomUUID(),
      };
      this.projects.push(newProject);
    },

    deleteProject(projectId: string) {
      this.projects = this.projects.filter((p) => p.id !== projectId);
    },
  },
});
