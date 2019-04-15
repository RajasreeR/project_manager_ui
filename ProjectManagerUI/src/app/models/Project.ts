export interface Project {
    projectId : number;
    Name? : string;
    numberOfTask?: number;
    managerId? : number;
    managerName?: string;
    priority?: number;
    status?: string;
    StartDate?: string;
    EndDate? :string;
}