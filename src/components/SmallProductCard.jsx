const SmallProductCard = ({ product }) => (
  <article className="small-product-card">
    <div
      className="small-product-visual"
      style={{
        background: `linear-gradient(135deg, ${product.accent}, rgba(255,255,255,0.95))`,
      }}
    />
    <div className="small-product-info">
      <h3 className="small-product-name">{product.name}</h3>
      <span className="small-product-price">{product.price}</span>
    </div>
  </article>
);

export default SmallProductCard;












