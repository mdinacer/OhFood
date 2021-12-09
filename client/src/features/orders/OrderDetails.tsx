import { Order } from "../../app/models/order";

interface Props {
  order: Order;
  setSelectedOrder: (id: number) => void;
}

export default function OrderDetails({ order, setSelectedOrder }: Props) {
  const subtotal =
    order.items.reduce((sum, item) => sum + item.quantity * item.price, 0) ?? 0;
  return <></>;
}
