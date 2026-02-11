

export interface Doctor{
    id:number | null,
	name:string,
    username:string,
    email:string,
    password:string | null,
    fees:number,
    specialization:Specialization,
	mobileNo:string,
	status:DoctorStatus
}

export enum Specialization{
    CARDIOLOGY,
	    NEUROLOGY,
	    ENDOCRINOLOGY,
	    GASTROENTEROLOGY,
	    NEPHROLOGY,
	    PULMONOLOGY,
	    HEMATOLOGY,
	    RHEUMATOLOGY,
	    ALLERGY_IMMUNOLOGY,
	    DERMATOLOGY,
	    INFECTIOUS_DISEASE,
	    ONCOLOGY
}

export enum DoctorStatus {
	ACTIVE = "ACTIVE",
	SUSPENDED = "SUSPENDED",
	TERMINATED = "TERMINATED",
	ALL = "ALL"
}