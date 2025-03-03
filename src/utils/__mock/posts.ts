import { Post } from '@/features/home/types/posts';

export const postDatas: Post[] = [
  {
    id: '8d5e7a20-1b63-11ee-be56-0242ac120002',
    user: {
      fullName: '08 Endranio Palupi',
      username: 'endranio_palupi',
      avatarUrl:
        'https://api.dicebear.com/9.x/big-smile/svg?seed=08%20Endranio%20Palupi', // Updated to big-smile
    },
    content: 'Lorem ipsum dolor sit amet.',
    likesCount: 10,
    repliesCount: 2,
    replies: [
      {
        id: '8d5e8a10-1b63-11ee-be56-0242ac120002',
        user: {
          fullName: 'Iqbal M Hasbi',
          username: 'iqbal_hasbi',
          avatarUrl:
            'https://api.dicebear.com/9.x/big-smile/svg?seed=Iqbal%20M%20Hasbi', // Updated to big-smile
        },
        content: 'Sangat setuju! Ini adalah salah satu kutipan terbaik.',
        likesCount: 5,
        createdAt: new Date(),
      },
      {
        id: '8d5e8b70-1b63-11ee-be56-0242ac120002',
        user: {
          fullName: 'M Rizal',
          username: 'm_rizal',
          avatarUrl:
            'https://api.dicebear.com/9.x/big-smile/svg?seed=M%20Rizal', // Updated to big-smile
        },
        content: 'Benar-benar menginspirasi, Endranio!',
        likesCount: 3,
        createdAt: new Date(),
      },
    ],
    isLiked: true,
    createdAt: new Date(),
  },
  {
    id: '8d5e7b90-1b63-11ee-be56-0242ac120002',
    user: {
      fullName: 'Iqbal M Hasbi',
      username: 'iqbal_hasbi',
      avatarUrl:
        'https://api.dicebear.com/9.x/big-smile/svg?seed=Iqbal%20M%20Hasbi', // Updated to big-smile
    },
    content: 'This is a sample post content.',
    likesCount: 8,
    repliesCount: 3,
    isLiked: false,
    createdAt: new Date(),
  },
  {
    id: '8d5e7cf0-1b63-11ee-be56-0242ac120002',
    user: {
      fullName: 'M Rizal',
      username: 'm_rizal',
      avatarUrl: 'https://api.dicebear.com/9.x/big-smile/svg?seed=M%20Rizal', // Updated to big-smile
    },
    content: 'Another dummy post content.',
    likesCount: 5,
    repliesCount: 1,
    isLiked: false,
    createdAt: new Date(),
  },
  {
    id: '8d5e7e50-1b63-11ee-be56-0242ac120002',
    user: {
      fullName: 'Muh. Yaumil Aksah Hamid',
      username: 'yaumil_aksah',
      avatarUrl:
        'https://api.dicebear.com/9.x/big-smile/svg?seed=Muh.%20Yaumil%20Aksah%20Hamid', // Updated to big-smile
    },
    content: 'Just a quick thought!',
    likesCount: 7,
    repliesCount: 2,
    isLiked: false,
    createdAt: new Date(),
  },
  {
    id: '8d5e7fba-1b63-11ee-be56-0242ac120002',
    user: {
      fullName: 'Muhammad Alfiandi Rizki',
      username: 'alfiandi_rizki',
      avatarUrl:
        'https://api.dicebear.com/9.x/big-smile/svg?seed=Muhammad%20Alfiandi%20Rizki', // Updated to big-smile
    },
    content: 'This is a placeholder post.',
    likesCount: 4,
    repliesCount: 1,
    isLiked: false,
    createdAt: new Date(),
  },
  {
    id: '8d5e8126-1b63-11ee-be56-0242ac120002',
    user: {
      fullName: 'Paste Prosman',
      username: 'paste_prosman',
      avatarUrl:
        'https://api.dicebear.com/9.x/big-smile/svg?seed=Paste%20Prosman', // Updated to big-smile
    },
    content: 'Sharing some thoughts.',
    likesCount: 9,
    repliesCount: 4,
    isLiked: false,
    createdAt: new Date(),
  },
  {
    id: '8d5e828c-1b63-11ee-be56-0242ac120002',
    user: {
      fullName: 'Rahim Haq',
      username: 'rahim_haq',
      avatarUrl: 'https://api.dicebear.com/9.x/big-smile/svg?seed=Rahim%20Haq', // Updated to big-smile
    },
    content: 'Hello everyone!',
    likesCount: 6,
    repliesCount: 0,
    isLiked: false,

    createdAt: new Date(),
  },
  {
    id: '8d5e83fc-1b63-11ee-be56-0242ac120002',
    user: {
      fullName: 'Rendy Zulfan',
      username: 'rendy_zulfan',
      avatarUrl:
        'https://api.dicebear.com/9.x/big-smile/svg?seed=Rendy%20Zulfan', // Updated to big-smile
    },
    content: 'Happy to share!',
    likesCount: 11,
    repliesCount: 5,
    isLiked: false,

    createdAt: new Date(),
  },
  {
    id: '8d5e8574-1b63-11ee-be56-0242ac120002',
    user: {
      fullName: 'Syifa Maulaya',
      username: 'syifa_maulaya',
      avatarUrl:
        'https://api.dicebear.com/9.x/big-smile/svg?seed=Syifa%20Maulaya', // Updated to big-smile
    },
    content: 'Feeling great today.',
    likesCount: 7,
    repliesCount: 3,
    isLiked: false,

    createdAt: new Date(),
  },
  {
    id: '8d5e86e2-1b63-11ee-be56-0242ac120002',
    user: {
      fullName: 'Tajjuddin Auliya Ahaadiin',
      username: 'tajjuddin_auliya',
      avatarUrl:
        'https://api.dicebear.com/9.x/big-smile/svg?seed=Tajjuddin%20Auliya%20Ahaadiin', // Updated to big-smile
    },
    content: 'A quick update from me.',
    likesCount: 8,
    repliesCount: 2,
    isLiked: false,

    createdAt: new Date(),
  },
];
