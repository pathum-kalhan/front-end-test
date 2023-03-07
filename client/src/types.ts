export type Category = {
  name: string
  categoryArticles: CategoryArticle
  articleCount: number
  childrenCategories: ChildCategory
}

export type Article = {
  name:  string
  variantName: string
  prices: Prices
  images: Image[]
}

export type ChildCategory = {
  list: Array<{
    name: string
    urlPath: string
  }>
}

export type Prices = {
  currency: string
  regular: {
    value: number
  }
}

export type Image = {
  path: string
}

export type CategoryArticle = {
  articles: Article[]
}

export type HeaderProps = {
  toggleDrawer: () => void;
  searchQuery: string;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export type DrawerProps = {
  toggleDrawer: () => void;
  open: boolean;
  categories: Category[];
  drawerWidth: number;
}