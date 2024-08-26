<template>
  <v-data-table
    :headers="headers"
    :items="filteredStudents"
    :sort-by="[{ key: 'ra', order: 'asc' }]"
    style="width: 100vw; height: 85vh"
  >
    <template v-slot:top>
      <v-toolbar flat style="background-color: #000000">
        <v-toolbar-title>Consulta de Alunos</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-text-field
          v-model="search"
          label="Pesquisar"
          single-line
          hide-details
          class="search-input"
        ></v-text-field>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-dialog v-model="dialog" max-width="800px">
          <template v-slot:activator="{ props }">
            <v-btn class="mb-2" dark v-bind="props"> Cadastrar aluno </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-form ref="form" v-model="formValid">
                  <v-row>
                    <v-col cols="12" md="5" sm="6">
                      <v-text-field
                        v-model="editedItem.ra"
                        label="RA"
                        required
                        :rules="[(v) => !!v || 'RA é obrigatório']"
                        :disabled="editedIndex > -1"
                      >
                        <template v-slot:label>
                          RA <span style="color: red">*</span>
                        </template></v-text-field
                      >
                    </v-col>
                    <v-col cols="12" md="7" sm="6">
                      <v-text-field
                        v-model="editedItem.name"
                        label="Nome"
                        aria-required="true"
                        :rules="[(v) => !!v || 'Nome é obrigatório']"
                      >
                        <template v-slot:label>
                          Nome
                          <span style="color: red">*</span>
                        </template>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" md="5" sm="6">
                      <v-text-field
                        v-model="editedItem.cpf"
                        label="CPF"
                        required
                        :rules="[(v) => !!v || 'CPF é obrigatório']"
                        :disabled="editedIndex > -1"
                      >
                        <template v-slot:label>
                          CPF <span style="color: red">*</span>
                        </template>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" md="7" sm="6">
                      <v-text-field
                        v-model="editedItem.email"
                        label="E-mail"
                        required
                        :rules="[(v) => !!v || 'E-mail é obrigatório']"
                      >
                        <template v-slot:label>
                          E-mail <span style="color: red">*</span>
                        </template>
                      </v-text-field>
                    </v-col>
                  </v-row>
                </v-form>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="close">
                Cancelar
              </v-btn>
              <v-btn
                color="blue-darken-1"
                variant="text"
                :disabled="!formValid"
                @click="save"
              >
                Salvar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card style="padding: 2%">
            <v-card-title class="text-h6" style="padding: 5%"
              >Tem certeza de que deseja excluir este item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeDelete"
                >Cancelar</v-btn
              >
              <v-btn
                color="red-darken-1"
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
      <v-icon
        color="blue-darken-1"
        class="me-2"
        size="small"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon color="red-darken-1" size="small" @click="deleteItem(item)">
        mdi-delete
      </v-icon>
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
    search: "",
    formValid: false,
    headers: [
      {
        title: "Registro Acadêmico (RA)",
        align: "center",
        sortable: false,
        key: "ra",
      },
      { title: "Nome", key: "name", align: "center" },
      { title: "CPF", key: "cpf", align: "center" },
      { title: "E-mail", key: "email", align: "center" },
      { title: "Ações", key: "actions", align: "center", sortable: false },
    ],
    students: [],
    editedIndex: -1,
    editedItem: {
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
    filteredStudents() {
      return this.students.filter((student) => {
        const searchTerm = this.search.toLowerCase();
        return (
          student.ra.toLowerCase().includes(searchTerm) ||
          student.name.toLowerCase().includes(searchTerm) ||
          student.cpf.toLowerCase().includes(searchTerm) ||
          student.email.toLowerCase().includes(searchTerm)
        );
      });
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
      studentService
        .getStudents()
        .then((response) => {
          this.students = response.data;
        })
        .catch((error) => {
          alert("Erro ao listar estudandes: " + error);
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
      studentService
        .deleteStudent(ra)
        .then((response) => {
          this.fetchStudents();
          alert(`${response.data}`);
        })
        .catch((error) => {
          alert(`Erro ao deletar o estudante: ${error.response.data}`);
        });
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
      if (this.$refs.form.validate()) {
        if (this.editedIndex > -1) {
          const student = this.editedItem;
          const ra = student.ra;
          studentService
            .updateStudent(ra, student)
            .then((response) => {
              this.fetchStudents();
              this.close();
              alert(`${response.data}`);
            })
            .catch((error) =>
              alert(`Erro ao atualizar o estudante: ${error.response.data}`)
            );
        } else {
          studentService
            .createStudent(this.editedItem)
            .then((response) => {
              this.fetchStudents();
              this.close();
              alert(`${response.data}`);
            })
            .catch((error) =>
              alert(`Erro ao criar o estudante: ${error.response.data}`)
            );
        }
      }
    },
  },
};
</script>
