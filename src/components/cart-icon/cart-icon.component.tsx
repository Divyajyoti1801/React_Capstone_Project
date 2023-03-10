import { useSelector } from "react-redux";

import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import {
  selectCartCount,
  selectIsCartOpen,
} from "../../store/cart/cart.selector";
import { CartIconContainer, ItemCount } from "./cart-icon.style";

import { useDispatch } from "react-redux";
import { setIsCartOpen } from "../../store/cart/cart.action";

const CartIcon = () => {
  const dispatch = useDispatch();
  const cartCount = useSelector(selectCartCount);
  const isCartOpen = useSelector(selectIsCartOpen);
  const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));
  return (
    <CartIconContainer
      className="cart-icon-container"
      onClick={toggleIsCartOpen}
    >
      <ShoppingIcon className="shopping-icon" />
      <ItemCount className="item-count">{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
