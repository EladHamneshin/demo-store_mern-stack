type Phone = {
  brand: PhoneBrand;
  material: PhoneMaterial;
  color: PhoneColor;
};
type Computer = {
  brand: ComputerBrand;
  material: ComputerMaterial;
  storage: ComputerStorage;
};
type Ring = {
  material: RingMaterial;
  gemstone: RingGemstone;
  style: RingStyle;
};
type Book = {
  genre: BookGenre;
  author: BookAuthor;
  format: BookFormat;
};
type Bag = {
  type: BagType;
  material: BagMaterial;
  color: BagColor;
};
type Watch = {
  type: WatchType;
  material: WatchMaterial;
  color: WatchColor;
};
type Guitar = {
  type: GuitarType;
  style: GuitarStyle;
};
export type {Book, Bag, Watch, Guitar, Phone, Computer, Ring}