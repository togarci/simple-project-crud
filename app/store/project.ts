export interface Project {
  id: string;
  name: string;
  client: string;
  startDate: string;
  endDate: string;
  image?: string | null;
}

export const useProjectStore = defineStore(
  'project',
  () => {
    const projects = ref<Project[]>([]);

    function addToData(data: Project) {
      const uuid = crypto.randomUUID();
      projects.value.push({ ...data, id: uuid });
    }

    function updateData(id?: string, project?: Project) {
      if (!id || !project) return;

      projects.value.forEach((item) => {
        if (item.id === id) {
          item = project;
        }
      });
    }

    function removeFromData(id?: string | number) {
      if (!id) return;

      projects.value = projects.value.filter((item) => item.id !== id);
    }

    return { projects, addToData, removeFromData, updateData };
  },
  { persist: true }
);
