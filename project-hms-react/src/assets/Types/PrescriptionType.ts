import { Dayjs } from "dayjs";
import { Doctor } from "./DoctorType";
import { patient } from "./PatientType";

export interface Prescription{
    id:number | null,
    patient:patient,
    date:Dayjs,
    time:string,
    docter:Doctor,
    disease:string,
    cause:string,
    prescripe:string
}