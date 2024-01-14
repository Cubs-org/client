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

  // details
  owner: string;
  membership?: MemberData[];

  createdAt?: string;
  updatedAt?: string;
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