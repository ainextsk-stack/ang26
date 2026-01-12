// src/app/models/product.model.ts

export interface Product {
  id: number;                     // уникальный ID товара
  name: string;                   // название (например: "Беспроводные наушники Pro")
  description: string;            // описание (2–5 предложений)
  price: number;                  // актуальная цена в рублях
  oldPrice?: number;              // старая цена (для отображения скидки)
  discount?: number;              // процент скидки (например 15)
  imageUrl: string;               // ссылка на фото (можно placeholder с unsplash)
  category: string;               // категория (Смартфоны, Аудио, Ноутбуки и т.д.)
  brand?: string;                 // бренд (опционально)
  rating?: number;                // рейтинг (от 1 до 5, например 4.7)
  reviewsCount?: number;          // кол-во отзывов
  isNew?: boolean;                // флаг "Новинка" (для бейджа)
  stock?: number;                 // остаток на складе (если 0 — "Нет в наличии")
}