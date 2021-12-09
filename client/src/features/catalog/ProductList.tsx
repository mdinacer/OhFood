import { useState } from "react";
import { Row } from "react-bootstrap";
import { Product } from "../../app/models/product";
import ProductDetailsModal from "./ProductDetailsModal";
import ProductItem from "./ProductItem";

interface Props {
  products: Product[];
}

export default function ProductList({ products }: Props) {
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  function handleShowModal(product: Product) {
    setSelectedProduct(product);
    setShowModal(true);
  }
  return (
    <>
      <Row xs={1} md={4} className="container g-4 mb-5 mx-auto">
        {products.map((product: Product) => (
          <ProductItem
            onCardClick={() => handleShowModal(product)}
            key={product.id}
            product={product}
          />
        ))}
      </Row>
      {selectedProduct && (
        <ProductDetailsModal
          isModalOpen={showModal}
          product={selectedProduct}
          onCloseModal={() => setShowModal(false)}
        />
      )}
    </>
  );
}
