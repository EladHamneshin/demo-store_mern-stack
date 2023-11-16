import { useEffect, useState } from 'react';
import Product from '../types/Product';
import { useParams } from 'react-router-dom';
import {
  Bag,
  Book,
  Computer,
  Guitar,
  Phone,
  Ring,
  Watch,
} from '../types/CategoryTags';
import {
  bagTags,
  bookTags,
  computerTags,
  guitarTags,
  phoneTags,
  ringTags,
  watchTags,
} from '../utils/categoryTags';
let tagType: unknown;

type Props = {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
};
const Filter = (props: Props) => {
  const { products, setProducts } = props;
  const [brand, setBrand] = useState<PhoneBrand[]>([]);
  const [material, setMaterial] = useState<PhoneMaterial[]>([]);
  const [color, setColor] = useState<PhoneColor[]>([]);
  const [price, setPrice] = useState<number[]>([0, 10000000]);
  let pTags;
  let PhoneKeys: string[] = [];
  const { cname } = useParams();
  switch (cname) {
    case 'Phone':
      tagType as Phone;
      pTags = phoneTags;
      tagType = PhoneKeys;
      break;
    case 'Computer':
      tagType as Computer;
      pTags = computerTags;
      break;
    case 'Ring':
      tagType as Ring;
      pTags = ringTags;
      break;
    case 'Book':
      tagType as Book;
      pTags = bookTags;
      break;
    case 'Bag':
      tagType as Bag;
      pTags = bagTags;
      break;
    case 'Watch':
      tagType as Watch;
      pTags = watchTags;
      break;
    case 'Guitar':
      tagType as Guitar;
      pTags = guitarTags;
  }
  const handleBrand = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setBrand([...brand, e.target.value as PhoneBrand]);
    } else {
      setBrand(brand.filter((b) => b !== e.target.value));
    }
  };
  const handleMaterial = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setMaterial([...material, e.target.value as PhoneMaterial]);
    } else {
      setMaterial(material.filter((m) => m !== e.target.value));
    }
  };
  const handleColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setColor([...color, e.target.value as PhoneColor]);
    } else {
      setColor(color.filter((c) => c !== e.target.value));
    }
  };
  const handlePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice([Number(e.target.min), Number(e.target.max)]);
  };
  useEffect(() => {
    const newProducts = products.filter(
      (p) =>
        brand.length === 0 ||
        brand.some((b) => p.tags.brand === (b as PhoneBrand))
    );
    setProducts(newProducts);
  }, [brand]);
  useEffect(() => {
    const newProducts = products.filter(
      (p) =>
        material.length === 0 || material.some((m) => p.tags.material === m)
    );
    setProducts(newProducts);
  }, [material]);
  useEffect(() => {
    const newProducts = products.filter(
      (p) =>
        color.length === 0 ||
        color.some((c) => p.tags.color === (c as PhoneColor))
    );
    setProducts(newProducts);
  }, [color]);
  useEffect(() => {
    const newProducts = products.filter(
      (p) =>
        price[0] === 0 ||
        price[1] === 10000000 ||
        (p.price >= price[0] && p.price <= price[1])
    );
    setProducts(newProducts);
  }, [price]);
  return (
    <>
      <div className="filter">
        <div className="filter__title">Brand</div>
        {pTags.brand.map((b) => (
          <label key={b}>
            <input
              type="checkbox"
              value={b}
              onChange={handleBrand}
              checked={brand.includes(b as PhoneBrand)}
            />
            {b}
          </label>
        ))}
      </div>
      <div className="filter">
        <div className="filter__title">Material</div>
        {pTags.material.map((m) => (
          <label key={m}>
            <input
              type="checkbox"
              value={m}
              onChange={handleMaterial}
              checked={material.includes(m as PhoneMaterial)}
            />
            {m}
          </label>
        ))}
      </div>
      <div className="filter">
        <div className="filter__title">Color</div>
        {pTags?.color.map((c) => (
          <label key={c}>
            <input
              type="checkbox"
              value={c}
              onChange={handleColor}
              checked={color.includes(c as PhoneColor)}
            />
            {c}
          </label>
        ))}
      </div>
      <div className="filter">
        <div className="filter__title">Price</div>
        <input
          type="range"
          min="0"
          max="10000000"
          step="100000"
          onChange={handlePrice}
        />
        <div className="filter__price">
          <span>{price[0]}</span>
          <span>{price[1]}</span>
        </div>
      </div>
    </>
  );
};
export default Filter;
