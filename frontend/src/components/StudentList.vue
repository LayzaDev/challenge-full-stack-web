<template>
  <v-data-table
    :headers="headers"
    :items="students"
    :sort-by="[{ key: 'ra', order: 'asc' }]"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Consulta de Alunos</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ props }">
            <v-btn class="mb-2" color="primary" dark v-bind="props">
              Cadastrar aluno
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" md="5" sm="6">
                    <v-text-field
                      v-model="editedItem.ra"
                      label="RA"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="7" sm="6">
                    <v-text-field
                      v-model="editedItem.name"
                      label="Nome"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="5" sm="6">
                    <v-text-field
                      v-model="editedItem.cpf"
                      label="CPF"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="7" sm="6">
                    <v-text-field
                      v-model="editedItem.email"
                      label="E-mail"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="close">
                Cancelar
              </v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="save">
                Salvar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h6"
              >Tem certeza de que deseja excluir este item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeDelete"
                >Cancelar</v-btn
              >
              <v-btn
                color="blue-darken-1"
                variant="text"
                @click="deleteItemConfirm"
                >Excluir</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon color="warning" class="me-2" size="small" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon size="small" @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
  </v-data-table>
</template>
<script>
import studentService from "../services/studentService";

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        title: "Registro Acadêmico (RA)",
        align: "start",
        sortable: false,
        key: "ra",
      },
      { title: "Nome", key: "name" },
      { title: "CPF", key: "cpf" },
      { title: "E-mail", key: "email" },
      { title: "Ações", key: "actions", sortable: false },
    ],
    students: [],
    editedIndex: -1,
    editedItem: {
      ra: "",
      name: "",
      cpf: "",
      email: "",
    },
    defaultItem: {
      ra: "",
      name: "",
      cpf: "",
      email: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "Cadastrar Aluno"
        : "Atualizar dados do aluno";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.fetchStudents();
  },

  methods: {
    fetchStudents() {
      studentService.getStudents().then((response) => {
        this.students = response.data;
      });
    },

    editItem(item) {
      this.editedIndex = this.students.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.students.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      const student = this.editedItem;
      const ra = student.ra;
      studentService.deleteStudent(ra).then(() => this.fetchStudents());
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        const student = this.editedItem;
        const ra = student.ra;
        studentService
          .updateStudent(ra, student)
          .then(() => this.fetchStudents());
      } else {
        studentService
          .createStudent(this.editedItem)
          .then(() => this.fetchStudents());
      }
      this.close();
    },
  },
};
</script>
