import Filter from "../../ui/Filter";

function DashboardFilter() {
  return (
    <Filter
      filteredValue="last"
      options={[
        { value: "7", lebel: "Last 7 days" },
        { value: "30", lebel: "Last 30 days" },
        { value: "90", lebel: "Last 90 days" },
      ]}
    />
  );
}

export default DashboardFilter;
