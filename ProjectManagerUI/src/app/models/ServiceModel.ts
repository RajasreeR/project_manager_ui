export interface UserModel {
    ID: Number
    FirstName: String
    LastName: String
    EmployeeId: Number
    ProjectId: Number
    TaskId: Number
}

export interface ProjectModel {
    ProjectId: Number
    Name: String
    StartDate: String
    EndDate: String
    Priority: Number
    Manager: Number
    ManagerName: String
}

export interface TaskModel {
    taskId: Number
    parentId: Number
    projectId: Number
    task: String
    priority: Number
    startDate: String
    endDate: String
    status: String
}

export interface ParentTaskModel {
    parentId: Number
    parentTask: String
}