import { useState } from "react";
import { ListGroup, Spinner } from "react-bootstrap";
import useProducts from "../../app/hooks/useProducts";
import { useAppDispatch } from "../../app/store/configureStore";
import "./Catalog.scss";
import { setProductParams } from "./catalogSlice";
import ProductList from "./ProductList";

export default function Catalog() {
  const { products, productsLoaded, filtersLoaded, types } = useProducts();
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  function handleTypeChange(event: any) {
    setSelectedType(event);
    if (event === "Tout") dispatch(setProductParams({ types: [] }));

    dispatch(setProductParams({ types: [event] }));
  }

  if (!filtersLoaded) return <Spinner animation="grow" />;

  return (
    <div className="catalog d-flex flex-column align-items-center justify-content-start">
      <small className=" fw-bold text-decoration-underline">MENU</small>
      {types && (
        <ListGroup
          variant="flush"
          className="flex-row flex-md-row pointer-event justify-content-center mb-5 pb-5 flex-wrap"
        >
          <ListGroup.Item
            className="list-item"
            active={!selectedType}
            onClick={() => handleTypeChange(null)}
          >
            Tout
          </ListGroup.Item>
          {types.map((type) => (
            <ListGroup.Item
              key={type}
              className="list-item"
              active={selectedType === type}
              onClick={() => {
                handleTypeChange(type);
              }}
            >
              {type}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}

      {productsLoaded ? (
        <ProductList products={products} />
      ) : (
        <Spinner
          animation="grow"
          role="status"
          variant="dark"
          style={{
            height: "200px",
            width: "200px",
          }}
        />
      )}
    </div>
  );
}
