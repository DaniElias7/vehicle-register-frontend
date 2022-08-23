import { usePosts } from "../context/PostContext";


let data = [
    {
        _id: 1,
        veiculo: 'moto', 
        marca: 'fiat', 
        ano: '1987',
        color: 'blue',
        vendido: false,
        createdAt: new Date(2022, 8, 10),
        updatedAt: new Date()
    },
    {
        _id: 2,
        veiculo: 'coche', 
        marca: 'honda', 
        ano: '2021',
        color: 'green',
        vendido: true,
        createdAt: new Date(2022, 8, 15),
        updatedAt: new Date()
    },
    {
        _id: 3,
        veiculo: 'camioneta', 
        marca: 'hyundai', 
        ano: '2017',
        color: 'blue',
        vendido: false,
        createdAt: new Date(2022, 8, 18),
        updatedAt: new Date()
    },
    {
        _id: 4,
        veiculo: 'tractor', 
        marca: 'honda', 
        ano: '2018',
        color: 'green', // add to existing database
        vendido: true,
        createdAt: new Date(2022, 8, 2),
        updatedAt: new Date()
    } 
]

// TO DO => fabricante - last week - decade of manufacturing - not sold

// Fabricante (filter)
export const filterByMaker = (datalist) => { // WORKING!
    let result = []; // [  [ Ford, [ ... ] ], [ Tesla, [ ... ] ] ]
    for (let newItem of datalist) {
        // To check if newItem is already in the list

        let containsNewItem = result.map(item => item.includes(newItem.marca))
        let newItemNotInResult = containsNewItem.every(i => i == false);

        if (result.length == 0 || newItemNotInResult) {
            result.push( [ newItem.marca, [ newItem ] ] );
        } else {
            
            for (let x of result) {

                if ( x[0] == newItem.marca ) {
                    x[1].push(newItem);
                }

            }
        }
    }

    return result;
}

// Last week (filter)  WORKING!!
export const lastWeekFilter = (datalist) => datalist.filter(item => new Date(item.createdAt).getDate() >= new Date().getDate() - 7) ;

// Bubble sort (order the less 1st)
// const bubbleSort = (unorderedList) => { // Still NOT WORKING
//     let stop = false; // [  [ 1990, [ ... ] ], [ 2000, [ ... ] ] ]
//     // Repeat up to have every item in the right position
//     while (!stop) {
//         for (let item = 0, nextItem = 1; item < unorderedList.length; item++, nextItem++) {

//             console.log(unorderedList[nextItem][0])

//             let item1 = unorderedList[item][0];
//             let item2 = unorderedList[nextItem][0]

//             if (item1 > item2) {
//                 unorderedList.splice(item)
//                 unorderedList.splice(item)

//                 unorderedList.splice(item, 0, item2)
//                 unorderedList.splice(nextItem, 0, item1)
//             }

//         }
            
//         // Check if list is ordered
//         let count = 0;
//         for (x in unorderedList ) {

//             for (let y in unorderedList ) {

//                 if ( x < y && unorderedList[x][0] > unorderedList[y][0] ){
//                     count += 1
//                 }
                    
//             }
                 
//         }
             

//         if (count == 0) {
//             stop = true
//         }
            
//     }
    
//     let orderedList = unorderedList
    
            
//     return orderedList
// }    

// Decade of manufactoring (filter)
export const decadeOfManufacturingFilter = (datalist) => {
    let result = []; // [  [ 1990, [ ... ] ], [ 2000, [ ... ] ] ]
    for (let newItem of datalist) {
        // To check if newItem is already in the list

        let decade = String(newItem.ano).substring(0, 3);

        let containsNewItem = result.map(item => item.includes(decade + '0'))
        let newItemNotInResult = containsNewItem.every(i => i == false);

        if (result.length == 0 || newItemNotInResult) {
            result.push( [ decade + '0', [ newItem ] ] );
        } else {
            
            for (let x of result) {

                if ( x[0] == decade + '0' ) {
                    x[1].push(newItem);
                }

            }
        }
    }
    return result;
}

// Not sold (filter) WORKING!!!
export const notSoldFilter = (datalist) => datalist.filter(item => item.vendido == false);

// Maker and Decades UI

const MakersAndDecadesUI = () => {
    const { posts, page } = usePosts();
    let datalist = page === 'maker' ? filterByMaker(posts) : decadeOfManufacturingFilter(posts);
    console.log(page)
    return (
        <div class="maker-filter-container">
                {
                    datalist.map(item => 
                        <div className='maker' key={item[0]}>
                            <p id="maker-name">{item[0]}</p>
                            <p></p>
                            <p id="maker-quantity">{item[1].length} veículos</p>
                        </div>

                    )
                }
                
        </div>
    )
}

export default MakersAndDecadesUI;