import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function BookingTableOperations() {
  return (
    <TableOperations>
      {/* We could do these two as compound components as well, but let's keep it simple, and let's also explore different ways of achieving the same thing */}
      <Filter
        filteredValue="status"
        options={[
          { value: "all", lebel: "All" },
          { value: "checked-out", lebel: "Checked out" },
          { value: "checked-in", lebel: "Checked in" },
          { value: "unconfirmed", lebel: "Unconfirmed" },
        ]}
      />

      <SortBy
        options={[
          { value: "startDate-desc", label: "Sort by date (recent first)" },
          { value: "startDate-asc", label: "Sort by date (earlier first)" },
          {
            value: "totalPrice-desc",
            label: "Sort by amount (high first)",
          },
          { value: "totalPrice-asc", label: "Sort by amount (low first)" },
        ]}
      />
    </TableOperations>
  );
}

export default BookingTableOperations;
