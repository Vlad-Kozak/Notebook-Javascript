const notes = [
  {
    id: "1",
    name: "Lora`s birthday",
    created: 1663589618048,
    categoryId: "1",
    content: "Pick up the present for Lora",
    dates: "",
    archived: true,
  },
  {
    id: "2",
    name: "Dentist",
    created: 1663589618048,
    categoryId: "1",
    content:
      "I’m gonna have a dentist appointment on the 3/5/2021, I moved it from 5/5/2021",
    dates: "3/5/2021, 5/5/2021",
    archived: false,
  },
  {
    id: "3",
    name: "Dog",
    created: 1663589618048,
    categoryId: "3",
    content: "Make a dog house",
    dates: "",
    archived: false,
  },
  {
    id: "4",
    name: "Education",
    created: 1663589618048,
    categoryId: "1",
    content: "Read 5 books",
    dates: "",
    archived: false,
  },
  {
    id: "5",
    name: "Password",
    created: 1663589618048,
    categoryId: "2",
    content: "Superman1986",
    dates: "",
    archived: false,
  },
  {
    id: "6",
    name: "Work",
    created: 1663589618048,
    categoryId: "3",
    content: "Test hydrocyclone for medium pulp percentage",
    dates: "",
    archived: false,
  },
  {
    id: "7",
    name: "Diploma",
    created: 1663589618048,
    categoryId: "1",
    content: "Pick up a diploma from the university 30/09/2022",
    dates: "30/09/2022",
    archived: false,
  },
];

const categories = [
  {
    id: "1",
    name: "Task",
    imageUrl: "./images/task.svg",
  },
  {
    id: "2",
    name: "Random Thought",
    imageUrl: "./images/thought.svg",
  },
  {
    id: "3",
    name: "Idea",
    imageUrl: "./images/idea.svg",
  },
];

export default { notes, categories };
