// import styled from 'styled-components';

import Spinner from "../../ui/Spinner";

import CabinRow from "./CabinRow";
import { useCabin } from "./useCabin";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

// We want each table row to have a menu, and we only want one of them to be open at the same time. We also want this functionality to be reusable. We could add a openID state here to the table, but that wouldn't really be reusable... The best way is to use a compound component

// The hotel won't ever have a lot of cabins, so there is no need to paginate. So we will do no pagination, AND we will do filtering and sorting. So here we learn how to do it on the FRONT-END (later in the booking we will do the BACK-END version, which is more real world)

// function CabinTable() {
//   // We enabled Suspense on this query with React Query. This will make it so that this component is SUSPENDED while the data is still loading. We then have to add a <Suspense> boundary somewhere OUTSIDE this component to instruct React to SUSPEND, so to PAUSE, the rendering of this component until the data has been loaded.
//   // So basically, we are delegating the loading (and also error handling) to the nearest Suspense up in the tree. That Suspense boundary keeps WAITING until the component is no longer suspending, and then renders it.
//   // So, React Query made loading data SO MUCH EASIER, as it creates the loading states for us. BUT, we still have to manage displaying loading spinners in the UI manually. With suspense, that's all gone! It can basically "decide" not to render this component until the data has arrived. This is completely different... Before Suspense, components ALWAYS rendered, but we could choose to then render a spinner while the data has not arrived yet. With Suspense it's different. The component will not even be rendered in the first place. This is what React's modern "concurrent features" are all about, where things can be deferred into the FUTURE (such as rendering components, in this case)

//   // It's EXTREMELY important to understand that this functionality is enabled by React Query, and can also be enabled by other data loading libraries or frameworks. But we as developers can NOT directly tell React "hey, this component should be suspended until some data is arriving", at least not yet. For example, React won't automatically detect when we're fetching data in a component in a useEffect or so. There will be something in the future, and then I will add it to the course, but not yet

//   // Now, everything that's inside a Suspense will be treated as just one unit, so when just one component of the child components is currently suspended, all of them will be replaced with the fallback. We can nest multiple Suspense boundaries, and the closest one will be shown. This way, when we have a big Suspense on the top on the tree, it won't have to WAIT

//   const { cabins } = useCabins();
//   const [searchParams] = useSearchParams();

//   // if (isLoading) return <Spinner />;
//   // if (!cabins) return <Empty resource={'cabins'} />;

//   // 1) Filter
//   const filterValue = searchParams.get("discount") || "all";

//   // This is probably not the most efficient way, but that doesn't matter
//   let filteredCabins;
//   if (filterValue === "all") filteredCabins = cabins;
//   if (filterValue === "no-discount")
//     filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
//   if (filterValue === "with-discount")
//     filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

//   // 2) SortBy
// const sortBy = searchParams.get("sortBy") || "startDate-asc";
// const [field, direction] = sortBy.split("-");
// const modifier = direction === "asc" ? 1 : -1;

// // This one is better!
// // .sort((a, b) => a[field].localeCompare(b[field]) * modifier);

// const sortedCabins = filteredCabins.sort(
//   (a, b) => (a[field] - b[field]) * modifier
// );

//   return (
//     <Menus>
//       {/* A beautiful API we created here! We could even have defined the widths on the columns in the table header individually, but this keeps it simpler, and I also really like it */}
//       <Table columns="9.6rem 0.8fr 2fr 1fr 1fr 3.2rem">
//         <Table.Header>
//           <div></div>
//           <div>Cabin</div>
//           <div>Capacity</div>
//           <div>Price</div>
//           <div>Discount</div>
//           <div></div>
//         </Table.Header>

//         {/* {cabins.map((cabin) => (
//             <CabinRow key={cabin.id} cabin={cabin} />
//           ))} */}

//         {/* Render props! */}
//         <Table.Body
//           data={sortedCabins}
//           render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
//         />
//       </Table>
//     </Menus>
//   );
// }
function CabinTable() {
  const { isLoading, cabins } = useCabin();
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("discount") || "all";
  let filteredCabin;
  if (filterValue == "all") filteredCabin = cabins;
  if (filterValue == "no-discount")
    filteredCabin = cabins.filter((cabin) => cabin.discount === 0);
  if (filterValue == "with-discount")
    filteredCabin = cabins.filter((cabin) => cabin.discount > 0);
  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  // This one is better!
  // .sort((a, b) => a[field].localeCompare(b[field]) * modifier);
  // console.log(filteredCabin);
  const sortedCabins = filteredCabin?.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );
  if (isLoading) return <Spinner />;
  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        ></Table.Body>
      </Table>
    </Menus>
  );
}

// We could create yet another layer of abstraction on top of this. We could call this component just <Results>, like: Results({data, count, isLoading, columns, rowComponent}). Then <CabinTable> and ALL other tables would simply call that.
// BUT, creating more abstractions also has a cost! More things to remember, more complex codebase to understand. Sometimes it's okay to just copy and paste instead of creating abstractions

export default CabinTable;
