export interface patient{
    id:number | null;
    fullName:string;
    email:string;
    contact:string;
    password:string | null;
    gender:Gender
    // role:USER_ROLE.PATIENT
}

export enum Gender{
    MALE,
    FEMALE,
    TRANSGENDER
}

export enum USER_ROLE {

	PATIENT,
	DOCTOR,
	ADMIN
}