export interface ListsTypes {
  id: number;
  title: string;
  isActive: boolean;
}

export interface DataTypes {
  key: number;
  id: number;
  boardName: string;
  lists: ListsTypes[];
}

export let data: DataTypes[] = [
  {
    id: 1,
    key: 1,
    boardName: "board-task 1",
    lists: [
      {
        id: 1,
        title: "1 1",
        isActive: true,
      },

      {
        id: 2,
        title: "1 2",
        isActive: true,
      },

      {
        id: 3,
        title: "1 3",
        isActive: false,
      },

      {
        id: 4,
        title: "1 4",
        isActive: false,
      },
    ],
  },

  {
    id: 2,
    key: 2,
    boardName: "board-task 2",
    lists: [
      {
        id: 1,
        title: "asjkda",
        isActive: true,
      },

      {
        id: 2,
        title: "asd",
        isActive: false,
      },

      {
        id: 3,
        title: "asdasdasdasd",
        isActive: true,
      },

      {
        id: 4,
        title: "auashdasdadasdoiadasdasdas",
        isActive: true,
      },
    ],
  },
];
