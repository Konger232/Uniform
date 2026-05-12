import './style.css'
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom"
import { ToggleControl, ItemCard, ImageGallery, InputField} from './utils'
import { getItemsFor, AGE_GROUPS, GENDERS, STATUSES, PATROLS, RANKS, 
    CATALOG, COORDINATOR_EMAIL  } from "./config"

/* Step 1 : connect customer info */

function Profile( {contact, setContact} ) {
    console.log("contact state", contact);
    const navigate = useNavigate();

    // helpler function to update any contact field
    function handleChange (field, value) {
        setContact( (prev) => ( {...prev, [field]: value} ));
    }

    return (
        <div className="profileForm">
            <span className="stepHeader">Step 1 of 3</span>
            <h1>Who are you ordering for?</h1>

            <div className="fieldRow">
                <InputField type="text" value={contact.firstName}
                    field="firstName" placeholder="First Name" 
                    onChange={handleChange} />
                <InputField type="text" value={contact.lastName}
                    field="lastName" placeholder="Last Name" 
                    onChange={handleChange} />
            </div>
            <div className="fieldRow">    
                <InputField type="email" value={contact.email}
                    field="email" placeholder="joe@gmail.com" 
                    onChange={handleChange} />
            </div>
           <div className="fieldRow">
                <select className="fieldInput" value={contact.patrol}
                    onChange={ (e) => handleChange("patrol", e.target.value)}>
                    <option value="">-- Select Your Patrol --</option>
                    {
                        PATROLS.map( (p) => (
                            <option key={p} value={p}>{p}</option>
                        ))
                    }    
                </select>
           </div>
            <div className="fieldRow">
            <select className="fieldInput" value={contact.rank}
                onChange={ (e) => handleChange("rank", e.target.value)}>
                <option value="">-- Select Your Rank --</option>
                {
                    RANKS.map( (r) => (
                        <option key={r} value={r}>{r}</option>
                    ) )
                }    
            </select>
           </div>
            <div>      
                <ToggleControl label="Scout Status" 
                    options={STATUSES} value={contact.status} 
                    onChange={ (value) => handleChange("status", value) } 
                    labels={{ new: "New Scout", transfer:"Transfer", return:"Returning"}}/>
                <ToggleControl label="Gender" 
                    options={GENDERS} value={contact.gender} 
                    onChange={ (value) => handleChange("gender", value) } 
                    labels={{ male: "Male", female: "Female" }}/>
                <ToggleControl label="Age" 
                    options={AGE_GROUPS} value={contact.ageGroup} 
                    onChange={ (value) => handleChange("ageGroup", value) } 
                    labels={{ youth:"Youth", adult:"Adult"}}/>
            </div>
            <div className="stepFooter">
                <button className="btn" 
                    disabled={!contact.firstName || !contact.email}
                    onClick={() => navigate("/catalog")}>Next: Shop</button>
            </div>
        </div>);
}

/* Step 2: display the item list based on the profile */
function ItemList({ageGroup, gender, status, cartItems, setCartItems}) {
    //console.log("ItemList rendering: ", ageGroup, gender, status);

    // flag to show all items 
    const [showAll, setShowAll] = useState(false);
    // filtered based on the age, gender and status
    const [filteredItems, setFilteredItems] = useState([]);

    // updates item list whenever age, gender, status and showAll is changed
    useEffect(() => {
        const items = getItemsFor(ageGroup, gender, status, showAll);
        setFilteredItems(items);
    }, [ageGroup, gender, status, showAll]);

    //handleAddAll (i went out of to make it work)

    return (
    <div className="survey-card">
        <span className="stepHeader">Step 2 of 3</span>
        <h1>Choose Uniform Items</h1>

        <h2>You have {filteredItems.length} recommended items</h2>
        
        { filteredItems.length === 0 ? (
            <p>No items found. Please check your selections above.</p>
            ) : (
            <div className="itemList">
            {/* <div className="itemCardcontainer"> */}
                {
                    filteredItems.map( (item) => (
                        <ItemCard 
                            key={ item.id }
                            item={ item }
                            cartItems={ cartItems }
                            setCartItems={setCartItems}
                        />
                    ))
                }
            </div>

            )
        }

        <button className={`addMoreItem${(status === 'transfer' && !showAll) ? '' : ' isHidden'}`}
        onClick={() => setShowAll(true)}>
             + Add More Items 
        </button>
        <button className={`addMoreItem${(status === 'transfer' && showAll) ? '' : ' isHidden'}`}
        onClick={() => setShowAll(false)}>
             - Show recommended items only
        </button>
       
    </div>);
}

/* step 3: submit the cart */
function Cart( {cartItems, setCartItems, contact}) {
    
    const navigate = useNavigate();
    const totalAmount = cartItems.reduce((sum, i) => sum + (i.price * i.qty), 0);
    
    function handleQtyChange(id, qty) {
        const newQty = parseInt(qty) || 1;
        setCartItems((prev) => prev.map((i)=> i.id === id ? {...i, qty: newQty} : i ))
    }

    function handleRemove(id) {
        setCartItems((prev) => prev.filter((i)=> i.id !== id) )
    }

    function handleClearCart() {
        setCartItems([]);
    } 

    // Store order in localStorage
    function handlePlaceOrder() {
        const order = {
            id: Date.now(),
            date: new Date().toLocaleDateString(),
            status: "pending",
            contact,
            items: cartItems,
            total: totalAmount
        }

        // save order to localStorage
        const existing = JSON.parse(localStorage.getItem("orders") || "[]");
        localStorage.setItem("orders", JSON.stringify([...existing, order]));

        // build eamil <style>
        const itemLines = cartItems.map((item)=>
            `- ${item.name} `
            + (item.size ? ` (Size: ${item.size})` : "")
            + `x${item.qty}`
            + ` @ $${item.price}`
            + ` = ${item.price * item.qty}`
        ).join("%OA"); // join by line feed

        const emailBody = `
        SCOUT UNIFORM 
        *******************
        Order ID: ${order.id}
        Date:     ${order.date}
        
        PROFILE 
        -------------------------
        Name:     ${contact.firstName} ${contact.lastName}
        Email:    ${contact.email} 
        Rank:     ${contact.rank}
        Age:      ${contact.ageGroup}
        Gender:   ${contact.gender}
        Status:   ${contact.status}  
        -------------------------
        ORDER ITEMS
        -------------------------
        ${itemLines}
        -------------------------
        TOTAL:    ${totalAmount.toFixed(2)}
        =========================
        `.trim();

        // open mail client
        window.location.href = `mailto:${COORDINATOR_EMAIL}`
            + `?cc=${encodeURIComponent(contact.email)}`
            + `&subject=${encodeURIComponent("Uniform Order - ${contact.firstName} ${contact.lastName}")}`
            + `&body=${encodeURIComponent(emailBody)}`;

        // clear cart
        setCartItems([]);
        navigate("/");
        //alert(`Order Placed! OrderID: ${order.id}`)
    }

    const canSubmit = contact.firstName !== "" && contact.email != "";

    /* if cart is empty */
    if (cartItems.length === 0) {
        return (
            <div>
                <span className="stepHeader">Step 3 of 3</span>
                <h1>Your Cart</h1>
                <h2>Your cart is empty.</h2>
                <button onClick={() => navigate("/catalog")}>
                    Return to recommended list
                </button>
            </div>
        )
    }
    /* if there are items in the cart */
    return (
        <div>
            <span className="stepHeader">Step 3 of 3</span>
            <h1>Your Cart</h1>
            <button onClick={handleClearCart}>Clear Cart</button>
            <div className="cardList">
                {/* loop through cartItems to display each item */}
                {cartItems.map((i) => (
                    <div className="cartRow" key={i.id}>
                        <div className="imgCard">
                             <img src={i.image} width={100} />
                        </div>
                        <div>
                            <h3>{i.name} {i.id}</h3>
                            <span>{i.size ? "Size: " + i.size : ""}</span>
                        </div>
                        <div>
                            <div className="qtyContainer">
                                <button className="qtyButton" 
                                    onClick={ () => {
                                        handleQtyChange(i.id, i.qty - 1 < 1 ? 1 : i.qty - 1 )
                                    }}>-</button>
                                <span className="qtyText">{i.qty}</span>
                                <button className="qtyButton" 
                                    onClick={ () => {
                                        handleQtyChange(i.id, i.qty + 1)
                                    }}>+</button> 
                            </div>
                            <button onClick={() => handleRemove(i.id)}
                            aria-label={`Remove ${i.name}`}>x </button>
                        </div>
                        <div>
                            <span>${i.qty * i.price}</span>
                        </div>
                    </div>
                ))}
            </div>
            {/* TOTAL */}
            <div className="cartTotal">
                <div className="cartTotalAmount">
                    <strong>TOTAL ${totalAmount.toFixed(2)}</strong>
                </div>
            </div>

            {   /*Check for name and email */
                !canSubmit && (
                    <p>Please provide your name and email address before placing an order.</p>
            )}

            {/* Place order */}
            <div className="stepFooter">
                <button onClick={() => navigate(-1)}>Back</button>
                <button disabled={!canSubmit}
                    onClick={handlePlaceOrder}>Place Order</button>
            </div>

        </div>
    )
}

function MyApp() {
    const [contact, setContact] = useState({
        firstName: "",
        lastName: "",
        email: "",
        rank: "",
        patrol: "",
        ageGroup: "youth",
        gender: "male",
        status: "new"

    });

    // Cart items as an array
    const [cartItems, setCartItems] = useState([]);
    const cartCount = cartItems.reduce( (sum, item) => sum + item.qty, 0);
    //const totalAmount = cartItems.reduce( (sum, item) => sum + (item.qty * item.price), 0);

    // Admin
    const [orders, setOrders] = useState([]);

    return (
        <>
            <BrowserRouter>
                <div className="navBar">
                    <nav className="nav">
                        <NavLink className={({isActive}) => isActive ? "navItemActive" : "navItem"} to="/">Profile</NavLink> 
                        <NavLink className={({isActive}) => isActive ? "navItemActive" : "navItem"} to="/catalog">Shop</NavLink>
                        <NavLink className={({isActive}) => isActive ? "navItemActive" : "navItem"} to="/cart">
                            Cart { cartCount > 0 ? (<span className="cartBadge">{cartCount}</span>) : "" }
                        </NavLink>
                    </nav>
                    <div className="profileSummary">
                        Welcome to Troop 701{contact.firstName ? `, ${contact.firstName}` : ""} 
                        {contact.email ? ` (${contact.email})` : ""}! 
                    </div>
                </div>
                <Routes>
                    <Route path="/" element={
                       <Profile contact={contact} setContact={setContact} />
                        } />
                    <Route path="/catalog" element={
                        <ItemList ageGroup={contact.ageGroup} gender={contact.gender} status={contact.status} 
                            cartItems={cartItems} setCartItems={setCartItems} />
                        } />
                    <Route path="/cart" element={
                        <Cart cartItems={cartItems} setCartItems={setCartItems} contact={contact} />
                        } />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default MyApp