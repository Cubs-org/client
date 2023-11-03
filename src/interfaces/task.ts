export interface Task {
  // default
  id?: string;
  // data
  title: string;
  content?:string;
  start: string;
  end: string;
  completed: boolean;

  // custom || heritage
  tag: {
    stage?: string;
    color: string;
  }

  // mesh withup calendar
  hierarchy?:number;
  days?: number;
  timeline?: string[];

  // heritage?
  owner: string;
  isProject?: boolean;
  membership?: Member[];

  createdAt?: string;
  updatedAt?: string;
};

export interface Member {
  userId: string;
}

export interface Members extends Member {
  id: string;
  taskId: string;
};