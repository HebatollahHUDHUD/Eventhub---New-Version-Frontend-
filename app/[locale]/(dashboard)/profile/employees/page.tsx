
import ConfirmedEmployees from "./components/ConfirmedEmployees";
import NewEmployees from "./components/NewEmployees";

const EmployeesPage = () => {



  return (
    <div className="space-y-6">
      <NewEmployees />

      <ConfirmedEmployees />
    </div>
  );
};

export default EmployeesPage;
