export interface Task {
  // default
  id?: string;
  // data
  title: string;
  description?:string;

  properties: {
    date: {
      start: string;
      end: string;
    };
    // status: "pending" | "completed" | "canceled" | "in progress";
    completed: boolean;
    category: {
      name: string;
      color: string;
    }
  }

  timeline?: {
    day: string;
    range: number;
    hierarchy: number;
  }[];

  // details
  owner: string;

  createdAt: string;
  updatedAt: string;
};

export interface Member {
  id: string;
  userId: string;
  taskId: string;
};

export interface MemberData {
  name: string;
  email: string;
  icon: string;
  isAdmin: boolean;
};