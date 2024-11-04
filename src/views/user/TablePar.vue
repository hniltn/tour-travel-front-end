<template>
  <Table :items="data" :headers="[{ label: 'Firstname', field: 'firstname'} , {label: 'Lastname', field: 'lastname'}, {label: 'Age', field: 'age'}]">
    <template v-slot:firstname="{ item }">
      <span>{{ item.firstname }}</span>
    </template>
    <template v-slot:lastname="{ item }">
      <span>{{ item.lastname }}</span>
    </template>
    <template v-slot:age="{ item }">
      <span>{{ item.age }}</span>
    </template>
  </Table>
</template>
<script>
import Table from "./TableView.vue";
export default {
  components: {
    Table,
  },
  data() {
    return {
      data: [
        { id: 1, fullname: "Choi Wooje", age: 20 },
        { id: 2, fullname: "Moon Hyunjoon", age: 22 },
        { id: 3, fullname: "Lee Sanghyeok", age: 28 },
        { id: 4, fullname: "Lee Minhyung", age: 22 },
        { id: 5, fullname: "Ryu Minseok", age: 22 },
        { id: 6, fullname: "Nguyen Manh Phuong Linh", age: 22 },
      ].map(person => {
        const name = person.fullname.split(' ');
        return {
          ...person,
          firstname: name[0],
          lastname: name.slice(1).join(' '),
        }
      })
    };
  },
};
</script>
