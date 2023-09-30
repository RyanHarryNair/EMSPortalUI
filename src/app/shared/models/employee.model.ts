export class EmployeeModel {
    Id !: number;
    FirstName !: string;
    LastName !: string;
    Address !: string;
    Mobile !: string;
    DepartmentId !: number;
    Designation !: string;
    Email !: string;
    Password !: string;
    RoleId !: number;
    StartDate !: string;
    ProfileImageUrl !: string;
    UserName?: string;
}

/* 
The ! symbol after the property names indicates that these properties are marked as non-nullable, meaning they must have a value assigned. However, UserName is marked as optional with the ? symbol, meaning it can have a value or be Nullable.
*/