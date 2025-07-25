export interface ICreateProduct extends Document {
  image: string;
  title: string;
  brand: string;
  quantity: number;
  price: number;
  rating: number;
  description: string;
}

export interface IProduct extends ICreateProduct {
  isDeleted: boolean;
}

//  {
//     id: 1,
//     image: "https://i.ibb.co/V1D2hfG/k-01.jpg",
//     title: "K1 RGB Pro Mechanical Keyboard",
//     brand: "Redragon",
//     quantity: 25,
//     price: 3890,
//     rating: 4.5,
//     description:
//       "Experience precision with the K1 RGB Pro, designed for fast and accurate keystrokes. The keyboard features vibrant per-key RGB lighting and a durable metal build. Ideal for both gamers and typists seeking reliability and performance.",
//   },
