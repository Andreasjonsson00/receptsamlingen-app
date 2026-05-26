export const CATEGORIES = [
  { id: "MainCourse", name: "Main Course", labelKey: "categories.mainCourse" },
  { id: "Starter", name: "Starter", labelKey: "categories.starter" },
  { id: "Dessert", name: "Dessert", labelKey: "categories.dessert" },
  { id: "Vegetarian", name: "Vegetarian", labelKey: "categories.vegetarian" },
  { id: "Quick30", name: "Quick (<30 min)", labelKey: "categories.quick30" },
];

export const CATEGORY_LABEL_KEYS = Object.fromEntries(
  CATEGORIES.map((c) => [c.name, c.labelKey])
);

export const translateCategory = (t, name) =>
  CATEGORY_LABEL_KEYS[name] ? t(CATEGORY_LABEL_KEYS[name]) : name;