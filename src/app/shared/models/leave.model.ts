export class LeaveModel {

    LeaveId !: number;
    UserId !: number;                  // 'Id' is primary key in 'UserModel' and a foreign key in 'LeaveModel' (named as 'UserId'). We can use this to combine the 2 tables.
    UserName !: string;
    Status ?: string;
    LStartDate !: Date;
    LEndDate !: Date;
    Count !: number;
    LeaveType !: string;
    CreatedBy !: number;
    UpdatedBy !: number;
    CreateDate !: Date;
    UpdateDate !: Date;

}