import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import OrderTable from "./OrderTable";
import useOrderFilter from "../../../hooks/useOrderFilter";

const Orders = () => {
  const { adminOrder, pagination } = useSelector((state) => state.order);
  const emptyOrder = !adminOrder || adminOrder?.length === 0;

  useOrderFilter();

  return (
    <div className="pb-6 pt-20">
      {emptyOrder ? (
        <div className="flex flex-col items-center justify-center text-gray-600 py-10">
          <FaShoppingCart size={50} className="mb-3" />
          <h2 className="text-2xl font-semibold">No Orders Placed Yet</h2>
        </div>
      ) : (
        <OrderTable adminOrder={adminOrder} pagination={pagination} />
      )}
    </div>
  );
};

export default Orders;
