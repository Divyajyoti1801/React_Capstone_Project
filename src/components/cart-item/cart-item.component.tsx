import { FC, memo } from "react";
import { CartItem as TCartItem } from "../../store/cart/cart.type.js";
import { CartItemContainer, ItemDetails, Name } from "./cart-item.style";
type CartItemProps = {
  cartItem: TCartItem;
};

const CartItem: FC<CartItemProps> = memo(({ cartItem }) => {
  const { name, quantity, imageUrl, price } = cartItem;
  return (
    <CartItemContainer>
      <img src={imageUrl} alt={`${name}`} />
      <ItemDetails>
        <Name>{name}</Name>
        <span className="price">
          {quantity} X ${price}
        </span>
      </ItemDetails>
    </CartItemContainer>
  );
});

export default CartItem;
