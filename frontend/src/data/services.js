// src/data/services.js

// Ini adalah data dummy untuk layanan kita.
// Di aplikasi nyata, data ini akan diambil dari API backend.
export const services = [
  {
    id: 1,
    slug: 'prenatal-massage',
    category: 'Prenatal',
    name: 'Prenatal Massage',
    starting_price: 275000,
    image: 'https://akcdn.detik.net.id/visual/2019/03/26/a9cd5bd9-3823-4cad-be66-5f3fd0a5e36f_43.jpeg?w=720&q=90',
    description: 'Pijat yang dirancang khusus untuk meredakan ketidaknyamanan selama kehamilan, meningkatkan sirkulasi, dan mengurangi stres.',
    packages: [
      {
        id: 101,
        name: 'Prenatal Massage 60 Menit',
        duration: 60,
        price: 275000,
        description: 'Sesi 60 menit yang menenangkan untuk meredakan pegal dan meningkatkan relaksasi.'
      },
      {
        id: 102,
        name: 'Prenatal Massage 90 Menit',
        duration: 90,
        price: 350000,
        description: 'Sesi 90 menit yang lebih mendalam untuk mengatasi area yang lebih tegang dan memberikan relaksasi total.'
      }
    ]
  },
  {
    id: 2,
    slug: 'baby-and-kids-massage',
    category: 'Baby & Kids',
    name: 'Baby and Kids Massage',
    starting_price: 100000,
    image: 'https://akcdn.detik.net.id/visual/2019/03/26/a9cd5bd9-3823-4cad-be66-5f3fd0a5e36f_43.jpeg?w=720&q=90',
    description: 'Pijat lembut untuk bayi dan anak-anak yang bermanfaat untuk meningkatkan kualitas tidur, meredakan kolik, dan memperkuat ikatan.',
    packages: [
      {
        id: 201,
        name: 'Baby Massage 30 Menit',
        duration: 30,
        price: 100000,
        description: 'Pijatan lembut dan singkat yang sempurna untuk bayi Anda.'
      }
    ]
  },
  // Tambahkan layanan lain di sini jika perlu
];