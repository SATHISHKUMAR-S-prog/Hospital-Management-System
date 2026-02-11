import { Dayjs } from "dayjs";
import { Doctor } from "./DoctorType";
import { patient } from "./PatientType";

export interface Appointment{
    id:number | null,
    patient:patient,
    docter:Doctor,
    date:Dayjs,
    time:string,
    status:Status
}

export enum Status {
    ACTIVE = "ACTIVE",
    CANCELLED_BY_PATIENT = "CANCELLED_BY_PATIENT",
    CANCELLED_BY_DOCTER = "CANCELLED_BY_DOCTER",
    POSTPONED = "POSTPONED",
    OUTDATED = "OUTDATED",
    PRESCRIBED = "PRESCRIBED",
    ALL = "ALL", 
  }
  
