export default `
CREATE TABLE businesses (
  business_id int primary key not null,
  name text not null,
  image_url text not null,
  url text not null,
  rating integer not null,
  price text not null,
  display_phone text not null,
  category_id int not null
);

CREATE INDEX price_index
ON businesses (price);
CREATE INDEX rating_index
ON businesses (rating);
`;

// Foreign key support was not working... but would have added...
// FOREIGN KEY(category_id) REFERENCES categories (category_id)
