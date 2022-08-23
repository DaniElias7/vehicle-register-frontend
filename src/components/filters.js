import { usePosts } from "../context/PostContext";

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