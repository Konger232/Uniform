/* Config.jsx houses all the default values, items and price <div class="list-group"> */

export const AGE_GROUPS = ["youth", "adult"];

export const GENDERS = ["male", "female"];

export const STATUSES = ["new", "transfer", "return"];

export const PATROLS = ["Cobra", "Scorpion", "Thunder Chicken", "Old Goat"];

export const RANKS = ["Scout", "Tenderfoot", "Second Class", "First Class", "Star", "Life", "Eagle"];

// add to cart regardless of age, gender and status (new/transfer)
export const DEFAULT_ITEMS = ["unit-number7", "unit-number1", "unit-number0", "council-patch", "neckerchief"];

// Sizes
export const MEN_SHIRT_SIZES = ["MS", "MM", "ML", "M2XL", "M3XL", "4XL"];
export const WOMEN_SHIRT_SIZES = ["WXS", "WS", "WM", "WL", "W2XL", "W3XL"];
export const BOY_SHIRT_SIZES = ["YXS", "YS", "YM", "YL", "YXL"];
export const GIRL_SHIRT_SIZES = ["GXS", "GS", "GM", "GL", "GXL"];
export const PANT_SIZES = ["2", "4","6", "8", "10", "12", "14", "16", "18", "14W", "16W", "18W", "20W", "22W"];
export const SKIRT_SIZES = ["2", "4","6", "8", "10", "12", "14", "16", "18", "14W", "16W", "18W", "20W", "22W"];
export const BELT_SIZES = ["60\"", "32\"", "42\""];
export const NECKERCHEIFS = ["red", "green", "blue", "olive"];

export const COORDINATOR_EMAIL = "ping.kong@gmail.com";

// Categlog 
// each item consider of id, description, price, sizeOptions, ageGroups, genders
export const CATALOG = [
    {id:"handbook", name:"Handbook latest edition", description: "Scout Handbook", price: 24.99,
     sizeOptions: null, ageGroups: null, genders: null,
     images:[
        "https://www.scoutshop.org/media/catalog/product/cache/2d930136879944f582dd3c1dba176abb/6/6/664911_scouts_bsa_handbook_f.jpg"
    ]},

     // UNIFORMS
    {id:"ym-shirt-scout", name:"Scout Uniform Shirt (Boys)", description: "Dry fit", price: 54.99,
     sizeOptions: BOY_SHIRT_SIZES, ageGroups: ["youth"], genders: ["male"],
     images:[
        "https://www.scoutshop.org/media/catalog/product/cache/2d930136879944f582dd3c1dba176abb/6/6/663510_bsa_performance_uniform_shirt_youth_front_5.jpg",
        "https://www.scoutshop.org/media/catalog/product/cache/2d930136879944f582dd3c1dba176abb/6/6/663510_bsa_performance_uniform_shirt_youth_left_5.jpg",
        "https://www.scoutshop.org/media/catalog/product/cache/2d930136879944f582dd3c1dba176abb/6/6/663510_bsa_performance_uniform_shirt_youth_back_5.jpg"
     ]},

    {id:"yw-shirt-scout", name:"Scout Uniform Shirt (Girls)", description: "Dry fit", price: 54.99,
     sizeOptions: GIRL_SHIRT_SIZES, ageGroups: ["youth"], genders: ["female"],
     images:[
        "https://www.scoutshop.org/media/catalog/product/cache/2d930136879944f582dd3c1dba176abb/6/4/649695_bsa_uniform_short_sleeve_women_khaki_2.jpg",
        "https://www.scoutshop.org/media/catalog/product/cache/2d930136879944f582dd3c1dba176abb/6/4/649695_bsa_uniform_short_sleeve_women_khaki_front_12.jpg",
        "https://www.scoutshop.org/media/catalog/product/cache/2d930136879944f582dd3c1dba176abb/6/4/649695_bsa_uniform_short_sleeve_women_khaki_left_12.jpg"
     ]},

    {id:"m-shirt-scout", name:"Scout Uniform Shirt (Men)", description: "Box cut", price: 64.99,
     sizeOptions: MEN_SHIRT_SIZES, ageGroups: ["adult"], genders: ["male"],
     images:[
        "https://www.scoutshop.org/media/catalog/product/cache/2d930136879944f582dd3c1dba176abb/6/6/663491_bsa_performance_uniform_shirt_men_front_7.jpg",
        "https://www.scoutshop.org/media/catalog/product/cache/2d930136879944f582dd3c1dba176abb/6/6/663491_bsa_performance_uniform_shirt_men_left_7.jpg",
        "https://www.scoutshop.org/media/catalog/product/cache/2d930136879944f582dd3c1dba176abb/6/6/663491_bsa_performance_uniform_shirt_men_back_7.jpg"
     ]},

    {id:"w-shirt-scout", name:"Scout Uniform Shirt (Women)", description: "Slim Cut", price: 64.99,
     sizeOptions: WOMEN_SHIRT_SIZES, ageGroups: ["adult"], genders: ["female"],
     images :[
        "https://www.scoutshop.org/media/catalog/product/cache/2d930136879944f582dd3c1dba176abb/6/6/663504_bsa_perfromance_uniform_shirt_ladies_front_1_1.jpg",
        "https://www.scoutshop.org/media/catalog/product/cache/2d930136879944f582dd3c1dba176abb/6/6/663504_bsa_perfromance_uniform_shirt_ladies_left_1_1.jpg",
        "https://www.scoutshop.org/media/catalog/product/cache/2d930136879944f582dd3c1dba176abb/6/6/663504_bsa_perfromance_uniform_shirt_ladies_back_1_1.jpg"
     ]},

    {id:"belt", name:"Class Web Belt", description: "Cut to Size. 100% Cotton", price: 22.99,
     sizeOptions: BELT_SIZES, ageGroups: null, genders: null, 
     images : [
        "https://www.scoutshop.org/media/catalog/product/cache/2d930136879944f582dd3c1dba176abb/6/4/64060_main.jpg"
     ]},        

    {id:"sash", name:"Sash", description: "Cross from right shoulder to left hip. ", price: 16.99,
     sizeOptions: null, ageGroups: null, genders: null,
     images : [
        "https://www.scoutshop.org/media/catalog/product/cache/2d930136879944f582dd3c1dba176abb/6/2/62000_62001_655518_scouts-bsa-merit-badge-sash-_1_.jpg"
     ]},        

    {id:"unit-number7", name:"Unit Number 7", description: "Go on the left sleeve", price: 2.19,
     sizeOptions: null, ageGroups: null, genders: null,
     images : [
        "https://www.scoutshop.org/media/catalog/product/cache/2d930136879944f582dd3c1dba176abb/6/5/659227_1_1.jpg"
     ]}, 

    {id:"unit-number0", name:"Unit Number 0", description: "Go on the left sleeve", price: 2.19,
     sizeOptions: null, ageGroups: null, genders: null,
     images : [
        "https://www.scoutshop.org/media/catalog/product/cache/2d930136879944f582dd3c1dba176abb/6/5/659229_1_1_1.jpg"
    ]}, 

    {id:"unit-number1", name:"Unit Number 1", description: "Go on the left sleeve", price: 2.19,
     sizeOptions: null, ageGroups: null, genders: null,
     images : [
        "https://www.scoutshop.org/media/catalog/product/cache/2d930136879944f582dd3c1dba176abb/6/5/659221_1_1_1.jpg"
     ]},    

     {id:"council-patch", name:"Far East Council Patch", description: "Go above the unit numbers on the left sleeve", price: 4.99,
     sizeOptions: null, ageGroups: null, genders: null,
     images : [
        "https://www.scoutshop.org/media/catalog/product/cache/2d930136879944f582dd3c1dba176abb/6/6/662954_far_east_council_emblem.jpg"
     ]},   
     
     {id:"neckerchief", name:"Neckercheif", description: "Part of full class A uniform", price: 14.99,
     sizeOptions: null, ageGroups: null, genders: null,
     images : [
        "https://www.scoutshop.org/media/catalog/product/cache/2d930136879944f582dd3c1dba176abb/c/u/customneckerchief_solid_1.jpg"
     ]},
];

// Helper function to retrieve items
// filter categlog by age group, gender, status and the showAll flag
// always includes the default items
export function getItemsFor(ageGroup, gender, status, showAll) {
    //console.log("getItemsFor called with:", ageGroup, gender, status, showAll);

    // filter the list by age and gender
    const filteredList = CATALOG.filter (
        (item) => 
            !DEFAULT_ITEMS.includes(item.id) && // exclude the default items
            (!item.ageGroups || item.ageGroups.includes(ageGroup)) &&
            (!item.genders || item.genders.includes(gender))
    ); // end of filter
    
    // include universial items by default
    const defaultItems = CATALOG.filter( (item) => DEFAULT_ITEMS.includes(item.id) );

    // transfer scout / adult only needs the universial items
    if (status === "transfer" && !showAll) {
        return defaultItems;
    }
    // new youth/adult get everything
    return [...defaultItems, ...filteredList];
}
