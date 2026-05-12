/*  utils.jsx houses all the shared visual components */
import { useState } from 'react'

// add to cart regardless of age, gender and status (new/transfer)
const DEFAULT_ITEMS = ["unit-numbers", "council-patch", "neckercheif"];

export function ToggleControl({label, options, value, onChange, labels={} }) {

    // handle null sizeOptions for items like handbook 
    const nullOptions = options ?? []; 

    return (
    <div className="toggleContainer">
        { nullOptions.length > 0 ? (
            <div className="toggleLabel">{label}</div>
        ) : ""}
        
        <div className="toggleGroup">
            {
                nullOptions.map((option) => (
                    <button key={ option } 
                    onClick={() => {
                        //console.log("option ", option); 
                        //console.log("value ", value); 
                        onChange(option);
                    }}
                    className={ value === option ? "toggleButton toggleButtonSelected" : "toggleButton" }
                    aria-pressed={ value === option }>
                    { labels[option] ?? option } 
                    </button>
                    ))
            }
        </div>
    </div>);
}

export function ImageGallery({images, width}) {
    const [current, setCurrent] = useState(0);
    
    if (!images || images.length === 0) {
        return (<div>No Image</div>)
    }

    return (
        <div className="imgCard">
            <img src={images[current]} width={width} /> 
        </div>
    );
}

export function ItemCard ({ item, cartItems, setCartItems }) {
    
    const cartItem = cartItems.find( (i) => i.id === item.id );
    const isInCart = !!cartItem;
    const [selectedSize, setSelectedSize] = useState(cartItem?.size ?? "");
    const [sizeError, setSizeError] = useState(false);
    const hasSizes = item.sizeOptions && item.sizeOptions.length > 0;
    const [qty, setQty] = useState(cartItem?.qty ?? 1);

    // helper function to update one or multiple fields in the cart
    function updateCart( fields ) {
        setCartItems( (prev) =>
            prev.map( (theItem) => theItem.id === item.id 
                ? { ...theItem, ...fields } 
                : theItem )
        );
    }

    function handleCheckbox() {
        if (isInCart){
            // remove from cart
            setCartItems( (prev) => prev.filter( (i) => i.id !== item.id ));
        } else {
            // check size if available
            if (hasSizes && selectedSize === "") {
                setSizeError(true);
                return;
            }
            setSizeError(false);
            // add to cart
            setCartItems( (prev) => [
                ...prev, {
                    id: item.id,
                    name: item.name, 
                    description: item.description, 
                    image: item.images?.[0] ?? "",
                    size: selectedSize, 
                    qty, 
                    price:item.price
                }
            ])
        }
    }
 
    function handleSizeChange(size) {
        setSelectedSize(size);
        setSizeError(false);
        if (isInCart) updateCart( {size} );
    }

    function handleQtyChange(q) {
        const newQty = parseInt(q) || 1;
        setQty(newQty);
        if (isInCart) updateCart( { qty: newQty} );     
    }

    return (
    // <div className="itemCardContainer">
        <div className={`itemCard ${isInCart ? "itemCardAdded" : ""}`}>
         
            <ImageGallery images={item.images} width={200} />
            
            <div>
                <span className="itemName">{item.name}</span>
                <p className="itemDesc">{item.description}</p>
                <p className="itemPrice">${item.price}</p>
            </div>
            { /* show toggle control only has size options */
                hasSizes ? (
                    <ToggleControl label="Select size" 
                                options={item.sizeOptions} 
                                value={selectedSize} 
                                onChange={ (size) => {
                                    setSelectedSize(size);
                                    if (isInCart)
                                        handleSizeChange(size);
                                }} 
                            />
                ) : ""
            }

            { /* Show Size Error if no size selected */
                sizeError ? 
                    (<span className="error">Please select a size first.</span>) : ("")
            }
            
            <div className="qtyContainer">
                <button className="qtyButton" 
                    onClick={ () => {
                        handleQtyChange( qty - 1 < 1 ? 1 : qty - 1 )
                    }}>-</button>
                <span className="qtyText">{qty}</span>
                <button className="qtyButton" 
                    onClick={ () => {
                        handleQtyChange( qty + 1)
                    }}>+</button> 
            </div>

            {/* <input type="checkbox" className="itemCheckbox"
                checked={isInCart} onChange={handleCheckbox}
                id={`item-${item.id}`} /> */}

            {/* Add / remove from cart */}
            <div className="itemCardFooter">
                {isInCart ? (
                    <button onClick={ () => setCartItems((prev)=> prev.filter((i) => i.id !== item.id))}>
                        Remove from Cart
                    </button>
                ) : (
                    <button onClick={ handleCheckbox }>
                        Add to Cart
                    </button>
                )}
            </div>
        </div>
   
    );
}


export function InputField( {type, value, field, placeholder, onChange} ) {

    return (
        <input className="fieldInput" 
            type={type} value={value ?? ""}
            onChange={ (e) => onChange(field, e.target.value)}
            placeholder={placeholder} />  
    );

}
