import DoctorsTable from "./DoctorsTable"
import SearchDoctorByStatusForm from "./SearchDoctorByStatusForm"


const AllDoctors = () => {
  return (
    <div>
    <h1 className="mb-5 font-bold text-xl">All Doctor Details</h1>
    <SearchDoctorByStatusForm />
   <DoctorsTable />
</div>
  )
}

export default AllDoctors