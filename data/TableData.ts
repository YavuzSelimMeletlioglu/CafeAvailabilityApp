export class Table {

    id :string = "" ;

    isOccupied = false ;
    
    isReserved = false ;
    order = [{
        mealName : "" ,
        mealQuantity : 0 ,
        mealPrice : 0 ,
    }] ;
    payment = 0 ;

}