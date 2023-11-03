import { Task } from "@/interfaces/task";
import rangeDifferenceBetweenDates from "./rangeDifferenceBetweenDays";
import getDays from "./getDays";

export const adjustTasks = (tasks:Task[]) => {
    tasks.forEach(task => {
      task.days = rangeDifferenceBetweenDates({
        initialDate: task.start, 
        finalDate: task.end
      })
      task.timeline = Array.from(getDays({initialDate: task.start, finalDate: task.end}));
    })
    
    tasks.sort((a, b) => (a.start < b.start ? -1 : 1));
    
    for (let i = 0; i < tasks.length; i++) {
      const currentTask = tasks[i];
      let maxHierarchy = 0;
    
      for (let j = 0; j < i; j++) {
        const otherTask = tasks[j];
    
        if (currentTask.start >= otherTask.start && currentTask.start <= otherTask.end) {
          maxHierarchy = Math.max(maxHierarchy, otherTask.hierarchy || 0);
        }
      }
      currentTask.hierarchy = maxHierarchy + 1;
    }
    
    return tasks;
}