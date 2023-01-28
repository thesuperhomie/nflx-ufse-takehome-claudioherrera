export default `
CREATE TABLE categories (
  category_id int primary key not null,
  alias text not null,
  title text not null,
  search_term_id int not null
); 
`;
// Foreign key support was not working... but would have added...
// FOREIGN KEY(search_term_id) REFERENCES search_terms (search_term_id)
