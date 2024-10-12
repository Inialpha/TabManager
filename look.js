const people = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 25 },
  { name: 'David', age: 30 },
  { name: 'Eve', age: 35 }
];


function groupByAttribute(array, attribute) {
  // Use reduce to group the objects by the specified attribute
  const grouped = array.reduce((acc, obj) => {
    const key = obj[attribute];  // The attribute value to group by
    if (!acc[key]) {
      acc[key] = []; // Initialize the group if it doesn't exist
    }
    acc[key].push(obj); // Push the current object to the respective group
    return acc;
  }, {});

  // Convert the grouped object into an array of arrays
console.log(grouped);
  return Object.values(grouped);
}

const groupedByAge = groupByAttribute(people, 'age');
console.log(groupedByAge);

